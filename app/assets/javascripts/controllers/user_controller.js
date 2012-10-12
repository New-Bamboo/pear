define([
  'vendor/controller',
  'vendor/template!user'
], function (Controller, template) {
  
  return Controller.sub('UserController')

    .models('user')

    .proto({
      createDOM: function () {
        return $('<li>').addClass('user-controller')
      },

      render: function () {
        $(this.dom).html(template({user: this.user}))
      }
    })

    .after('init', function () {
      this.render()
    })

})
