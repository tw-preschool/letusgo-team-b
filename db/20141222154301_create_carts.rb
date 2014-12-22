class CreateUCarts < ActiveRecord::Migration
  def change
    create_table :carts do |t|
      t.string :email
      t.string :product_id
      t.integer :number
      t.timestamps
    end
  end
end
