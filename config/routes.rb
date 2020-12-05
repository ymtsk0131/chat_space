Rails.application.routes.draw do
  devise_for :users
  root to: 'home#index'

  scope :api, {format: 'json'} do
    resources :groups, only: [:index, :show, :new, :create, :edit, :update] do
      resources :messages, only: [:index, :create]
    end
    resource :users, only: [:show]
    get 'search_users', to: 'users#index'
  end
  resources :users, only: [:index]

  devise_scope :user do
    post 'users/guest_sign_in', to: 'users/sessions#new_guest'
  end

  mount ActionCable.server => '/cable'
end
