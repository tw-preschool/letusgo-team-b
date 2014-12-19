#encoding: utf-8
require_relative '../spec_helper'

describe "register test", :type => :feature do
  describe "correct test", :js => true do
    it "register page should accessible" do
      visit '/register'
      expect(page).to have_content('用户注册')
    end
    it "should return success when filled with correct info" do
      visit '/register'
      fill_in '邮箱：', :with => 'sj@sj.com'
      fill_in '密码：', :with => '111111'
      fill_in '确认密码：', :with => '111111'
      fill_in '姓名：', :with => 'sj'
      fill_in '电话：', :with => '111111111'
      click_button '注 册'
      expect(current_path).to eq "/"
    end
  end
  describe "wrong test", :js => true do
    it "should warn wrong email address" do
      visit '/register'
      fill_in '邮箱：', :with => 'sj@sj'
      click_button '注 册'
      find("#email-err").visible?
    end
    it "should warn short password" do
      visit '/register'
      fill_in '邮箱：', :with => 'sj@sj.com'
      fill_in '密码：', :with => '111'
      click_button '注 册'
      find("#pass-err").visible?
    end
    it "should promt noneEqual-err when get unequal password" do
      visit '/register'
      fill_in '邮箱：', :with => 'sj@sj.com'
      fill_in '密码：', :with => '111111'
      fill_in '确认密码：', :with => '1111111'
      click_button '注 册'
      find("#noneEqual-err").visible?
    end
    it "should promt name-err when get illegal char" do
      visit '/register'
      fill_in '邮箱：', :with => 'sj@sj.com'
      fill_in '密码：', :with => '111111'
      fill_in '确认密码：', :with => '111111'
      fill_in '姓名：', :with => '__sj'
      click_button '注 册'
      find("#name-err").visible?
    end
    it "should promt phone-err when geting unproper phone number" do
      visit '/register'
      fill_in '邮箱：', :with => 'sj@sj.com'
      fill_in '密码：', :with => '111111'
      fill_in '确认密码：', :with => '111111'
      fill_in '姓名：', :with => 'sj'
      fill_in '电话：', :with => '11111'
      click_button '注 册'
      find("#phone-err").visible?
    end
    it "should promt exist-err when email has been registered" do
      visit '/register'
      fill_in '邮箱：', :with => 'sj@sj.com'
      fill_in '密码：', :with => '111111'
      fill_in '确认密码：', :with => '111111'
      fill_in '姓名：', :with => 'sj'
      fill_in '电话：', :with => '11111'
      click_button '注 册'
      visit '/register'
      fill_in '邮箱：', :with => 'sj@sj.com'
      fill_in '密码：', :with => '111111'
      fill_in '确认密码：', :with => '111111'
      fill_in '姓名：', :with => 'sj'
      fill_in '电话：', :with => '11111'
      click_button '注 册'
      find("#exist-err").visible?
    end
  end
end
