class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :login_required

  private
  def login_required
    if current_user.blank?
      redirect_to login_url
    end
  end

  def current_user
    @current_user ||= session[:user_email]
  end
end
