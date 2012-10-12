define([
  'vendor/controller',
  'vendor/template!mini_video'
], function (Controller, template) {
  
  return Controller.sub('MiniVideoController')

    .proto({
      createDOM: function () {
        return $('<div>').addClass('mini-video-controller')
      },

      render: function () {
        $(this.dom).html(template())
      }
    })

    .after('init', function () {
      this.render()
      
      var video = this.find('video')[0]
      
      navigator.webkitGetUserMedia(
        {audio:true, video:true},
        function (stream) {
          video.src = webkitURL.createObjectURL(stream);
        },
        function() {}
      );

    })

})
