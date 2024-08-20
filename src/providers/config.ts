import { config } from 'dotenv';
import { valueOrDefault } from '../helpers';

type Config = ReturnType<typeof ConfigProvider>;
function ConfigProvider() {
  config();
  return {
    tomTomApiKey: valueOrDefault(process.env.TOMTOM_API_KEY),
    tomTomCountriesAllowed: valueOrDefault(process.env.TOMTOM_COUNTRIES_ALLOWED, 'AUS,AU')
  };
}

export const Config = ConfigProvider();
