define([
  'controllers/call_controller',
  'vendor/controller',
  'vendor/template!main'
], function (CallController, Controller, template) {
  
  return Controller.sub('MainController')

    .models('line')

    .onModel('line', 'stream', 'onNewStream')

    .proto({
      createDOM: function () {
        return $('<div>').addClass('main-controller')
      },

      render: function () {
        $(this.dom).html(template())
      },

      onNewStream: function (videoStream) {
        this.addChild('call', CallController, {videoStream: videoStream})
      }
    })

    .after('init', function () {
      this.render()
    })

})
