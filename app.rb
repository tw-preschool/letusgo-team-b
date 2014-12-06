require 'sinatra'
require 'rack/contrib'
require 'active_record'
require 'json'
require './models/product'

class LoginHandle < Sinatra::Base

  configure do
    use Rack::Session::Pool, :expire_after => 5#60*60*24*7
    set :username, 'admin'
    set :password, 'admin'
  end

  get '/login' do
    if session[:user] = true
      redirect '/admin'
    else
      content_type :html
      erb :login
    end
  end

  post '/login' do
    if params[:name] == settings.username && params[:password] == settings.password
      session[:user] = true
      return session[:user].to_json
    else
      session[:user] = false
      return session[:user].to_json
    end
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
    end

    get '/index.html' do
        content_type :html
        erb :index
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
                            :unit => params[:unit])
        if product.save
            [201, {:message => "products/#{product.id}",:id => product.id }.to_json]
        else
            halt 500, {:message => "create product failed"}.to_json
        end
    end

    get '/add' do
        content_type :html
        File.open('public/views/add.html').read
    end

    get '/admin' do
      if session[:user] = false
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

    get '/logout' do
      session[:user] = false
      redirect '/login'
    end
    after do
        ActiveRecord::Base.connection.close
    end

    get '/cart' do
      content_type :html
      erb :cart
    end
    after do
      ActiveRecord::Base.connection.close
    end

    get '/payment' do
      content_type :html
      erb :payment
    end
    after do
      ActiveRecord::Base.connection.close
    end

end
