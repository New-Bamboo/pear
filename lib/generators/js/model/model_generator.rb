module Js
  class ModelGenerator < ::Rails::Generators::NamedBase
    source_root File.expand_path('../templates', __FILE__)

    argument :name, :type => :string

    def create_stuff
      template "model.js.erb", "app/assets/javascripts/models/#{model_name}.js"
      # template "spec.coffee.erb", "spec/javascripts/models/#{model_name}_spec.coffee"
    end

    private

    def model_name
      "#{name}".underscore
    end

    def js_variable_name
      model_name.camelize.sub(/./){|char| char.downcase }
    end

  end
end
