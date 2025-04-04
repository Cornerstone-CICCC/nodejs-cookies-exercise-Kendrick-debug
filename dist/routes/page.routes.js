"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const pageRouter = (0, express_1.Router)();
const users = [
    { id: 1, username: 'admin', password: 'admin12345' },
    { id: 2, username: 'janedoe', password: '54321' }
];
// DIsplay The Home 
pageRouter.get('/', (req, res) => {
    res.status(200).render('Home');
});
//Login Get
pageRouter.get('/login', (req, res) => {
    res.status(200).render('login');
});
//Login Post
pageRouter.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        res.status(404).redirect('login');
        return;
    }
    res.cookie('isLoggedIn', true, {
        maxAge: 5 * 60 * 1000,
        httpOnly: true,
        signed: true
    });
    res.status(200).redirect('profile');
});
pageRouter.get('/profile', auth_middleware_1.checkAuth, (req, res) => {
    res.status(200).render('profile');
});
pageRouter.get('/logout', (req, res) => {
    res.clearCookie('isLoggedIn');
    res.status(301).redirect('/login');
});
exports.default = pageRouter;
