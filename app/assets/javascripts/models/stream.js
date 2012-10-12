define([
  'vendor/model'
], function (Model) {
  return Model.sub('Stream')
  
    .proto({
      loaded: function (stream) {
        this.emit('loaded', stream)
      }
    })
    
    .after('init', function () {
      navigator.webkitGetUserMedia(
        {audio:true, video:true},
        this.loaded.bind(this),
        function() {}
      )
    })
})
