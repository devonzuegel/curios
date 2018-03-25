import * as dotenv from 'dotenv'
dotenv.config()

import {toNumber} from 'lodash'
/**
 * Note that PIPELINE_STAGE environment variable differs from NODE_ENV. Both our
 * curios-web--staging and curios-web--live apps have NODE_ENV=production, but they
 * have PIPELINE_STAGE=staging and PIPELINE_STAGE=production, respectively. This
 * is because we want all build steps and behavior to be equivalent across the two
 * apps (i.e. we want curios-web--staging to behave like a production app), but in
 * a few rare cases we wish to expose the name of the pipeline stage to the user.
 * (For example, when sending emails from staging, we want to prepend the subject
 * with "[staging]" to indicate it is not the live environment.)
 */

export enum PipelineStages {
  development = 'development',
  ci = 'ci',
  staging = 'staging',
  production = 'production',
}

interface IEnvironmentConfig {
  appPort: number
  nodeEnv: string
  pipelineStage: PipelineStages
  redisUrl: string
  sessionSecret: string
  hostname: string
}

// Throw an error if the specified environment variable is not defined
function environmentVariable(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Expected environment variable ${name}`)
  }
  return value
}

const getPipelineStage = (): PipelineStages => {
  const stage = environmentVariable('PIPELINE_STAGE')

  if (stage in PipelineStages) {
    return PipelineStages[stage]
  }

  const stagesStr = JSON.stringify(Object.keys(PipelineStages))
  throw Error(`Please define PIPELINE_STAGE as one of: ${stagesStr}.`)
}

function getPort(): number {
  const port = process.env.PORT
  if (!port) {
    return 5000
  }

  return toNumber(port)
}

export const env: IEnvironmentConfig = {
  appPort: getPort(),
  nodeEnv: environmentVariable('NODE_ENV'),
  pipelineStage: getPipelineStage(),
  redisUrl: environmentVariable('REDIS_URL'),
  sessionSecret: environmentVariable('SESSION_SECRET'),
  hostname: environmentVariable('HOSTNAME'),
}
