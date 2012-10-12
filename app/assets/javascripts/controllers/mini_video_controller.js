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
        $(this.dom).html(template({greeting: 'Hello!'}))
      }
    })

    .after('init', function () {
      this.render()
    })

})
