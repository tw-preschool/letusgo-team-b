require_relative '../spec_helper'

describe "ordersManagement test" do
  it "shoul store orders in db and find it out" do
    order = Order.create(username: 'tester', state: "unpaid", totalcost: 30)
    Detail.create(name: "orange",unit: 'kg', price: 12.00, number: 3, promotion: true, numberForFree: 1, totalcost: 24,order: order)
    Detail.create(name: "apple",unit: 'kg', price: 12.00, number: 3, promotion: true, numberForFree: 1, totalcost: 24,order: order)
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
    expect(detail.price).to eq 12.00
    expect(detail.number).to eq 3
    expect(detail.promotion).to eq true
    expect(detail.numberForFree).to eq 1
    expect(detail.totalcost).to eq 24.00
  end
end
