
import {
  GetHealthResponse
} from '../server'

import * as WebSocket from 'ws'

export interface Http {
  get: <T>(url: string) => Promise<T>
  post: <T>(url: string, body: any) => Promise<T>
  delete: <T>(url: string) => Promise<T>
}

export class Client {
  constructor(
    private readonly baseUrl: string,
    private readonly http: Http,
    private readonly ws: WebSocket
  ) {

  }

  async getHealth (
  ): Promise<GetHealthResponse> {
    return await this.get('/v1/health')
  }

  async sendMessage (
    text: string
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ws.send('message', (error) => {
        if (error) {
          return reject()
        }
        resolve()
      })
    })
  }

  private async get<T> (
    resource: string
  ): Promise<T> {
    return await this.http.get(this.formatUrl(resource))
  }

  private formatUrl (
    resource: string
  ): string {
    return this.baseUrl + resource
  }
}
