define([
  'controllers/main_controller',
  'controllers/sidebar_controller',
  'vendor/controller',
  'vendor/template!room_app'
], function (MainController, SidebarController, Controller, template) {
  
  return Controller.sub('RoomAppController')

    .proto({
      createDOM: function () {
        return $('<div>').addClass('room-app-controller')
      },

      render: function () {
        $(this.dom).html(template())
        this.addChild('sidebar', SidebarController)
        this.addChild('main', MainController)
      }
    })

    .after('init', function () {
      this.render()
    })

})
