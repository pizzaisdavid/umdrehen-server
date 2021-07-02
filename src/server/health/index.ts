
import * as express from 'express'

interface GetHealthResponse {
  status: boolean
}

const router = express.Router()

router.get('/', (
  request: express.Request,
  response: express.Response<GetHealthResponse>
) => {
  response
    .status(200)
    .json({
      status: true
    })
})

export {
  router as health,
  GetHealthResponse
}
