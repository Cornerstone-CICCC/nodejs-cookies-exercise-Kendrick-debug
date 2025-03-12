import { Router, Request, Response } from "express";
import { Users } from "../types/user";
import { checkAuth } from "../middleware/auth.middleware";



const pageRouter = Router()

const users: Users[] = [
    { id: 1, username: 'admin', password: 'admin12345' },
    { id: 2, username: 'janedoe', password: '54321' }
]


// DIsplay The Home 
pageRouter.get('/', (req: Request, res: Response) => {
    res.status(200).render('Home')
})


//Login Get
pageRouter.get('/login', (req: Request, res: Response) => {
    res.status(200).render('login')
})

//Login Post
pageRouter.post('/login', (req: Request, res: Response) => {
    const { username, password } = req.body
    const user = users.find(u => u.username === username && u.password === password)
    if(!user) {
        res.status(404).redirect('login')
        return
    }
    res.cookie('isLoggedIn', true, {
        maxAge: 5 * 60 * 1000,
        httpOnly: true,
        signed: true
    })
    res.status(200).redirect('profile')
})

pageRouter.get('/profile', checkAuth, (req: Request, res: Response) => {
    res.status(200).render('profile')
})

pageRouter.get('/logout', (req: Request, res: Response) => {
    res.clearCookie('isLoggedIn')
    res.status(301).redirect('/login')
})


export default pageRouter