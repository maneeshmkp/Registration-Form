const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv =  require("dotenv");

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://maneeshmkp38:${password}@cluster0.hbrgfvd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
 });

// registration schema
 const registrationSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String
 });
 
 // modea of registration schema
const Registration = mongoose.model("Registration", registrationSchema);

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/pages/index.html");
});

app.post("/register",async(req, res) => {
    try{
        const {name, email, passwaord} = req.body;

        const registrationData = new Registration({
            name,
            email,
            password
        });
        // wait karne (bo await key wait karega data registration ke liye bo jabtk bo completely  run na ho jaye) ke liye hmme await use karna padega aur function asynchronous use karna padega 
        await registrationData.save();
        // jese hi data save ho jaye mongoDB mai uske bad hmm response mai page re-direct kardenge
        res.redirect("/success");
    }
    catch(error){
        console.log(error);
        res.redirect("error");
    }
});

app.get("/success", (req, res) =>{
    res.sendFile(__dirname + "/pages/success.html");
});

app.get("/error", (req, res) =>{
 res.sendFile(__dirname + "/pages/error.html");
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
