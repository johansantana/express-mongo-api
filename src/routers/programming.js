import express from 'express'
import mongoose from 'mongoose'
import programmingCourse from '../models/programmingCourse.js'

const URL = `${process.env.DB_CONNECTION_STRING}/${process.env.DB_NAME}`
mongoose.connect(URL)

export const programmingRouter = express.Router()
programmingRouter.use(express.json())

const programmingCourses = await programmingCourse.find({})

programmingRouter.get('/', (req, res) => {
  if (programmingCourses.length === 0) {
    return res.status(404).json({ mensaje: 'No hay cursos disponibles' })
  }

  res.json(programmingCourses)
})

programmingRouter.get('/:lenguaje', (req, res) => {
  const lenguaje = req.params.lenguaje
  const curso = programmingCourses.filter(curso => curso.lenguaje === lenguaje)

  if (curso.length === 0) {
    return res.status(404).json({ mensaje: 'Curso no encontrado' })
  }

  if (req.query.ordenar === 'vistas') {
    return res.json(curso.sort((a, b) => b.vistas - a.vistas))
  }

  res.json(curso)
})

programmingRouter.get('/:lenguaje/:nivel', (req, res) => {
  const lenguaje = req.params.lenguaje
  const nivel = req.params.nivel
  const curso = programmingCourses.filter(
    curso => curso.lenguaje === lenguaje && curso.nivel === nivel
  )
  if (curso.length === 0) {
    return res.status(404).json({ mensaje: 'Curso no encontrado' })
  }

  res.json(curso)
})

programmingRouter.post('/', (req, res) => {
  const { titulo, lenguaje, vistas, nivel } = req.body
  if (!titulo || !lenguaje || !vistas || !nivel) {
    return res.status(400).json({ mensaje: 'Faltan datos' })
  }

  const curso = new programmingCourse({ titulo, lenguaje, vistas, nivel })
  curso.save()

  res.status(201).json(curso)
})

programmingRouter.put('/:id', (req, res) => {
  const id = req.params.id

  const { titulo, lenguaje, vistas, nivel } = req.body
  if (!titulo || !lenguaje || !vistas || !nivel) {
    return res.status(400).json({ mensaje: 'Faltan datos' })
  }

  programmingCourse.findByIdAndUpdate(id, req.body, { new: true }).then(curso => {
    if (!curso) {
      return res.status(404).json({ mensaje: 'Curso no encontrado' })
    }
    res.json(curso)
  })
})

programmingRouter.patch('/:id', (req, res) => {
  const id = req.params.id

  const { titulo, lenguaje, vistas, nivel } = req.body
  if (!titulo && !lenguaje && !vistas && !nivel) {
    return res.status(400).json({ mensaje: 'Faltan datos' })
  }

  programmingCourse.findByIdAndUpdate(id, req.body, { new: true }).then(curso => {
    if (!curso) {
      return res.status(404).json({ mensaje: 'Curso no encontrado' })
    }
    res.json(curso)
  })
})

programmingRouter.delete('/:id', (req, res) => {
  const id = req.params.id
  programmingCourse
    .findByIdAndDelete(id)
    .then(curso => {
      if (!curso) {
        return res.status(404).json({ mensaje: 'Curso no encontrado' })
      }
      res.json({ mensaje: 'Curso eliminado' })
    })
    .catch(() => {
      res.status(404).json({ mensaje: 'Curso no encontrado' })
    })
})
