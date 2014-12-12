# encoding: utf-8

require_relative '../spec_helper'

describe 'Products Management' do

  describe 'Manager login ' do
    it ' successfully' do
      get '/login'
      expect(last_response.status).to eq 200
    end
  end

  describe 'add a product' do
    let(:body) { {:name => "peach", :price => 12, :unit => "kg"} }

    it 'add a product'  do
      post '/products', body, {'Content-Type' => 'application/json'}
      expect(last_response.status).to eq 201

      get '/products'
      created = JSON.parse(last_response.body)[0]

      expect(created['name']).to eq "peach"
      expect(created['price']).to eq 12
      expect(created['unit']).to eq "kg"
    end

  end

  describe 'delete a product ' do
    it ' successfully' do
      post '/products'
      expect(last_response.status).to eq 201
    end
  end

  describe 'fix product info ' do
    it 'get the product' do
      get '/products'
      expect(last_response.status).to eq 200
    end
    it ' fix successfully' do
      post '/item-edit'
      expect(last_response.status).to eq 201
    end
  end



end
