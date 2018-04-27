class UsersController < ApplicationController

  def index
    if params[:group_id].present?
      member_ids = Group.find(params[:group_id]).user_ids
    else
      member_ids = []
    end
    @users = User.where('name LIKE(?)', "%#{params[:keyword]}%").where.not(id: member_ids)
    respond_to do |format|
      format.json
    end
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
