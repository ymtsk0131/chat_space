class UsersController < ApplicationController

  def index
    if params[:keyword].present?
      users = User.where('name LIKE(?)', "%#{params[:keyword]}%")
                  .where.not(id: params[:user_ids])
    else
      users = []
    end
    render json: users
  end

  def show
    user = current_user
    render json: user
  end

  def edit
    @user = current_user
  end

  def update
    @user.update(user_prams)
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
