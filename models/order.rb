require 'active_record'
class Order < ActiveRecord::Base
  #validates :totalcost, presence: true
  #validates :state, presence: true, default: 'unpaid'
  #has_many :order_details, dependent: :destroy
end
