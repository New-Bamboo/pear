define([
  'vendor/controller',
  'vendor/template!mini_video'
], function (Controller, template) {
  
  return Controller.sub('MiniVideoController')

    .models('stream')

    .onModel('stream', 'loaded', 'onLoaded')

    .proto({
      createDOM: function () {
        return $('<div>').addClass('mini-video-controller')
      },

      render: function () {
        $(this.dom).html(template())
      },

      onLoaded: function (stream) {
        var video = this.find('video')[0]
        video.src = webkitURL.createObjectURL(stream)
      }
    })

    .after('init', function () {
      this.render()
    })

})
