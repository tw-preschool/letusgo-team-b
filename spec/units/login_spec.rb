# encoding: utf-8
require_relative '../spec_helper'

describe "login and logout test", :type => :feature do
  describe "check login page", :js => true do
    it "visit login page" do
      visit '/login'
      expect(page).to have_content('邮箱：')
      expect(page).to have_content('密码：')
      expect(page).to have_content('登 录')
    end
  end

  describe "login test", :js => true do
    it "login with invalid username" do
      visit '/login'
      fill_in '邮箱：', :with => '111111'
      fill_in '密码：', :with => '111111'
      click_button '登 录'
      expect(current_path).to eq "/login"
      expect(page).to have_content('邮箱或密码错误，请确认后重试')
    end

    it "login with existing valid username" do
      visit '/login'
      fill_in '邮箱：', :with => "tw@tw.com"
      fill_in '密码：', :with => "letsgo"
      click_button '登 录'
      expect(current_path).to eq "/"
      expect(page).to have_content('思特沃克')
      expect(page).to have_content('购物车')
    end

    it "login with new register username" do
      visit '/register'
      fill_in '邮箱：', :with => 'sj@sj.com'
      fill_in '密码：', :with => 'aaaaaa'
      fill_in '确认密码：', :with => 'aaaaaa'
      fill_in '姓名：', :with => 'sj'
      fill_in '电话：', :with => '111111111'
      click_button '注 册'
      expect(current_path).to eq "/"
      visit '/login'
      fill_in '邮箱：', :with => 'sj@sj.com'
      fill_in '密码：', :with => 'aaaaaa'
      click_button '登 录'
      expect(current_path).to eq "/"
      expect(page).to have_content('sj')
      expect(page).to have_content('购物车')
    end

    it "login with existing admin status" do
      visit '/login'
      fill_in '邮箱：', :with => 'admin'
      fill_in '密码：', :with => 'letsgo'
      click_button '登 录'
      expect(current_path).to eq "/"
      expect(page).to have_content('admin')
    end
  end

  describe "logout test", :js => true do
    before do
      page.set_rack_session user: "admin", isLogin: true, role: "admin", username: "admin"
    end

    it "logout after login" do
      visit '/'
      visit '/logout'
      expect(current_path).to eq "/login"
      expect(page).to have_content(' 登录')
    end
  end
end
