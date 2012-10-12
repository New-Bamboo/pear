define([
  'controllers/main_controller',
  'controllers/sidebar_controller',
  'models/room',
  'vendor/controller',
  'vendor/template!room_app'
], function (MainController, SidebarController, Room, Controller, template) {
  
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
      this.newModel('room', new Room())
      this.newModel('users', this.room.users())
      this.render()
    })

})
