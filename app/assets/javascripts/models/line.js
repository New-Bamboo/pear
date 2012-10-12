define([
  'vendor/model'
], function (Model) {
  return Model.sub('Line')

    .attributes('pusher', 'user', 'stream')

    .proto({
      callUser: function (user) {
        var peerConnection = new webkitRTCPeerConnection(null)

        peerConnection.addStream(this.stream().stream())

        this.bind('answer', function (data) {
          peerConnection.onicecandidate = (function(event) {
            if (event.candidate) {
              this.trigger('candidate_from_caller', {payload: event.candidate, destination: data.source})
            }
          }).bind(this)

          var desc = new RTCSessionDescription(data.payload)
          peerConnection.setRemoteDescription(desc);
        })
        this.bind('candidate_from_receiver', function (data) {
          var candidate = new RTCIceCandidate(data.payload)
          peerConnection.addIceCandidate(candidate);
        })

        peerConnection.createOffer((function (desc) {
          peerConnection.setLocalDescription(desc);
          this.trigger('offer', {
            payload: desc,
            destination: user.email()
          })
        }).bind(this))

        this.bind('hangup', function () {
          peerConnection.close()
          peerConnection = null
        })
      },

      listen: function () {
        var peerConnection = new webkitRTCPeerConnection(null);

        peerConnection.onaddstream = (function (e) {
          this.emit('stream', e.stream)
        }).bind(this);

        this.bind('offer', function(data){
          peerConnection.onicecandidate = (function (event) {
            if (event.candidate) {
              this.trigger('candidate_from_receiver', {payload: event.candidate, destination: data.source})
            }
          }).bind(this)

          var desc = new RTCSessionDescription(data.payload)
          peerConnection.setRemoteDescription(desc)
          peerConnection.createAnswer((function(desc) {
            peerConnection.setLocalDescription(desc);
            this.trigger('answer', {destination: data.source, payload: desc})
          }).bind(this))
        })

        this.bind('candidate_from_caller', function (data) {
          var candidate = new RTCIceCandidate(data.payload)
          peerConnection.addIceCandidate(candidate)
        })

        this.bind('hangup', function () {
          peerConnection.close()
          peerConnection = null
        })
      },

      bind: function (eventName, callback) {
        this.channel.bind(eventName, callback.bind(this))
      },

      trigger: function (eventName, params) {
        $.post('/events/'+eventName, {event: params})
      }

    })
    
    .after('init', function () {
      this.channel = this.pusher().subscribe('user;'+this.user().email())
      this.listen()
    })
})
