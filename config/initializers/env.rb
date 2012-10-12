env_file = Rails.root.join('config/env.yml')
if env_file.exist?
  YAML.load_file(env_file).each do |key, value|
    ENV[key] = value
  end
end

