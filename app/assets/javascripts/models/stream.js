define([
  'vendor/model'
], function (Model) {
  return Model.sub('Stream')

    .attributes('stream')

    .proto({
      loaded: function (stream) {
        this.setStream(stream)
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
