define([
  'controllers/main_controller',
  'controllers/sidebar_controller',
  'models/room',
  'vendor/controller',
  'vendor/template!room_app'
], function (MainController, SidebarController, Room, Controller, template) {
  
  return Controller.sub('RoomAppController')

    .models('pusher')

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
      var presenceChannel = this.pusher.subscribe('presence-room')
      this.newModel('room', new Room({channel: presenceChannel}))
      this.newModel('users', this.room.users())
      
      this.render()
    })

})
