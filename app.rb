# encoding: UTF-8

require 'sinatra'
require 'rack/contrib'
require 'active_record'
require 'json'
require './models/product'
require './models/order'
require './models/detail'
require './models/user'
require './models/cart'
require './controllers/dbConfigController'
require './controllers/loginController'
require './controllers/productController'
require './controllers/posController'
require './controllers/orderController'
require './controllers/permissionController.rb'

class LoginHandle < Sinatra::Base
  loginConfig

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
    goToRegisterPage
  end

  post '/register' do
    userRegister(params[:email],params[:password],params[:phone],
                 params[:name],params[:address],params[:role])
  end
end

class AdminHandle < Sinatra::Base
  use LoginHandle
  use DbConfig

  get '/productManagement' do
    checkAdminStatus
  end

  post '/products' do
    createProduct(params[:name],params[:price],params[:unit],
                  params[:promotion],params[:number],params[:description])
  end

  post '/getProductNum' do
    getProductNum
  end

  delete '/item' do
    deleteItem(params[:id])
  end

  post '/item' do
    editItem(params[:id],params[:"item-info"])
  end

  post '/itemPromotion' do
    updateItemPromotion(params[:id],params[:promotion])
  end

  get '/products' do
    showProducts
  end

  get '/products/:id' do
    findProductByID(params[:id])
  end

end

class OrderHandle < Sinatra::Base
  use LoginHandle
  use DbConfig
  use AdminHandle


  post '/order' do
    addOrder(params[:order])
  end

  get '/orders' do
    if isLogin && isAdmin
      cancelTimeoutOrders
    else
      redirect '/login'
    end
  end

  get '/orders/:email' do
    if isLogin && isCustomer
      getUserOrders(params[:email])
    else
      redirect '/login'
    end
  end

  get '/orderDetails/:id' do
    if isLogin
      getOrderDetails(params[:id])
    else
      redirect '/login'
    end
  end
end

class POSApplication < Sinatra::Base
    use LoginHandle
    use DbConfig
    use AdminHandle
    use OrderHandle

    get '/' do
      goToHomePage
    end

    get '/items' do

        goToItemsPage

    end

    get '/confirm' do
      if isLogin && isCustomer
        goToConfirmPage
      else
        redirect '/login'
      end
    end

     get '/confirm/:user' do
       if isLogin && isCustomer
         getUserCartToConfirm(params[:user])
       else
         redirect '/login'
       end
     end

    post '/confirm' do
      returnCartInfo(params[:id],params[:email])
    end

    get '/cart' do
      if isLogin && isCustomer
        goToCartPage
      else
        redirect '/login'
      end
    end

    get '/cart/:user' do
      if isLogin && isCustomer
        getUserCart(params[:user])
      else
        redirect '/login'
      end
    end

    post '/cart' do
      returnCartInfo(params[:id],params[:email])
    end

    post '/cartByPlus' do
      updateCartNumberByPlus(params[:id],params[:email])
    end

    post '/cartReduce' do
      updateCartNumberByReduce(params[:id],params[:email])
    end

    post '/cartDelete' do
      deleteProductFromCart(params[:id],params[:email])
    end
    post '/getSubtotalParams' do
      getSubtotalParams(params[:productId],params[:email])
    end
    post '/getCalculateParams' do
      getCalculateParams(params[:email])
    end
    after do
      ActiveRecord::Base.connection.close
    end
end
