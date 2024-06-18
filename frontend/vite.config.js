import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { config } from 'dotenv';

config();

function replaceAll(str) {
  while(str.includes("^^^")) {
    str = str.replace("^^^", "\n");
  }
  return str;
}


const KEY_PEM = process.env.VITE_APP_KEY_PEM;
const CERT_PEM = process.env.VITE_APP_CERT_PEM;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: replaceAll(KEY_PEM),
      cert: replaceAll(CERT_PEM)
    }
  }
})
