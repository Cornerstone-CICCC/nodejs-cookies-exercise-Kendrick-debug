import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import path from "path";
import pageRouter from './routes/page.routes'
import dotenv from 'dotenv'
dotenv.config()


//create server
const app = express()

// Middleware
app.use(cookieParser()) // use cookies
app.use(cookieParser(process.env.COOKIE_SECRET_KEY)) // The KEY is: cidh93939
app.set('view engine', 'ejs') // Set view engine to EJS
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('views', path.join(__dirname, '../src/views')) // EJS templates location


//Routes
app.use('/', pageRouter)

// 404 Fallback
app.use((req: Request, res: Response) => {
  res.status(404).render('404')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}...`)
})


