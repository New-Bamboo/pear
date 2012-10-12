Pear::Application.routes.draw do

  post "/events/offer" => "events#offer"
  post "/events/answer" => "events#answer"
  post "/events/candidate" => "events#candidate"
  post "/events/hangup" => "events#hangup"

  root to: 'rooms#show'
end
