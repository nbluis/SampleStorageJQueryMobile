require 'rubygems'
require 'sinatra'

get '/' do
	erb :index
end

get '/remote-request' do
    erb :remote
end

get '/calculate' do
    (params[:operand].to_i + params[:operator].to_i).to_s
end
