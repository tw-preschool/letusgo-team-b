require 'active_record'

def goToIndex
  content_type :html
  erb :index
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

def deleteItem(id)
  Product.find(id).destroy
  [201, {:message => "delete"}.to_json]
end

def editItem(id,item_info)
  Product.find(id).update(item_info)
  [201, {:message => "edit"}.to_json]
end

def goToItems
  content_type :html
  erb :items
end

def goToCart
  content_type :html
  erb :cart
end

def goToPayment
  content_type :html
  erb :payment
end

def editItemByID(id)
  content_type :html
  @id = id
  erb :'item-edit'
end

def returnCartInfo(id)
  if id
    return Product.find(id).to_json
  end
end

def updateItemPromotion(id,promotion)
  product = Product.find(id)
  product.update_attributes(:promotion => promotion)
  return product.to_json
end

def updateOrders
  content_type :html
  t = Time.new.getutc
  orders = Order.where(:state == "unpaid")
  orders.each do |order|
    if t-order[:created_at]>60*60*2
      order.update(:state => "canceled")
    end
  end
  erb :orders
end
    # string :promotion

def getDetailsByID(id)
  content_type :html
  @details = Order.find(id).details
  erb :details
end

def addOrder(order)
  order = Order.create(order)
  params.delete("order")
  params.delete("detailsCount")
  params.each {|key,value|
    Detail.create(
    :name => value[:name],
    :price => value[:price],
    :unit => value[:unit],
    :promotion => value[:promotion],
    :number => value[:boughtNum],
    :numberForFree => value[:freeNum],
    :totalcost => value[:subtotal],
    :order => order)
    if value[:id].to_i > 0
      product = Product.find(value[:id].to_i)
      count= product.number - value[:boughtNum].to_i
      product.update(:number => count)
    end
  }
  if (order.save || resultDetail.save)
    [201,{:message => "success"}.to_json]
  else
    [404,{:message => "error"}.to_json]
  end
end
