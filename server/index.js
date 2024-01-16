const express = require('express');
const mongoDB = require('./config/mongoose');
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require('cors');


app.use(cors());
app.use(express.json());


// routes
app.use('/', require('./routes'));

mongoDB.then( () =>{
    app.listen(PORT, ()=> {
        console.log(`Server listening on port: ${PORT}`)
    })
}
).catch((err) => {
    console.log("error while connecting the mongodb",err)
})