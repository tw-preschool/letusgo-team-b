require 'active_record'

class Cart < ActiveRecord::Base
  validates :email, :product_id, number: true
end
