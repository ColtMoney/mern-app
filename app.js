import express from 'express'
import config from 'config'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.routes.js'
import linkRoutes from './routes/link.routes.js'
import redirectRoutes from './routes/redirect.routes.js'
import path from 'path'

const __dirname = path.resolve()

const app = express()

const PORT = config.get('port') ?? 5000

app.use(express.json({ extended: true }))
app.use(authRoutes)
app.use(linkRoutes)
app.use(redirectRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.resolve(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'buid', 'index.html'))
  })
}

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()
