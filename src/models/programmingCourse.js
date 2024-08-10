import mongoose from 'mongoose'

const programmingCourseSchema = new mongoose.Schema({
  titulo: String,
  lenguaje: {
    type: String,
    lowercase: true,
    trim: true
  },
  vistas: Number,
  nivel: {
    type: String,
    lowercase: true,
    trim: true
  }
})

export default mongoose.model('ProgrammingCourse', programmingCourseSchema)
