Pear::Application.routes.draw do

  post "/events/offer" => "events#offer"
  post "/events/answer" => "events#answer"
  post "/events/candidate" => "events#candidate"
  post "/events/hangup" => "events#hangup"

  root :to => 'home#show'

  get '/room' => 'rooms#show', :as => :room

  match '/login' => redirect('/auth/google_apps')
  match '/logout' => 'sessions#destroy'

  match '/auth/:provider/callback' => 'sessions#create'
end
