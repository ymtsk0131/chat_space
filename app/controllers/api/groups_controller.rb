class Api::GroupsController < ApplicationController
  def index
    groups = Group.all
    render json: groups
  end

  def show
    group = Group.find(params[:id])
    users = group.users
    response = {
      id:    group.id,
      name:  group.name,
      users: users
    }
    render json: response
  end
end
