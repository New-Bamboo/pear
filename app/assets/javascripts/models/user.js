define([
  'vendor/model'
], function (Model) {
  return Model.sub('User')

    .attributes('email')

    .proto({
      // someMethod: function () {
      //  
      // }
    })
    
    .after('init', function () {
      // do something
    })
})
