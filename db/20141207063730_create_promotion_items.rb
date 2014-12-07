class CreatePromotionItems < ActiveRecord::Migration
  def change
    create_table :promotion_items do |t|
      t.float :barcode

      t.timestamps
    end
  end
end
