
import * as WebSocket from 'ws'

export class Client {

  static async create (
    baseUrl: string
  ): Promise<Client> {
    const client = new Client(baseUrl)
    await client.open()
    return client
  }

  private socket: WebSocket

  constructor(
    private readonly baseUrl: string
  ) {
    this.socket = new WebSocket(baseUrl)
  }

  async open(
  ): Promise<void> {
    if (this.socket.readyState === 1) {
      return
    }
    return new Promise((resolve) => {
      this.socket.on('open', resolve)
    })
  }

  async toggle(
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.socket.on('toggled', (socket: WebSocket, data: WebSocket.Data) => {
        console.log('data')
        console.log(data)
        resolve(data === 'true' ? true : false)
      })
      this.socket.send('toggle')
    })
  }
}
