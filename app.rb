# encoding: UTF-8
require 'sinatra'
require 'rack/contrib'
require 'active_record'
require 'json'
require './models/product'
require './models/order'
require './models/detail'
class LoginHandle < Sinatra::Base

  configure do
    use Rack::Session::Pool, :expire_after => 60*60*24*7
    set :username, 'admin'
    set :password, 'admin'
  end

  get '/login' do
    if session[:isLogin] === true
      redirect '/admin'
    else
      content_type :html
      erb :login
    end
  end

  post '/login' do
    if params[:name] == settings.username && params[:password] == settings.password
      session[:isLogin] = true
      return session[:isLogin].to_json
    else
      session[:isLogin] = false
      return session[:isLogin].to_json
    end
  end

  get '/logout' do
    session[:isLogin] = false
    redirect '/login'
  end

  get '/register' do
    content_type :html
    erb :register
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
        @user = 'admin'
    end

    get '/' do
      content_type :html
      erb :index
    end

    get '/products' do
      content_type :html
        begin
            erb :items
        rescue ActiveRecord::RecordNotFound => e
            [404, {:message => e.message}.to_json]
        end
    end

    get '/products/:id' do
        begin
            product = Product.find(params[:id])
            product.to_json
        rescue  ActiveRecord::RecordNotFound => e
            [404, {:message => e.message}.to_json]
        end
    end

    post '/products' do
        product = Product.create(:name => params[:name],
                            :price => params[:price],
                            :unit => params[:unit],
                            :promotion => params[:promotion],
                            :number => params[:number],
                            :description => params[:description])
        if product.save
            [201, {:message => "products/#{product.id}",:id => product.id }.to_json]
        else
            halt 500, {:message => "create product failed"}.to_json
        end
    end

    get '/admin' do
      if !(session[:isLogin] === true)
        redirect '/login'
      else
        content_type :html
        begin
          erb :admin
        rescue ActiveRecord::RecordNotFound => e
          [404, {:message => e.message}.to_json]
        end
      end
    end

    post '/item-delete' do
      Product.find(params[:id]).destroy
      [201, {:message => "delete"}.to_json]
    end

    post '/item-edit' do
      product = Product.find(params[:id])
      product.update(params[:"item-info"] )
      [201, {:message => "edit"}.to_json]
    end

    get '/item-edit/:id' do
      content_type :html
      @id = params[:id]
      erb :'item-edit'
    end

    get '/items' do
      content_type :html
      erb :items
    end

    get '/cart' do
      content_type :html
      erb :cart
    end

    post '/cart' do
      if params[:id]
        product = Product.find(params[:id])
        return product.to_json
      end
    end
    get '/payment' do
      content_type :html
      erb :payment
    end

    post '/item-promotion' do
      product = Product.find(params[:id])
      product.update_attributes(:promotion => params[:promotion])
      return product.to_json
    end

    get '/orders' do
      content_type :html
      erb :orders
    end

    get '/detail' do
      Order.find(params[:id]).details.to_json
    end

    post '/addOrder' do
      order = Order.create(params[:order])
      params.delete("order")
      params.each {|key,value|
        detail = value.merge({:order => order})
        Detail.create(detail)
      }
    #  params[:detailsCount].to_i.times do |i|
    #    detail = params[":detail"+i.to_s]
        #detail[:order] = product
      #  detail = params[:details0]

    #    Detail.create(name: detail[:name],unit: detail[:unit],price: detail[:price], number: detail[:number], promotion: detail[:promotion], numberForFree: detail[:numberForFree], totalcost: detail[:totalcost], order: order)
    #  end
      [201,{:p =>params}.to_json]
    end

    after do
      ActiveRecord::Base.connection.close
    end


end
