import mongoose from 'mongoose'

const mathCourseSchema = new mongoose.Schema({
  titulo: String,
  tema: {
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

export default mongoose.model('MathCourse', mathCourseSchema)
