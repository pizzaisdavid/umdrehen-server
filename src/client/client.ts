
import * as WebSocket from 'ws'

export class Client {
  private socket: WebSocket

  constructor(
    private readonly baseUrl: string
  ) {
    this.socket = new WebSocket(baseUrl)
  }

  async toggle(
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.socket.once('message', (socket: WebSocket, data: WebSocket.Data) => {
        resolve(data === 'true' ? true : false)
        return
      })
      this.socket.send('toggle', () => {
        console.log('toggle sent')
      })
    })
  }
}
