class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email
      t.string :password
      t.string :name
      t.string :address
      t.integer :phone
      t.string :role
      t.string :state
      t.string :identify_code		
      t.timestamps
    end
  end
end
