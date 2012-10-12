define([
  'vendor/controller',
  'vendor/template!call'
], function (Controller, template) {
  
  return Controller.sub('CallController')

    .models('videoStream')

    .proto({
      createDOM: function () {
        return $('<div>').addClass('call-controller')
      },

      render: function () {
        $(this.dom).html(template())
      }
    })

    .after('init', function () {
      this.render()
      console.log(this.videoStream)
      var video = this.find('video')[0],
          src = webkitURL.createObjectURL(this.videoStream)
      console.log(video, src)
      video.src = src
    })

})
