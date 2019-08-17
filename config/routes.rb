Rails.application.routes.draw do
  devise_for :users
  root to: 'home#index'
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
  end
  resources :users, only: [:index]
end
