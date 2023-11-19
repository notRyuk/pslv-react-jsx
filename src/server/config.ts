import { config as envConfig } from "dotenv"

envConfig()


export const DB_URL = process.env.DB_URL

if (!DB_URL) {
    console.error("DB_URL not found in env. Please add it")
}