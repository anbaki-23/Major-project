const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser')
const connectDatabase = require('./config/connectDatabase');
dotenv.config({path: path.join(__dirname, 'config', 'config.env')});

const products = require('./routes/product');
const orders = require('./routes/order');


const login = require('./models/loginModel');

connectDatabase();

app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static('public'));

app.get('/',async(req,res)=>{

    const login = await login.find()

    
    res.render('index',{login})
})

app.post('/save', async (req,res)=>{

   const {email,password} = (req.body);

   const login = new login({email,password})

   await login.save()
   
   res.redirect('/')

})

app.use('/api/v1/',products);
app.use('/api/v1/',orders);

app.listen(process.env.PORT, () => {
    console.log(`Server listening to port ${process.env.PORT} in ${process.env.NODE_ENV}`)
});