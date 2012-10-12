define({
  load: function (name, req, load, config) {
    req(['vendor/requirejs.mustache', 'vendor/text!templates/'+name+'.mustache'], function (Mustache, html) {
      load(function(obj){
        return Mustache.render(html, obj)
      })
    })
  }
})
