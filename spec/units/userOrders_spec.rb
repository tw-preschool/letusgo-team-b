#encoding: utf-8
require_relative '../spec_helper'

describe "order management test" ,:type => :feature do
  describe "data send test", :js => true do
    before :each do
      page.set_rack_session user: "tw@tw.com", isLogin: true, role: "customer", username: "sj"
    end
    it "shoul return 201 when sending data" do
      Order.create(username: 'tw@tw.com', totalcost: 2513, state: "待付款")
      Detail.create(name: "罗技 M185 无线鼠标",unit: '个', price: 59.00, number: 3,
                         promotion: "买二送一", numberForFree: 1, totalcost: 118, order_id: 1)
      Detail.create(name: "罗技 C270 高清网络摄像头",unit: '个', price: 149.00, number: 6,
                         promotion: "买二送一", numberForFree: 2, totalcost: 596, order_id: 1)
      Detail.create(name: "惠普 LaserJet Pro M1213nf 黑白多功能激光一体机",unit: '个', price: 1799.00, number: 1,
                         promotion: "", numberForFree: 0, totalcost: 1799, order_id: 1)
      visit '/'
      click_link 'sj'
      find_link('我的订单').visible?

      click_link '我的订单'
      expect(current_path).to eq "/orders/tw@tw.com"
      expect(page).to have_content('tw@tw.com')
      expect(page).to have_content('2513.0')
      expect(page).to have_content('待付款')
      expect(page).to have_content('订单详情')

      click_link '订单详情'
      expect(current_path).to eq "/orderDetails/1"

      expect(page).to have_content("罗技 M185 无线鼠标")
      expect(page).to have_content('个')
      expect(page).to have_content('59.0')
      expect(page).to have_content('3')
      expect(page).to have_content('买二送一')
      expect(page).to have_content('1')
      expect(page).to have_content('118.0')

      expect(page).to have_content('罗技 C270 高清网络摄像头')
      expect(page).to have_content('个')
      expect(page).to have_content('149.0')
      expect(page).to have_content('6')
      expect(page).to have_content('买二送一')
      expect(page).to have_content('2')
      expect(page).to have_content('596.0')

      expect(page).to have_content('惠普 LaserJet Pro M1213nf 黑白多功能激光一体机')
      expect(page).to have_content('个')
      expect(page).to have_content('1799.0')
      expect(page).to have_content('1')
      expect(page).to have_content('0')
      expect(page).to have_content('1799.0')
    end
  end
end
