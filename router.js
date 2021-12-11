const express = require('express');
const { addListener } = require('nodemon');
const router = express.Router()
/*
const { sequelize, User, History, Profile } = require('./models')
*/
const indexcont = require('./controllers/indexControllers')

router.use(express.json());
router.use(express.urlencoded({extended:true}));


router.get('/home', async (req,res) => {
    await res.render('index_home');
});

router.get('/game', async (req,res) => {
    await res.render('index_rps');
});

router.get('/login', async (req,res) => {
    await res.render('index_login', {title:"Login System"})
})

/// buat crud

//create
router.get('/create', async(req,res) => {
    await res.render('create')
})

router.post('/create', indexcont.create )

//read
router.get('/admin', indexcont.read)

//update
router.get('/edit/:id', indexcont.updateGet)


router.post('/update/:id', indexcont.updatePost)


//delete
router.get('/delete/:id', indexcont.delete)

module.exports = router