const express = require('express');

const port =  process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(express.urlencoded());

app.use(express.static('Public'));




app.get('/form',(req,res) =>{
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/formPost',(req,res)=>{
    console.log(req.body);
});

app.listen (port, ()=> {
    console.log(`Server started at http://localhost:${port}`);
});

