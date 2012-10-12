Pear::Application.routes.draw do
  root :to => 'home#show'

  get '/room' => 'rooms#show', :as => :room

  match '/login' => redirect('/auth/google_apps')
  match '/logout' => 'sessions#destroy'

  match '/auth/:provider/callback' => 'sessions#create'
end
