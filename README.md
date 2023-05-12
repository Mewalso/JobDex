vite configuration for backend
1. delete type: modules from vite.config.ts
2. add following code to vite.config.ts  
```
base: './',
server: {
    port: 4444,
    host: true,
    hmr: true,
    proxy: {
      '/users': {
        target: 'http://localhost:6666',
        changeOrigin: true,
      },
    },
  },
  ```

3. inside tsconfig.json change the following:

```
"esModuleInterop": true,
"module": "commonjs",
"include": ["src/**/*", "server/**/*"],
```

4. inside your package.json, change the dev script to:  
```
"dev": "concurrently \"vite\" \"nodemon server/server.ts\"",
```

5. inside your server, declare all types, and ensure all types are used 
-- replace 'req' with '_' if needed