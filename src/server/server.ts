
import * as express from 'express'
import * as http from 'http'
import * as WebSocket from 'ws'

import { Gpio, BinaryValue } from 'onoff'

import { health } from './health'

console.log('It is running here', __dirname)


process.on('uncaughtException', (error) => {
  console.log(error)
  console.log('yo!')
})


const led = new Gpio(17, 'out')

let state: BinaryValue = 0
led.writeSync(state)

const application = express()
const server = http.createServer(application)
const web = new WebSocket.Server({ server })

application.use('/v1/health', health)

web.on('connection', (socket) => {
  console.log('connection')

  socket.on('message', (message) => {
    console.log('message', message)

    if (message === 'toggle') {
      state = (state === 0) ? 1 : 0
      led.writeSync(state)
      socket.send('toggled', () => {
        console.log('sent whatup?')
      })
    }
  })
})

const port = 36361
server.listen(port, () => {
  console.log(`running on http://localhost:${port}/v1/health`)
})
