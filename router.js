const express = require('express')
const router = express.Router()


router.get('/', (req,res) => {
    res.render('index_home');
});

router.get('/game', (req,res) => {
    res.render('index_rps');
});

router.get('/login', (req,res) => {
    res.render('base', {title:"Login System"})
})

module.exports = router