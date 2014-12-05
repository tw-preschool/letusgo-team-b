require 'sinatra'
require 'rack/contrib'
require 'active_record'
require 'json'

require './models/product'

class POSApplication < Sinatra::Base
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
            @products = Product.all || []
            @products.to_json
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
      content_type :html
      begin
          erb :admin
      rescue ActiveRecord::RecordNotFound => e
            [404, {:message => e.message}.to_json]
      end
    end
    post '/item-delete' do
      Product.find(params[:id]).destroy
      [201, {:message => "delete"}.to_json]
    end
    get '/item-edit/:id' do
      content_type :html
      @id = params[:id]
      erb :'item-edit'
    end
    post '/item-edit' do
      product = Product.find(params[:id])
      product.update(params[:"item-info"] )
      [201, {:message => "delete"}.to_json]
    end
    get '/items' do
      content_type :html
      erb :items
    end
    after do
        ActiveRecord::Base.connection.close
    end
end
