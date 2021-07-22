
import * as express from 'express'
import * as http from 'http'
import * as WebSocket from 'ws'

import {
  Hydrangea,
  HydrangeaMock,
  System
} from 'hydrangea'

import { health } from './health'

console.log('It is running here', __dirname)


const board = new HydrangeaMock()
const pin = board.createPin({ id: 17, direction: System.Direction.Out })

let state: boolean = false
pin.write(state)

const application = express()
const server = http.createServer(application)
const web = new WebSocket.Server({ server })

application.use('/v1/health', health)

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
