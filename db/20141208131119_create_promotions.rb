class CreatePromotions < ActiveRecord::Migration
  def change
    create_table :promotions do |t|
      t.string :name
      t.string :promotionStatus

      t.timestamps
    end
  end
end
