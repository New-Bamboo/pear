module Js
  class ControllerGenerator < ::Rails::Generators::NamedBase
    source_root File.expand_path('../templates', __FILE__)

    argument :name, :type => :string

    def create_stuff
      template "controller.coffee.erb",       "app/assets/javascripts/controllers/#{controller_name}.coffee"
      template "template.mustache.erb", "app/assets/javascripts/templates/#{underscore_name}.mustache"
      template "controller.css.scss.erb",     "app/assets/stylesheets/controllers/#{underscore_name}.css.scss"
      # apps.each do |app|
      #   if yes?("Create a handler for #{app} app?")
      #     template "handler.coffee.erb", "app/assets/javascripts/apps/#{app}/handlers/#{handler_name}.coffee"
      #   end
      # end
    end

    private

    def apps
      Dir['app/assets/javascripts/apps/*'].map{|d| d.split('/').last }
    end

    def underscore_name
      name.underscore.sub(/_controller$/, '')
    end

    def controller_name
      "#{underscore_name}_controller"
    end

    def handler_name
      "#{underscore_name}_handler"
    end

  end
end
