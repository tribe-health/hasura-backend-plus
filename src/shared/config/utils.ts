// * Helpers for casting environment variables
export const castBooleanEnv = (envVar: string, defaultValue = false): boolean => {
  if (envVar && envVar.endsWith('ENABLE')) {
    console.warn(`Please update ${envVar} to ${envVar.replace('ENABLE', 'ENABLED')}`)
  }
  return process.env[envVar] ? process.env[envVar]?.toLowerCase() === 'true' : defaultValue
}

export const castIntEnv = (envVar: string, defaultValue: number): number =>
  parseInt(process.env[envVar] as string, 10) || defaultValue

export const castStringArrayEnv = (envVar: string, defaultValue: string[] = []): string[] =>
  process.env[envVar]?.length
    ? (process.env[envVar] as string).split(',').map((field) => field.trim())
    : defaultValue

export const envExists = (envVar: string): boolean => process.env[envVar] !== undefined

export const returnBooleanEnvVar = (envVars: string[], defaultValue: boolean) => {
  for (const i in envVars) {
    const envVar = envVars[i]
    if (envExists(envVar)) {
      return castBooleanEnv(envVar)
    }
  }

  return defaultValue
}
