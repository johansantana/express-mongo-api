import express from 'express'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Bienvenido a la pagina principal')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
