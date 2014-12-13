require 'active_record'
require './models/detail'
class Order < ActiveRecord::Base
  #validates :totalcost, presence: true
  #validates :state, presence: true, default: 'unpaid'
  has_many :details, dependent: :destroy
end
