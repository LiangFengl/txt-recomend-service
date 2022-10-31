const { APP_PORT } = require('./config/config.defult');

const app = require('./app')

app.listen(APP_PORT, () => {
  console.log(`serve is runing on http://localhost:${APP_PORT}`)
})