const express = require('express');
const { addListener } = require('nodemon');
const router = express.Router()
const { sequelize, User } = require('./models')

router.use(express.json());
router.use(express.urlencoded({extended:true}));


router.get('/home', (req,res) => {
    res.render('index_home');
});

router.get('/game', (req,res) => {
    res.render('index_rps');
});

router.get('/login', (req,res) => {
    res.render('index_login', {title:"Login System"})
})

/// buat crud

//create
router.get('/create', async(req,res) => {
    await res.render('create')
})

router.post('/create', async(req,res) =>{
    const {username,password} = req.body
    try{
        const user = await User.create({username,password})
        return res.redirect('/admin')
    }
    catch(err){
    console.log(err)
        return res.status(500).json(err)
    }
})

//read
router.get('/admin', (req,res) => {
    User.findAll()
     .then(articles => {
         res.render('articles/main', {
             articles
         })
     })
 })

//update
router.get('/edit/:id', async(req,res) => {
   const {id} = await req.params;
   const user = await User.findOne({
       where:{
           id:id
       },
       
       raw:true
       
   }).catch(error=> console.log(error))
     res.render('edit',{user})




    /*
    User.update({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    }, {
       where: { id: req.params.id}
    })
      .then(article =>{
          res.status(201).json(article)
      }) .catch(err => {
          res.status(422).json("Can't create article")
      })
      */
})


router.post('/update/:id', async(req,res) => {
  const {id} = req.params;
  const data = req.body;
  const selector = {where: {id:id}}
  await User.update(data,selector).catch(error=>console.log(error))

     res.redirect('/admin')

    /*
    User.update({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    }, {
       where: { id: req.params.id}
    })
      .then(article =>{
          res.status(201).json(article)
      }) .catch(err => {
          res.status(422).json("Can't create article")
      })
      */
})


//delete
router.get('/delete/:id', async(req,res) => {
    const {id} = await req.params;
    const user = await User.destroy({
        where:{
            id:id
        },
        
        raw:true
        
    }).catch(error=> console.log(error))
    
    res.redirect('/admin')
 
     /*
     User.update({
         name: req.body.name,
         email: req.body.email,
         phone: req.body.phone
     }, {
        where: { id: req.params.id}
     })
       .then(article =>{
           res.status(201).json(article)
       }) .catch(err => {
           res.status(422).json("Can't create article")
       })
       */
 })

module.exports = router