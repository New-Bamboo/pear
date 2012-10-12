var app = require('express')(),
    server = require('http').createServer(app),
    fs = require('fs'),
    io = require('socket.io').listen(server)

var clients = {}

var handshakeOn = function (type, sourceId) {
  return function (data) {
    console.log("EGG", data.destId)

    var destination = clients[data.destId]

    destination.emit(type, {
      payload: data.payload,
      source: sourceId
    })
  }
}

server.listen(1337)

app.get('/', function (req, res) {
  fs.createReadStream('pc1.html').pipe(res)
})

io.sockets.on('connection', function (socket) {
  var id = socket.id,
      currentClients = Object.keys(clients)

  socket.emit('welcome', id)
  io.sockets.emit('users', currentClients.slice().concat(id))

  clients[id] = socket

  socket.on('offer', handshakeOn('offer', id))
  socket.on('answer', handshakeOn('answer', id))
  socket.on('candidate1', handshakeOn('candidate1', id))
  socket.on('candidate2', handshakeOn('candidate2', id))

  socket.on('disconnect', function (data) {
    delete clients[id]

    io.sockets.emit('disconnected', id)
    io.sockets.emit('users', Object.keys(clients))
  })
})
