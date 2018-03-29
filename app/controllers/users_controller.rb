class UsersController < ApplicationController

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
