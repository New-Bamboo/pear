define([
  'vendor/controller',
  'vendor/template!main'
], function (Controller, template) {
  
  return Controller.sub('MainController')

    .proto({
      createDOM: function () {
        return $('<div>').addClass('main-controller')
      },

      render: function () {
        $(this.dom).html(template({greeting: 'Hello!'}))
      }
    })

    .after('init', function () {
      this.render()
    })

})
