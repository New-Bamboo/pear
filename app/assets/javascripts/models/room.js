define([
  'models/user',
  'vendor/model'
], function (User, Model) {
  return Model.sub('Room')

    .collection('users')

    .proto({
      // someMethod: function () {
      //  
      // }
    })
    
    .after('init', function () {
      this.setUsers([
        new User({email: 'Tom'}),
        new User({email: 'Mark'}),
        new User({email: 'Ollie'})
      ])
    })
})
