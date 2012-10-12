class Event

  attr_reader :name, :payload, :destination, :source

  def initialize(name, attrs = {})
    @name = name
    @payload = attrs["payload"]
    @destination = attrs["destination"]
    @source = attrs["source"]
  end

  def send!
    Pusher[channel_name].trigger(name, self.as_json)
  end

  def as_json(opts={})
    {
      payload: payload,
      destination: destination,
      source: source
    }
  end

  private

  def channel_name
    "user;#{destination}"
  end

end
