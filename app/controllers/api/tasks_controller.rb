class Api::TasksController < Api::ApiController
  def index
    user   = current_user
    @tasks = Task.where(creator_id: user.id).order(:due_date)
  end

  def update
    param = task_params
    task = Task.find(params[:id])
    if param[:done]
      task.done
    else
      task.update!(param)
    end
  end

  def destroy
    task = Task.find(params[:id])
    unless task.modifiable?(current_user.id)
      raise NotFoundError
    end
    task.destroy!
  end

  private

  def task_params
    params.require(:task).permit(:title, :due_date, :done)
  end
end
