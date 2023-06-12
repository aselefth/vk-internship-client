import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
   const config = {
      plugins: [react()],
      server: {
         port: 3000,
         watch: {
            usePolling: true
         },
         host: true,
         strictPort: true
      },
      base: "/"
   };

   if (command !== "serve") {
      config.base = "/vk-internship-client/";
   }

   return config;
});
