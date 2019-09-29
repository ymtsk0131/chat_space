class MessagesController < ApplicationController
  before_action :set_group

  def index
    messages = @group.messages
    render json: messages
  end

  def create
    message = @group.messages.new(message_params)
    if message.save
      ActionCable.server.broadcast(
        'message_channel',
        user: {
          name: message.user.name
        },
        content: message.content,
        created_at: message.created_at
      )
    else
      render json: { errors: message.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
