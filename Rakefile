# encoding: utf-8
require 'active_record'
require 'logger'
require 'yaml'
require './models/order'
require './models/detail'
require './models/product'
require './models/user'

desc "Migrate the database through scripts in db/."
task :migrate => :environment do
    ActiveRecord::Migrator.migrate('db/', ENV["VERSION"] ? ENV["VERSION"].to_i : nil )
end
task :environment do
    dbconfig = YAML.load(File.open("config/database.yml").read)
    env = ENV["RACK_ENV"] || "test"
    ActiveRecord::Base.establish_connection(dbconfig[env])
    ActiveRecord::Base.logger = Logger.new(File.open('database.log', 'a'))
end

desc "insert items into orders"
task :seed => :setConfig do
  Rake::Task["environment"].invoke
  Rake::Task["seedOrderData"].invoke
  Rake::Task["seedProductData"].invoke
  Rake::Task["seedroot"].invoke
end
task :setConfig do
    ENV["RACK_ENV"] = "development"
end
task :seedOrderData do
  puts Order.create(username: 'tw@tw.com', totalcost: 2513, state: "待付款")
  puts Detail.create(name: "罗技 M185 无线鼠标",unit: '个', price: 59.00, number: 3,
                     promotion: "买二送一", numberForFree: 1, totalcost: 118, order_id: 1)
  puts Detail.create(name: "罗技 C270 高清网络摄像头",unit: '个', price: 149.00, number: 6,
                     promotion: "买二送一", numberForFree: 2, totalcost: 596, order_id: 1)
  puts Detail.create(name: "惠普 LaserJet Pro M1213nf 黑白多功能激光一体机",unit: '个', price: 1799.00, number: 1,
                     promotion: "", numberForFree: 0, totalcost: 1799, order_id: 1)
end
task :seedProductData do
  Product.delete_all
  puts Product.create(name: "罗技 M185 无线鼠标" , price: 59, unit: "个",
                      promotion: "true", number: 4,
                      description: "黑色蓝边。好评30万，月销过万，办公鼠标首选！").to_json
  puts Product.create(name: "罗技 C270 高清网络摄像头", price: 149, unit: "个",
                      promotion: "true", number: 57,
                      description: "音质好，画面清晰，自带话筒，罗技活色系列！").to_json
  puts Product.create(name: "惠普 LaserJet Pro M1213nf 黑白多功能激光一体机" , price: 1799, unit: "个",
                      promotion: "false", number: 2,
                      description: "智慧驱动，不用CD就能安装；有线网络接口，适合办公需求；首页输出仅需8.5秒，超级畅销的四合一一体机！").to_json
end

desc "construct root"
task :seedroot => :setConfig do
  User.delete_all
  puts User.create(email: "root", password: "letsgo", name: "root", address: "", phone: 8783212, role: "root", state: "active")
  puts User.create(email: "admin", password: "letsgo", name: "admin", address: "", phone: 8783212, role: "admin", state: "active")
  puts User.create(email: "tw@tw.com", password: "letsgo", name: "思特沃克", address: "西安锦业一路", phone: 8783212, role: "customer", state: "active")
end
task :specs do
  if ENV["RACK_ENV"] == 'test'
  	require 'rspec/core/rake_task'

  	RSpec::Core::RakeTask.new :specs do |task|
  		task.pattern = Dir['spec/**/*_spec.rb']
  	end

  	task :default => ['specs']
  end
end
task :default => ['migrate']
