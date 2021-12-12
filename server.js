let express = require('express')
var bodyParser = require('body-parser');
const session = require('express-session')
const flash = require('express-flash')
let app = express()
let port = process.env.port || 9090
const { sequelize, User, Profile, History } =  require('./models')



var admin__ = {
    email: "Admin123@gmail.com",
    password: "123"
}

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(session( {
    secret: 'Buat ini jadi rahasia',
    resave: false,
    saveUninitialized:false
}))

const passport = require('./lib/passport')
app.use(passport.initialize())
app.use(passport.session())


app.use(flash())


app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static('public'))



/*
async function main() {
    await sequelize.sync({force:true})
}
main()
*/

const router = require('./router')
app.use(router)



app.post('/login',  function (req,res,next) {
    const {email, password} = req.body
    if (req.body.email == admin__.email && req.body.password == admin__.password) {
        res.redirect('/admin')
    }
    else if (req.body) {
        res.redirect('/game')
    } else {
        next();
    }
});


app.use((req,res) =>{
    res.status(404).render('404') 
});


app.listen(port, ()=>{ console.log("lostening the server")})
