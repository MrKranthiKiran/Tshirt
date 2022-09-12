const express = require("express");

const app = express();

const port = 3000;

app.get('/', (req, res) => {
    return res.send('Hello World');
})

app.get('/signup', (req, res) => {
    return res.send('Please sign up');
});

app.get('/login', (req, res) => {
    return res.send('Please on login');
});

app.get('/signout', (req, res) => {
    return res.send('You are signed out');
});

app.listen(port, ()=> {
    console.log('Example app listening on port ${port}');
});

const admin = (req, res) => {
    return res.send("home dashobard");
}

const isAdmin = (reeq, res, next) => {
    console.log("isAdmin is running");
    next();
}

const isLoggedin = (req, res, next) => {
    console.log("admin is logged in");
    next();
}

app.get("/admin", isLoggedin,isAdmin, admin)

// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })