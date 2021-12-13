let express = require('express')
var bodyParser = require('body-parser');
const session = require('express-session')
const flash = require('express-flash')
let app = express()
let port = process.env.port || 9090
const { sequelize, User, Profile, History } =  require('./models')
const authen = require('./controllers/authenControllers')
const restrict = require('./middleware/restrict')
const authen_token = require('./controllers/authoriController')
const restrict_token = require('./middleware/restrictoken')

var admin__ = {
    username: "Admin123@gmail.com",
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
    const {email, password, token} = req.body
    if (req.body.username == admin__.username && req.body.password == admin__.password) {
        res.redirect('/admin')
    } else {
        next();
    }
});

app.get('/login', authen.loginGet)

app.post('/login', authen.loginPost)

app.get('/login', restrict, (req,res) => res.redirect('/game'))


app.get('/api/v1/auth/login', authen_token.login  )

app.post('/api/v1/auth/login', async(req,res) => await res.redirect('/api/v1/auth/whoami') )

app.get('/api/v1/auth/whoami', restrict_token, authen_token.whoami, async(req,res) => await res.redirect('/game') )


/*
app.post('/login', async (req,res,next) => {
    const { email, password, token} = req.body
        if (req.body.email == admin__.email && req.body.password == admin__.password) {
        return res.redirect('/admin')
        }
        else(req.body){
        return next()
        }
    
    .catch(err){
        return res.status(400).json(err)
    }
})
*/

app.use((req,res) =>{
    res.status(404).render('404') 
});

app.listen(port, ()=>{ console.log("lostening the server")})
