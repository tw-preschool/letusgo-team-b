require 'active_record'

def checkAdminStatus
  if !(session[:isLogin] === true)
    redirect '/login'
  else
    content_type :html
    begin
      erb :productManagement
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
                           :description => description,
                           :state => "onsale")
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
  Product.find(id).update(:state => "deleted")
  carts = Cart.where(:product_id => id)
  carts.each do |cart|
    cart.update_attributes(:number => 0)
  end
  [201, {:message => carts}.to_json]
end

def editItem(id,item_info)
   if item_info['number'].to_i >= 0 && item_info['price'].to_i > 0
     Product.find(id).update(item_info)
     [201, {:message => "edit"}.to_json]
   else
     [401, {:message => "error"}.to_json]
   end
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
