define([
  'models/user',
  'vendor/model'
], function (User, Model) {
  return Model.sub('Room')

    .attributes('channel', 'pusher')

    .collection('users')

    .proto({
      addUser: function (member) {
        console.log(member)
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
      this.setChannel(this.pusher().subscribe('presence-room'))
      var channel = this.channel()
      
      channel.bind('pusher:subscription_succeeded', (function (members) {
        members.each(this.addUser.bind(this))
      }).bind(this))
      channel.bind('pusher:member_added', this.addUser.bind(this))
      channel.bind('pusher:member_removed', this.removeUser.bind(this))
    })
})
