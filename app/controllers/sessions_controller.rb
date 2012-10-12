class SessionsController < ApplicationController
  skip_before_filter :login_required

  def create
    session[:user_email] = request.env['omniauth.auth']['info']['email']
    redirect_to room_path
  end

  def destroy
    reset_session
    redirect_to root_path
  end
end
