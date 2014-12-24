require 'active_record'

def goToHomePage
  content_type :html
  erb :home
end

def goToItemsPage
  content_type :html
  erb :items
end

def goToCartPage
  content_type :html
  erb :cart
end

def goToConfirmPage
  content_type :html
  erb :confirm
end

def returnCartInfo(productId,email)
 # [200,{:id => productId, :em => email}.to_json]
  productInCart = Cart.find_by_sql(['select * from carts where product_id=? and email=?',productId,email]).first || nil
  productInStock = Product.find(productId)
  # [200,{:id => productInStock}.to_json]
  #
  if productInCart == nil
    Cart.create(
    :email => email,
    :product_id => productId,
    :number => 1)
    return true.to_json
  else
    if productInCart.number < productInStock.number
      productInCart.update(:number => (productInCart.number+1))
      return true.to_json
    end
  end
    return false.to_json
end

def updateCartNumberByPlus(productId,email)
  productInCart = Cart.find_by_sql(['select * from carts where product_id=? and email=?',productId,email]).first
  productInStock = Product.find(productId)
  if productInCart.number < productInStock.number
    productInCart.update(:number => (productInCart.number+1))
    return productInCart.number.to_json
  end
  return false.to_json
end

def updateCartNumberByReduce(productId,email)
  productInCart = Cart.find_by_sql(['select * from carts where product_id=? and email=?',productId,email]).first
  # productInStock = Product.find(productId)
  if productInCart.number > 0
    productInCart.update(:number => (productInCart.number-1))
    return productInCart.number.to_json
  end
  return false.to_json
end

def deleteProductFromCart(productId,email)
  productInCart = Cart.find_by_sql(['select * from carts where product_id=? and email=?',productId,email]).first
  productInCart.destroy
  [200,{:key => "ok"}.to_json]
end

def getUserCart(user)
  content_type :html
  # @cartProducts = Cart.find_by_user_id(id).products
  @userCart = Cart.find_by_sql(['select * from carts where email=? order by product_id',user])
  @cartProducts = Product.find_by_sql(['select * from products where id in
                                        (select product_id from carts where
                                        email=?)',user])
  erb :shopcart
end
