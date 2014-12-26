# encoding: UTF-8
require 'active_record'
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
    # deleteAllFromCartAboutThisUser(session[:user])
    [201,{:message => "success"}.to_json]
  else
    [404,{:message => "error"}.to_json]
  end
end

def cancelTimeoutOrders
  content_type :html
  t = Time.new.getutc
  orders = Order.where(:state == "待付款")
  orders.each do |order|
    if t-order[:created_at]>60*60*2
      order.update(:state => "取消")
    end
  end
  @userOrders = Order.find_by_sql(['select * from orders'])
  erb :orders
end

def getOrderDetails(id)
  content_type :html
  @orderInfo = Order.find(id)
  @details = Order.find(id).details
  erb :orderDetails
end

def getUserOrders(email)
  content_type :html
  @userOrders = Order.find_by_sql(['select * from orders where username=?',email])
  erb :orders
end
def deleteAllFromCartAboutThisUser(email)
  productInCart = Cart.find_by_sql(['select * from carts where email=?',email])
  for i in 0..(productInCart.length-1)
    productInCart[i].destroy
  end
  [200,{:key => "ok"}.to_json]
end
