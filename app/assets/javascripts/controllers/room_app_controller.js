define([
  'controllers/main_controller',
  'controllers/sidebar_controller',
  'models/line',
  'models/phone',
  'models/room',
  'models/stream',
  'models/user',
  'vendor/controller',
  'vendor/template!room_app'
], function (MainController, SidebarController, Line, Phone, Room, Stream, User, Controller, template) {
  
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

    .after('init', function (models, opts) {
      this.newModel('user', new User({email: opts.email}))
      this.newModel('room', new Room({pusher: this.pusher}))
      this.newModel('users', this.room.users())
      this.newModel('phone', new Phone())
      this.newModel('stream', new Stream())
      this.newModel('line', new Line({user: this.user, pusher: this.pusher}))
      this.render()
    })

})
