import { APPLICATION } from '@shared/config'
import { app } from './server'
import { applyMigrations } from './shared/migrations'
import { applyMetadata } from './shared/metadata'
import axios from 'axios'
import './env-vars-check'
import './enabled-deprecation-warning'

const isHasuraReady = async () => {
  try {
    await axios.get(`${APPLICATION.HASURA_ENDPOINT.replace('/v1/graphql', '/healthz')}`)
  } catch (err) {
    console.log(`Couldn't find an hasura instance running on ${APPLICATION.HASURA_ENDPOINT}`)
    process.exit(1)
  }
}

const start = async (): Promise<void> => {
  await isHasuraReady()
  await applyMigrations()
  await applyMetadata()

  app.listen(APPLICATION.PORT, APPLICATION.HOST, () => {
    if (APPLICATION.HOST) {
      console.log(`Running on http://${APPLICATION.HOST}:${APPLICATION.PORT}`)
    } else {
      console.log(`Running on port ${APPLICATION.PORT}`)
    }
  })
}

start()
