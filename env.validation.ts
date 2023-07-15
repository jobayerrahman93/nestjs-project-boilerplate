import { plainToInstance } from 'class-transformer';
import { IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsString()
  APPSETTING_EMAIL_SEND_EMAIL_ID: string;
  @IsString()
  APPSETTING_EMAIL_SEND_PASSWORD: string;
  @IsString()
  APPSETTING_JWT_SECRET_USER: string;
  @IsString()
  APPSETTING_JWT_SECRET_ADMIN: string;
}

// custom env validate function
export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
