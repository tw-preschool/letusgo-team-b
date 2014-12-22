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




