define([
  'vendor/controller',
  'vendor/template!room_app'
], function (Controller, template) {
  
  return Controller.sub('RoomAppController')

    .proto({
      createDOM: function () {
        return $('<div>').addClass('room-app-controller')
      },

      render: function () {
        return $(this.dom).html(template({greeting: 'Hello!'}))
      }
    })

    .after('init', function () {
      this.render()
    })

})
