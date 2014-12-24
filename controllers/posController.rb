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

def returnCartInfo(id)
  if id
    return Product.find(id).to_json
  end
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
