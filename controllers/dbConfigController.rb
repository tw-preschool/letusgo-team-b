require 'active_record'

class DbConfig < Sinatra::Base
  dbconfig = YAML.load(File.open("config/database.yml").read)

  configure :development do
    require 'sqlite3'
    ActiveRecord::Base.establish_connection(dbconfig['development'])
  end

  configure :test do
    require 'sqlite3'
    ActiveRecord::Base.establish_connection(dbconfig['test'])
  end

  use Rack::PostBodyContentTypeParser
  before do
    content_type :json
    @isLogin = session[:isLogin]
    @user = session[:user]
    users = User.where(email: @user)
    if users.count > 0
      @role = users.first.role
    else
      @role = ""
    end
  end
end
