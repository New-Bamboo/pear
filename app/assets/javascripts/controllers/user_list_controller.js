define([
  'vendor/controller',
  'vendor/template!user_list'
], function (Controller, template) {
  
  return Controller.sub('UserListController')

    .proto({
      createDOM: function () {
        return $('<div>').addClass('user-list-controller')
      },

      render: function () {
        $(this.dom).html(template({greeting: 'Hello!'}))
      }
    })

    .after('init', function () {
      this.render()
    })

})
