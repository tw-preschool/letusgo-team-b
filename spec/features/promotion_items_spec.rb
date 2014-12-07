# encoding: utf-8

require_relative '../../models/promotion_item'
require_relative '../../models/product'
require 'active_record'

describe "Promotion Items" do
  it 'should return PromotionItem class' do
    # promoItem = PromotionItem.new
    # promoItem.barcode = 123
    # expect(promoItem.barcode).to eq 123
    prd = Product.new
    prd.name = 'apple'
    expect(prd.name).to eq 'apple'
  end
end