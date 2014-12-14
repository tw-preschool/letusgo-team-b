require 'active_record'

class User < ActiveRecord::Base
  validates :email, :password, presence: true
  validates :password, length: { minimum: 6 }
  validates :phone, numericality: true
end
