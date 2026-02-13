class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern
  
  before_action :set_user_session

  private

  def set_user_session
    session[:user_uuid] ||= SecureRandom.uuid
  end
end
