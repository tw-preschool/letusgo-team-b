require 'active_record'
require 'action_mailer'
require 'net/smtp'

def loginConfig
  use Rack::Session::Pool, :expire_after => 60*60*24*7
  configure do
    set :username, 'admin'
    set :password, 'admin'
  end
end

def userLogin(email,password)
  user = User.find_by_sql(['select * from users where email=? and password=?',email,password])
  if user.count > 0
    session[:isLogin] = true
    session[:user] = user.first.email
    session[:username] = user.first.name
    session[:role] = user.first.role
    session[:userId] = user.first.id
    return true.to_json
  else
    return false.to_json
  end
end

def checkLoginStatus
  # if session[:isLogin] === true
  #   redirect '/admin'
  # else
    content_type :html
    erb :login
  # end
end

def userLogout
  session[:isLogin] = false
  session[:user] = ""
  session[:role] = ""
  redirect '/login'
end

def goToRegisterPage
  content_type :html
  erb :register
end

def userRegister(email,password,phone,name,address,role)
  users = User.find_by_sql(['select * from users where email=?',email])
  if users.count == 0
    user = User.create(:email => email,
                       :password => password,
                       :phone => phone,
                       :name => name,
                       :address => address,
                       :role => role,
                       :state => "active")
    user.save
    [201,true.to_json]
  else
    [404,false.to_json]
  end
end




