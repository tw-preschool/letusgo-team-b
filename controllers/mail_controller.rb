# encoding: UTF-8
require 'action_mailer'
require 'mail'

def mailSender(email,name)
  context = binding
  smtp = { :address => 'smtp.163.com',
           :port => 25,
           :domain => 'smtp.163.com',
           :user_name => 'zhen6939@163.com',
           :password => 'zhen3853554',
           :enable_starttls_auto => true,
           :openssl_verify_mode => 'none'
  }
  Mail.defaults { delivery_method :smtp, smtp }

  user = User.find_by_sql(['select * from users where email=?',email])
  mail = Mail.new do
    from 'zhen6939@163.com'
    to user.first.email
    add_file './public/styles/imgs/logo.png'
    pic = attachments['logo.png']
    subject user.first.name + "，欢迎加入Let's Go"
    html_part do
      content_type 'text/html;charset=UTF-8'
      body  ERB.new(File.read("./views/mail.html.erb")).result(context) + "<img src='cid:#{pic.cid}'>"

    end
  end
  # mail.add_file("./public/styles/imgs/logo.png")
  # mail.parts.first.attachment? #=> true
  # mail.parts.first.content_transfer_encoding.to_s #=> 'base64'
  # mail.attachments.first.mime_type #=> 'image/jpg'
  # mail.attachments.first.filename #=> 'file.jpg'
  # mail.attachments.first.decoded == File.read('./public/styles/imgs/logo.png') #=> true
  begin
    mail.deliver!
  rescue Exception => e
    puts e.message
  end
end
