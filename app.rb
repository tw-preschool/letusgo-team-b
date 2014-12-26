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
require './controllers/adminController'
require './controllers/posController'
require './controllers/orderController'

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

  get '/admin' do
    checkAdminStatus
  end

  post '/products' do
    createProduct(params[:name],params[:price],params[:unit],
                  params[:promotion],params[:number],params[:description])
  end

  post '/getProductNum' do
    getProductNum
  end

  post '/item-delete' do
    deleteItem(params[:id])
  end

  post '/item-edit' do
    editItem(params[:id],params[:"item-info"])
  end

  post '/item-promotion' do
    updateItemPromotion(params[:id],params[:promotion])
  end

  get '/products' do
    showProducts
  end

  get '/products/:id' do
    findProductByID(params[:id])
  end

  get '/item-edit/:id' do
    goToItemEditPage(params[:id])
  end

end

class OrderHandle < Sinatra::Base
  use LoginHandle
  use DbConfig
  use AdminHandle


  post '/addOrder' do
    addOrder(params[:order])
  end

  get '/orders' do
    cancelTimeoutOrders
  end

  get '/orders/:email' do
    getUserOrders(params[:email])
  end

  get '/details/:id' do
    getOrderDetails(params[:id])
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
    goToConfirmPage
  end

   get '/confirm/:user' do
     getUserCartToConfirm(params[:user])
   end

  post '/confirm' do
    returnCartInfo(params[:id],params[:email])
  end
    get '/cart' do
      goToCartPage
    end

    get '/cart/:user' do
      getUserCart(params[:user])
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
