const Express = require('express')
const app = new Express()

// const http = require('http').Server(app)

const io = require('socket.io')(app)

const port = 3002

io.on('connection', function (socket) {
  // connected io success
  console.log('connected : ID =>', socket.id)

  socket.on('sendMessage', (msg) => {
    io.emit('sendMessage', msg)
  })
})

app.listen(port, function () {
  console.log('Socket run on port:', port)
})
