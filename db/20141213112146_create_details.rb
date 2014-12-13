class CreateDetails < ActiveRecord::Migration
  def change
    create_table :details do |t|
      t.string :name
      t.string :unit
      t.float :price
      t.integer :number
      t.boolean :promotion
      t.integer :numberForFree
      t.float :totalcost
      t.integer :order_id
      t.timestamps
    end
  end
end
