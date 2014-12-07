# encoding: utf-8

require_relative '../spec_helper'

describe 'Products Management' do
  describe 'Manage Products Num ' do
    before { get '/products' }

    it 'is successful' do
      expect(last_response.status).to eq 200
    end

    
  end

end
