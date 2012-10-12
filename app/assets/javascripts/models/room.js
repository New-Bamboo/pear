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
        new User({name: 'Tom'}),
        new User({name: 'Mark'}),
        new User({name: 'Ollie'})
      ])
    })
})
