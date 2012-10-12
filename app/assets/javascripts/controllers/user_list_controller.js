define([
  'controllers/user_controller',
  'vendor/controller',
  'vendor/template!user_list'
], function (UserController, Controller, template) {
  
  return Controller.sub('UserListController')

    .models('users')

    .proto({
      createDOM: function () {
        return $('<div>').addClass('user-list-controller')
      },

      render: function () {
        $(this.dom).html(template())
        this.users.forEach(function (user) {
          this.addChild('user', UserController, {user: user})
        }, this)
      }
    })

    .after('init', function () {
      this.render()
    })

})
