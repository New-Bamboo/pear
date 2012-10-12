Pear::Application.routes.draw do

  post "/events/offer" => "events#offer"
  post "/events/answer" => "events#answer"
  post "/events/candidate_from_caller" => "events#candidate_from_caller"
  post "/events/candidate_from_receiver" => "events#candidate_from_receiver"
  post "/events/hangup" => "events#hangup"

  resource :channel_auth, only: :create

  root :to => 'home#show'

  get '/room' => 'rooms#show', :as => :room

  match '/login' => redirect('/auth/google_apps')
  match '/logout' => 'sessions#destroy'

  match '/auth/:provider/callback' => 'sessions#create'
end
