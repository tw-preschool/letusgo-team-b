require 'active_record'

def isLogin
  if !(session[:isLogin] === true)
    return true
  else
    return false
  end
end

def isAdmin
  if session[:role] === "admin"
    return true
  else
    return false
  end
end

def isCustomer
  if session[:role] === "customer"
    return true
  else
    return false
  end
end
