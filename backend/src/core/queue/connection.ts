import IORedis from "ioredis";
import { ENV } from "../../config/env";

export const redisConnection = new IORedis({
  host: ENV.REDIS_HOST,
  port: Number(ENV.REDIS_PORT),
  password: ENV.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
});
