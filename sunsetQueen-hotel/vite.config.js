import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
    plugins: [react()],
    server: {
        host: '0.0.0.0', // Allow access from other devices
        port: 3000, // Specify the port
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"), // Define alias for cleaner imports
        },
    },
});