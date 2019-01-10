class Api::MessagesController < ApplicationController
  def index
    # group = Group.find(params[:group_id])
    messages = Message.where(group_id: params[:group_id])
                      .joins(:user)
                      .select('messages.*, users.name')
    render json: messages
  end
end
