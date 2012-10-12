define([
  'models/user',
  'vendor/model'
], function (User, Model) {
  return Model.sub('Room')

    .attributes('channel')

    .collection('users')

    .proto({
      addUser: function (member) {
        this.users().add(new User({email: member.id}))
      },
      
      removeUser: function (member) {
        var user = this.users().detect(function (user) { if(user.email() === member.id) return true })
        if(user){
          this.users().remove(user)
        }
      }
    })
    
    .after('init', function () {
      this.channel().bind('pusher:member_added', this.addUser.bind(this))
      this.channel().bind('pusher:member_removed', this.removeUser.bind(this))
    })
})
