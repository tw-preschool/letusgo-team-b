require 'active_record'

class PromotionItem < ActiveRecord::Base
  validates :barcode, presence: true
end
