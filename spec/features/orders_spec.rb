#encoding: utf-8
require_relative '../spec_helper'

describe "testing order management function" ,:type => :feature do
  before :each do
    order = {:username => "tester", :state => "unpaid", :totalcost => 30}
    detail0 = {:name => "orange",:unit => 'kg', :price => 12.00, :number => 3, :promotion => true, :numberForFree => 1, :totalcost => 24}
    detail1 = {:name => "apple",:unit => 'kg', :price => 24.00, :number => 3, :promotion => false, :numberForFree => 0, :totalcost => 72}
    body = {:order => order, :detail0 => detail0, :detail1 => detail1}
    post "/addOrder" ,body
  end
  it "shoul store orders in db" do
    expect(last_response.status).to eq 201
    expect(Order.count).to eq 1
    order = Order.last
    expect(order.username).to eq 'tester'
  end
  it "should find it out" do
    visit "/"
    order = Order.last
    expect(order.username).to eq 'tester'
    expect(order.totalcost).to eq 30
    expect(order.state).to eq 'unpaid'
    details = order.details
    expect(details.count).to eq 2
    detail = details.first
    expect(detail.name).to eq 'orange'
    expect(detail.unit).to eq 'kg'
    expect(detail.price).to eq 12.00
    expect(detail.number).to eq 3
    expect(detail.promotion).to eq true
    expect(detail.numberForFree).to eq 1
    expect(detail.totalcost).to eq 24.00
    detail = details.at(1)
    expect(detail.name).to eq 'apple'
    expect(detail.unit).to eq 'kg'
    expect(detail.price).to eq 24.00
    expect(detail.number).to eq 3
    expect(detail.promotion).to eq false
    expect(detail.numberForFree).to eq 0
    expect(detail.totalcost).to eq 72.00
  end

  it "should list orders when visiting /orders" do
    visit "/orders"
    expect(page).to have_content('tester')
    expect(page).to have_content('30.00')
    expect(page).to have_content('unpaid')
    expect(page).to have_content('details')
  end

  it "should list details when clicking details button" do
    visit "/orders"
    click_link 'details'
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
    click_link 'details'
    click_link 'return to orders'
    expect(current_path).to eq "/orders"
  end
end
