
import * as express from 'express'
import * as http from 'http'
import * as WebSocket from 'ws'

import {
  Hydrangea,
  System
} from 'hydrangea'

console.log('It is running here', __dirname)

const board = new Hydrangea()
const pin = board.createPin({ id: '17' as any, direction: System.Direction.Out })

let state: boolean = false
pin.write(state)

const application = express()
const server = http.createServer(application)
const web = new WebSocket.Server({ server })

application.use('/v1/health', (
  request: express.Request,
  response: express.Response<any>
) => {
  state = !state
  pin.write(state)
    .then(() => {
      console.log('toggled', state)
      response
        .status(200)
        .json({ status: 'yep!' })
        .end()
    })
  }
)

web.on('connection', (socket) => {
  console.log('connection')

  socket.on('message', (message) => {
    console.log('message', message)

    if (message === 'toggle') {
      state = !state
      pin.write(state)
        .then(() => {
          console.log('toggled', state)
          socket.emit('toggled', state)
        })
    }
  })
})

const port = 18170
server.listen(port, () => {
  console.log(`running on http://localhost:${port}/v1/health`)
})
