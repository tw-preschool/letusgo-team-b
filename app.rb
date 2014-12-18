# encoding: UTF-8
require 'sinatra'
require 'rack/contrib'
require 'active_record'
require 'json'
require './models/product'
require './models/order'
require './models/detail'
require './models/user'
require './controllers/loginController'
require './controllers/shoppingController'

class LoginHandle < Sinatra::Base
  use Rack::Session::Pool, :expire_after => 60*60*24*7
  configure do
    set :username, 'admin'
    set :password, 'admin'
  end

  post '/login' do
    userLogin(params[:email],params[:password])
  end

  get '/login' do
    checkLoginStatus
  end

  get '/logout' do
    userLogout
  end

  get '/register' do
    goToRegister
  end

  post '/register' do
    userRegister(params[:email],params[:password],params[:phone],
                 params[:name],params[:address],params[:role])
  end
end

class POSApplication < Sinatra::Base
    use LoginHandle
    dbconfig = YAML.load(File.open("config/database.yml").read)

    configure :development do
        require 'sqlite3'
        ActiveRecord::Base.establish_connection(dbconfig['development'])
    end

    configure :test do
        require 'sqlite3'
        ActiveRecord::Base.establish_connection(dbconfig['test'])
    end

    use Rack::PostBodyContentTypeParser
    before do
        content_type :json
        @isLogin = session[:isLogin]
        @user = session[:user]
        users = User.where(email: @user)
        if users.count > 0
          @role = users.first.role
        else
          @role = ""
        end
    end

    get '/' do
      goToIndex
    end

    post '/products' do
      createProduct(params[:name],params[:price],params[:unit],
                    params[:promotion],params[:number],params[:description])
    end

    get '/products' do
      showProducts
    end

    get '/products/:id' do
      findProductByID(params[:id])
    end

    get '/admin' do
      checkAdminStatus
    end

    post '/item-delete' do
      deleteItem(params[:id])
    end

    post '/item-edit' do
      editItem(params[:id],params[:"item-info"])
    end

    get '/item-edit/:id' do
      editItemByID(params[:id])
    end

    get '/items' do
      goToItems
    end

    get '/cart' do
      goToCart
    end

    post '/cart' do
      returnCartInfo(params[:id])
    end

    get '/payment' do
      goToPayment
    end

    post '/item-promotion' do
      updateItemPromotion(params[:id],params[:promotion])
    end

    get '/orders' do
      updateOrders
    end

    get '/details/:id' do
      getDetailsByID(params[:id])
    end

    post '/addOrder' do
      addOrder(params[:order])
    end

    after do
      ActiveRecord::Base.connection.close
    end


end
