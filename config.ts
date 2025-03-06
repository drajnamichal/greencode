import * as dotenv from "dotenv";
import Joi from "joi";

// Load environment variables from .env
dotenv.config();

// Define the schema for validation
const envSchema = Joi.object({
  // Environment
  E2E_TEST_BASE_URL: Joi.string().uri().required(),
  E2E_TEST_STANDARD_USER: Joi.string().required(),
  E2E_TEST_VALID_USER_PASSWORD: Joi.string().required(),

  // Playwright settings
  WORKERS: Joi.number().integer().min(1).required(),
  RETRY_FAILED: Joi.number().integer().min(0).required(),
  MAX_TEST_RUNTIME: Joi.number().integer().min(1000).required(),
  HEADLESS_BROWSER: Joi.boolean().required(),
}).unknown(true); // Allow other unknown environment variables

// Validate and extract the environment variables
const envVars = envSchema.validate(process.env, {
  allowUnknown: true,
  abortEarly: false,
});

if (envVars.error) {
  throw new Error(`Environment validation error: ${envVars.error.message}`);
}

// Config class with validated environment variables
export class Config {
  static readonly E2E_TEST_BASE_URL: string = envVars.value.BASE_URL;
  static readonly E2E_TEST_STANDARD_USER: string = envVars.value.USER_NAME;
  static readonly E2E_TEST_VALID_USER_PASSWORD: string = envVars.value.PASSWORD;

  static readonly WORKERS: number = envVars.value.WORKERS;
  static readonly RETRY_FAILED: number = envVars.value.RETRY_FAILED;
  static readonly MAX_TEST_RUNTIME: number = envVars.value.MAX_TEST_RUNTIME;
  static readonly HEADLESS_BROWSER: boolean = envVars.value.HEADLESS_BROWSER;
}