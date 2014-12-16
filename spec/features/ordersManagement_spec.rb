require_relative '../spec_helper'

describe "ordersManagement test"
  before :each do
    order = Order.create(username: 'tester', state: "unpaid", totalcost: 30)
    Detail.create(name: "orange",unit: 'kg', price: 12.00, number: 3, promotion: true, numberForFree: 1, totalcost: 24,order: order)
    Detail.create(name: "apple",unit: 'kg', price: 12.00, number: 3, promotion: true, numberForFree: 1, totalcost: 24,order: order)
  end
  describe "the orders management page should be available"
    visit "/"
  end
end
