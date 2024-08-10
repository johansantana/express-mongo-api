import express from 'express'
import mongoose from 'mongoose'
import mathCourse from '../models/mathCourse.js'

const URL = `${process.env.DB_CONNECTION_STRING}/${process.env.DB_NAME}`
mongoose.connect(URL)

export const mathRouter = express.Router()
mathRouter.use(express.json())

const mathCourses = await mathCourse.find({})

mathRouter.get('/', (req, res) => {
  if (mathCourses.length === 0) {
    return res.status(404).json({ mensaje: 'No hay cursos disponibles' })
  }

  res.json(mathCourses)
})

mathRouter.get('/:tema', (req, res) => {
  const tema = req.params.tema
  const curso = mathCourses.filter(curso => curso.tema === tema)

  if (curso.length === 0) {
    return res.status(404).json({ mensaje: 'Curso no encontrado' })
  }

  if (req.query.ordenar === 'vistas') {
    return res.json(curso.sort((a, b) => b.vistas - a.vistas))
  }

  res.json(curso)
})

mathRouter.get('/:tema/:nivel', (req, res) => {
  const tema = req.params.tema
  const nivel = req.params.nivel
  const curso = mathCourses.filter(curso => curso.tema === tema && curso.nivel === nivel)
  if (curso.length === 0) {
    return res.status(404).json({ mensaje: 'Curso no encontrado' })
  }

  res.json(curso)
})

mathRouter.post('/', (req, res) => {
  const { titulo, tema, vistas, nivel } = req.body
  if (!titulo || !tema || !vistas || !nivel) {
    return res.status(400).json({ mensaje: 'Faltan datos' })
  }

  const curso = new mathCourse({ titulo, tema, vistas, nivel })
  curso.save()

  res.status(201).json(curso)
})

mathRouter.put('/:id', (req, res) => {
  const id = req.params.id

  const { titulo, tema, vistas, nivel } = req.body
  if (!titulo || !tema || !vistas || !nivel) {
    return res.status(400).json({ mensaje: 'Faltan datos' })
  }

  mathCourse.findByIdAndUpdate(id, req.body, { new: true }).then(curso => {
    if (!curso) {
      return res.status(404).json({ mensaje: 'Curso no encontrado' })
    }
    res.json(curso)
  })
})

mathRouter.patch('/:id', (req, res) => {
  const id = req.params.id

  const { titulo, tema, vistas, nivel } = req.body
  if (!titulo && !tema && !vistas && !nivel) {
    return res.status(400).json({ mensaje: 'Faltan datos' })
  }

  mathCourse.findByIdAndUpdate(id, req.body, { new: true }).then(curso => {
    if (!curso) {
      return res.status(404).json({ mensaje: 'Curso no encontrado' })
    }
    res.json(curso)
  })
})

mathRouter.delete('/:id', (req, res) => {
  const id = req.params.id
  mathCourse
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
