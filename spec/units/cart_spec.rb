# encoding: utf-8
require_relative '../spec_helper'

describe "customer operations for shopping cart", :type => :feature do
  describe "admin add new item to cart", :js => true do
    before do
      page.set_rack_session user: "admin", isLogin: true, role: "admin", username: "admin"
    end

    it "admin add a new item to product list" do
      visit '/admin'
      fill_in '商品名称：', :with => '苹果'
      fill_in '价格：', :with => '3'
      fill_in '单位：', :with => 'kg'
      fill_in '库存：', :with => '2'
      fill_in '描述信息：', :with => '一种水果'
      click_button '添加商品'
    end
  end

  describe "customer use shopping-cart", :js => true do
    before do
      page.set_rack_session user: "tw@tw.com", isLogin: true, role: "customer", username: "tw@tw.com"
    end

    it "customer put nothing in cart, remind them" do
      visit '/cart'
      expect(page).to have_content('您没有需要付款的商品,请前往商品列表添加')
    end

    it "customer add a new item to shopping cart" do
      visit '/products'
      click_button '加入购物车'
      expect(page).to have_content('购物车(1)')
      click_button '加入购物车'
      expect(page).to have_content('购物车(2)')
    end

    it "customer go to shopping cart" do
      visit '/cart'
      expect(page).to have_content('苹果')
      expect(page).to have_content('2')
      expect(page).to have_content('6.00')
    end

    it "after see the cart, customer continue shopping" do
      visit '/cart'
      click_on '继续购物'
      expect(current_path).to eq "/products"
    end

    it "customer change the item number in shopping cart" do
      visit '/cart'
      click_button '-'
      expect(page).to have_content('1')
      expect(page).to have_content('3.00')
      click_button '+'
      expect(page).to have_content('2')
      expect(page).to have_content('6.00')
    end

    it "customer add more products than supply" do
      visit '/cart'
      click_button '+'
      expect(page).to have_content('库存不足，亲,你不能够继续添加了！')
    end

    it "customer confirm the order" do
      visit '/cart'
      click_on '提交订单'
      expect(current_path).to eq "/confirm"
      expect(page).to have_content('去付款')
    end

    it "customer delete the item from shopping cart" do
      visit '/cart'
      click_button '删除'
      expect(page).to have_content('您没有需要付款的商品,请前往商品列表添加')
    end
  end
end