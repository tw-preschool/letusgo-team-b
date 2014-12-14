require 'active_record'
require 'logger'
require 'yaml'
require './models/order'
require './models/detail'
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
end
task :setConfig do
    ENV["RACK_ENV"] = "development"
end

task :seedOrderData do
  5.times do |i|
    @order = Order.create(username: 'tester',totalcost: 20,state: "unpaid")
    puts @order
    i.times do |j|
      puts Detail.create(name: "apple#{i}-#{j}",unit: 'kg', price: 12.00, number: 3, promotion: true, numberForFree: 1, totalcost: 24,order: Order.find(i))
    end
  end
end
task :seedProductData do
  Product.delete_all
  5.times do |i|
    puts Product.create(name: "p#{i}",price: 1, unit: "kg", promotion: false,number: 0,description: "").to_json
  end
end

if ENV["RACK_ENV"] == 'test'
	require 'rspec/core/rake_task'

	RSpec::Core::RakeTask.new :specs do |task|
		task.pattern = Dir['spec/**/*_spec.rb']
	end

	task :default => ['specs']
end

task :default => ['migrate']
