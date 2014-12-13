require 'active_record'
require 'order'

class Detail < ActiveRecord::Base
  validates :name, presence: true
  #belongs_to :order
end
