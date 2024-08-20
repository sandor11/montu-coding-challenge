import { config } from 'dotenv';

export interface Config {
  getTomTomApiKey(): string;
}

config();

export const Config: Config = {
  getTomTomApiKey: (): string => {
    return process.env.TOMTOM_API_KEY || '';
  }
};
