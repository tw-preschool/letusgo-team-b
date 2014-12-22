require 'active_record'

def checkAdminStatus
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

def createProduct(name,price,unit,promotion,number,description)
  product = Product.create(:name => name,
                           :price => price,
                           :unit => unit,
                           :promotion => promotion,
                           :number => number,
                           :description => description)
  if product.save
    [201, {:message => "products/#{product.id}",:id => product.id }.to_json]
  else
    halt 500, {:message => "create product failed"}.to_json
  end
end

def showProducts
  content_type :html
  begin
    erb :items
  rescue ActiveRecord::RecordNotFound => e
    [404, {:message => e.message}.to_json]
  end
end

def findProductByID(id)
  begin
    Product.find(id).to_json
  rescue  ActiveRecord::RecordNotFound => e
    [404, {:message => e.message}.to_json]
  end
end

def deleteItem(id)
  Product.find(id).destroy
  [201, {:message => "delete"}.to_json]
end

def editItem(id,item_info)
  Product.find(id).update(item_info)
  [201, {:message => "edit"}.to_json]
end

def goToItemEditPage(id)
  content_type :html
  @id = id
  erb :'item-edit'
end

def updateItemPromotion(id,promotion)
  product = Product.find(id)
  product.update_attributes(:promotion => promotion)
  return product.to_json
end

def getProductNum
  storage = {}
  params[:details].each {|key,value|
    product = Product.find(value[:id].to_i)
    storage["#{value[:id]}"] = product.number
  }
  [201,storage.to_json]
end