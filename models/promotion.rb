require 'active_record'

class Promotion < ActiveRecord::Base
  validates :name, :promotionStatus, presence: true
end
