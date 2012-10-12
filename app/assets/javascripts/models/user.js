define([
  'vendor/model'
], function (Model) {
  return Model.sub('User')
  
    .proto({
      // someMethod: function () {
      //  
      // }
    })
    
    .after('init', function () {
      // do something
    })
})
