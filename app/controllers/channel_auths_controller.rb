class ChannelAuthsController < ApplicationController
  protect_from_forgery except: :create
  skip_before_filter :login_required

  def create
    if current_user
      render json: Pusher[params[:channel_name]].authenticate(params[:socket_id], user_id: current_user)
    else
      render nothing: true, status: 403
    end
  end
end
