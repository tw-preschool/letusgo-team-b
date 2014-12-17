require 'active_record'

def userLogin(email,password)
  user = User.find_by_sql(['select * from users where email=? and password=?',email,password])
  if user.count > 0
    session[:isLogin] = true
    session[:user] = email
    return true.to_json
  else
    return false.to_json
  end
end

def checkLoginStatus
  if session[:isLogin] === true
    redirect '/admin'
  else
    content_type :html
    erb :login
  end
end

def userLogout
  session[:isLogin] = false
  session[:user] = ""
  redirect '/login'
end

def goToRegister
  content_type :html
  erb :register
end

def userRegister(email,password,phone,name,address)
  users = User.find_by_sql(['select * from users where email=?',email])
  if users.count == 0
    user = User.create(:email => email,
                       :password => password,
                       :phone => phone,
                       :name => name,
                       :address => address,
                       :phone => phone.to_i,
                       :role => "",
                       :state => "active")
    user.save
    return true.to_json;
  else
    return false.to_json;
  end
end