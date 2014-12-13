class CreateOrders < ActiveRecord::Migration
  def change
      create_table :orders do |t|
      t.float :totalcost
      t.string :state
      t.timestamps
    end
  end
end
