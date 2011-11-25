require 'rubygems'
require 'sinatra'

get '/' do
	erb :index
end

get '/remote' do
    erb :remote
end

get '/calculate' do
    sleep(0.5) #latency
    (params[:operand].to_i + params[:operator].to_i).to_s
end
