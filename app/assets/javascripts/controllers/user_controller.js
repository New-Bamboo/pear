define([
  'vendor/controller',
  'vendor/template!user'
], function (Controller, template) {
  
  return Controller.sub('UserController')

    .models('user')

    .onDOM('', 'click', 'onSelect')

    .proto({
      createDOM: function () {
        return $('<li>').addClass('user-controller')
      },

      render: function () {
        $(this.dom).html(template({user: this.user}))
      },
      
      onSelect: function () {
        alert(this.user.email())
      }
    })

    .after('init', function () {
      this.render()
    })

})
