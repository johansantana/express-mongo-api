import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import courses from './src/models/index.js'
import routers from './src/routers/index.js'

const URL = `${process.env.DB_CONNECTION_STRING}/${process.env.DB_NAME}`
mongoose.connect(URL)

const app = express()

const { programmingRouter, mathRouter } = routers

app.use('/api/cursos/programacion', programmingRouter)
app.use('/api/cursos/matematicas', mathRouter)

app.get('/', (req, res) => {
  res.send('Bienvenido a la pagina principal')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})

app.get('/api/cursos', async (req, res) => {
  const { mathCourse, programmingCourse } = courses
  const mathCourses = await mathCourse.find({})
  const programmingCourses = await programmingCourse.find({})

  res.json({ programacion: programmingCourses, matematicas: mathCourses })
})
