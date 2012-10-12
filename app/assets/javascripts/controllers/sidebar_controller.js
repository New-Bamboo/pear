define([
  'vendor/controller',
  'vendor/template!sidebar'
], function (Controller, template) {
  
  return Controller.sub('SidebarController')

    .proto({
      createDOM: function () {
        return $('<div>').addClass('sidebar-controller')
      },

      render: function () {
        $(this.dom).html(template({greeting: 'Hello!'}))
      }
    })

    .after('init', function () {
      this.render()
    })

})
