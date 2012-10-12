define([
  'controllers/mini_video_controller',
  'controllers/user_list_controller',
  'vendor/controller',
  'vendor/template!sidebar'
], function (MiniVideoController, UserListController, Controller, template) {
  
  return Controller.sub('SidebarController')

    .proto({
      createDOM: function () {
        return $('<div>').addClass('sidebar-controller')
      },

      render: function () {
        $(this.dom).html(template())
        this.addChild('user-list', UserListController)
        this.addChild('mini-video', MiniVideoController)
      }
    })

    .after('init', function () {
      this.render()
    })

})
