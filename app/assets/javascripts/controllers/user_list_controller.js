define([
  'controllers/user_controller',
  'vendor/controller',
  'vendor/template!user_list'
], function (UserController, Controller, template) {
  
  return Controller.sub('UserListController')

    .models('users')

    .onModel('users', 'add', 'addUser')
    .onModel('users', 'remove', 'removeUser')

    .proto({
      createDOM: function () {
        return $('<ul>').addClass('user-list-controller')
      },

      render: function () {
        this.users.forEach(this.addUser.bind(this))
      },

      addUser: function (user) {
        this.addChild(user.email(), UserController, {user: user})
      },

      removeUser: function (user) {
        this.destroyChild(user.email())
      }
    })

    .after('init', function () {
      this.render()
    })

})
