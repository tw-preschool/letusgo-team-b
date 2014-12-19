#encoding: utf-8
require_relative '../spec_helper'

describe "register test", :type => :feature do
  describe "correct test", :js => true do
    it "register page should accessible" do
      visit '/register'
      expect(page).to have_content('用户注册')
    end
  end
end
