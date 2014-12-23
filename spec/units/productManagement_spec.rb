# encoding: utf-8
require_relative '../spec_helper'

describe "product management test", :type => :feature do
  describe "product management", :js =>true do
    before do
      page.set_rack_session user: "admin", isLogin: true, role: "admin", username: "admin"
    end

    it "login with admin status" do
      visit '/admin'
      expect(page).to have_content('admin')
    end

    it "add new product" do
      addNewProduct("苹果","3","kg","30","一种水果")
      compareProductInfo("苹果","3","kg","30","一种水果")
    end

    it "change promotion status to current product" do
      #visit '/admin'
      #check "买二送一"
      #expect(page).to have_content('ON')
      #uncheck '买二送一'
      #expect(page).to have_content('OFF')
    end

    it "edit product" do
      visit '/admin'
      click_button '编辑'
      expect(page).to have_content('提交')
    end

    it 'delete product' do
      visit '/admin'
      click_button '删除'
      message = accept_alert
      expect(message).to eq('确定要删除该商品?')
    end
  end
end

def addNewProduct(name,price,unit,num,description)
  visit '/admin'
  fill_in '商品名称：', :with => name
  fill_in '价格：', :with => price
  fill_in '单位：', :with => unit
  fill_in '库存：', :with => num
  fill_in '描述信息：', :with => description
  click_button '添加商品'
end

def compareProductInfo(name,price,unit,num,description)
  expect(page).to have_content(name)
  expect(page).to have_content(price)
  expect(page).to have_content(unit)
  expect(page).to have_content(num)
  expect(page).to have_content(description)
  expect(page).to have_content('买二送一')
  expect(page).to have_content('OFF')
  expect(page).to have_content('编辑')
  expect(page).to have_content('删除')
end