#encoding: utf-8
require_relative '../spec_helper'

describe "order management test" ,:type => :feature do
  describe "data send test", :js => true do
    before :each do
      page.set_rack_session user: "root", isLogin: true, role: "root", username: "sj"
    end
    it "shoul return 201 when sending data" do
      order = {:username => "tester", :state => "unpaid", :totalcost => 30}
      detail0 = {:name => "orange",:unit => 'kg', :price => 12.00, :boughtNum => 3, :promotion => "true", :freeNum => 1, :subtotal => 24}
      detail1 = {:name => "apple",:unit => 'kg', :price => 24.00, :boughtNum => 3, :promotion => "false", :freeNum => 0, :subtotal => 72}
      body = {:order => order, :detail0 => detail0, :detail1 => detail1}
      post "/addOrder" ,body
      expect(last_response.status).to eq 201
    end
    it "should have anchor link to /orders" do
      visit "/"
      expect(page).to have_content('订单管理')
      click_link '订单管理'
      expect(current_path).to eq "/orders"
    end
    it "should list orders when visiting /orders" do
      visit "/orders"
      expect(page).to have_content('tester')
      expect(page).to have_content('30.00')
      expect(page).to have_content('unpaid')
      expect(page).to have_content('订单详情')
    end
    it "should list details when clicking details button" do
      visit "/orders"
      click_link '订单详情'
      expect(current_path).to eq "/details/1"

      expect(page).to have_content("apple")
      expect(page).to have_content('kg')
      expect(page).to have_content('12.0')
      expect(page).to have_content('3')
      expect(page).to have_content('true')
      expect(page).to have_content('1')
      expect(page).to have_content('24.0')

      expect(page).to have_content('orange')
      expect(page).to have_content('kg')
      expect(page).to have_content('24.0')
      expect(page).to have_content('3')
      expect(page).to have_content('false')
      expect(page).to have_content('0')
      expect(page).to have_content('72.0')
      end
    it "should jump back to orders when clicking return button" do
      visit "/orders"
      click_link '订单详情'
      click_link '返回订单列表'
      expect(current_path).to eq "/orders"
    end
  end
end
