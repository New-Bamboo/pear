class EventsController < ApplicationController

  EVENT_TYPES = [:offer, :answer, :candidate, :hangup]

  EVENT_TYPES.each do |event_type|
    define_method event_type do
      Event.new(event_type, event_params).send!
      render nothing: true, status: 201
    end
  end

  private

  def event_params
    params[:event].select do |key, _|
      %w(payload destination source).include?(key)
    end
  end
end