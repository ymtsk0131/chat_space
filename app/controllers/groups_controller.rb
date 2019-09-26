class GroupsController < ApplicationController
  def index
    groups = Group.select(:id, :name)
    render json: groups
  end

  def show
    @group = Group.find(params[:id])
    render json: @group 
  end

  def create
    group = Group.new(group_params)
    group.users << current_user
    if group.save
      render json: group, status: :created
    else
      render json: { errors: group.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def edit
    @group = Group.find(params[:id])
  end

  def update
    @group = Group.find(params[:id])
    if @group.update(group_params)
      redirect_to root_path, notice: "グループを編集しました"
    else
      render :edit
    end
  end

  private

  def group_params
    params.require(:group).permit(:name, {user_ids: []})

  end
end
