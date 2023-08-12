//import express module
//aamelna npm i express
//express framework BE JS
const express = require('express');

//creates express application
const app = express();


//import body-parser module
//aamelna npm i body-parser

const bodyParser = require('body-parser');
//import mongoose module
//aamelna npm i mongoose

const mongoose = require('mongoose');

//import bcrypt module
const bcrypt = require('bcrypt');

//import axios module
const axios = require('axios');

//import multer module
const multer = require('multer');
//import path module
const path = require('path');

// mongodb://127.0.0.1:27017=@ de base du serveur mongoDB(Port 27017)
// marsDB=>DB name
mongoose.connect('mongodb://127.0.0.1:27017/marsDB');



// app configuration
//send json response
app.use(bodyParser.json());
//get object from request
app.use(bodyParser.urlencoded({ extended: true }));

// Security configuration

app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader(

        'Access-Control-Allow-Headers',

        'Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn'

    );

    res.setHeader(

        'Access-Control-Allow-Methods',

        'GET, POST, DELETE, OPTIONS, PATCH, PUT'

    );

    next();

});

//configuration des fichiers

// ShortCut :remplace backend/images avec myFiles
app.use("/myFiles", express.static(path.join("backend/images")));

// Media Types
const MIME_TYPE = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
};
const storageConfig = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        cb(null, "backend/images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(" ").join("-");
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + "-" + Date.now() + "-crococoder-" + "." + extension;
        cb(null, imgName);
    },
});

//Models Importation

const Match = require('./models/match');
const Player = require('./models/player');
const Team = require('./models/team');
const User = require('./models/user');





function generateId(T) {
    var max;
    if (T.length == 0) {
        max = 0;
    }
    else {
        max = T[0].id;
        for (var i = 1; i < T.length; i++) {
            if (T[i].id > max) {
                max = T[i].id;

            }

        }
    }
    return max
}
/////matches
//DB Simulation
let matchesTab = [{ id: 1, teamOne: 'RMD', teamTwo: 'FCB', scoreOne: 1, scoreTwo: 0 },
{ id: 2, teamOne: 'CSS', teamTwo: 'EST', scoreOne: 1, scoreTwo: 0 }
];

//Business logic Add match   , !!!! tanseech l  '/' !!!!
app.post('/api/matches', (req, res) => {
    console.log('here into BL:Add Match ');
    let matchObj = new Match(req.body);
    matchObj.save();
    res.json({ msg: 'Added with success' });
    //Match majusculte car l'importation const Match=
});



//Business logic Get All matches , 
app.get('/api/matches', (req, res) => {
    console.log('here into BL:Get all matches');
    Match.find().then((docs) => {
        res.json({ matchesTab: docs });
    });
});


//Business logic Get match by id (:id=> is a param changeable )
app.get('/api/matches/:id', (req, res) => {
    console.log('here into BL:Get Match By ID');
    //recupere l'identifiant mel path
    let id = req.params.id;
    Match.findOne({ _id: id }).then((doc) => {
        res.json({ findedMatch: doc });
    });

});



//Business logic Delete match by id (:id=> is a param changeable )
app.delete('/api/matches/:id', (req, res) => {
    console.log('here into BL:delete Match By ID');
    let id = req.params.id;
    Match.deleteOne({ _id: id }).then((response) => {
        console.log('Here response after delete', response);
        if (response.deletedCount == 1) {
            res.json({ message: 'Deleted with success' });
        } else {
            res.json({ message: 'Error' });
        }
    });
    // for (let i = 0; i < matchesTab.length; i++) {
    //     if (matchesTab[i].id == id) {
    //         matchesTab.splice(i, 1);
    //         break;

    //     }
    // }
    // res.json({ message: 'Deleted with success' });
});


//Business logic Edit match 
app.put('/api/matches', (req, res) => {
    console.log('here into BL:Edit Match ');
    let newMatch = req.body;
    Match.updateOne({ _id: newMatch._id }, newMatch).then((response) => {
        console.log('here response after update', response);
        if (response.nModified == 1) {
            res.json({ message: 'Updated with success' });
        } else {
            res.json({ message: 'Error' });

        }
    });
    //with no mongoDB:
    // for (let i = 0; i < matchesTab.length; i++) {
    //     if (matchesTab[i].id == match.id) {
    //         matchesTab[i] = match;
    //         res.json({ message: "Edited with success" });

    //         break;
    //     }
    // }
});



//Business logic Search Matches  
// search with get (1ere methode)
app.get('/api/matches/:sc1/:sc2', (req, res) => {
    console.log('here into BL:search Matches');
    let x = req.params.sc1;
    let y = req.params.sc2;

    Match.find({ scoreOne: x, scoreTwo: y }).then((docs) => {
        console.log('Here finded matches', docs);
        res.json({ findedMatches: docs });
    });

    //with no mongoDB:
    // let findedMatches = matchesTab.filter(
    //     (obj) => { return obj.scoreOne == match.scoreOne || obj.scoreTwo == match.scoreTwo }
    // );
    // res.json({ findedMatches: findedMatches });

});
//search with post (2ème methode)
app.post('/api/matches', (req, res) => {
    console.log('here into BL:search Matches');
    let match = req.body;
    Match.find({ scoreOne: match.scoreOne, scoreTwo: match.scoreTwo }).then((docs) => {
        console.log('Here finded matches', docs);
        res.json({ findedMatches: docs });
    });

});

//////Teams

//DB Simulation
let teamsTab = [{ id: 1, name: 'RM', owner: 'Florantino', foundation: '1907', stadium: 'santiago' },
{ id: 2, name: 'FCB', owner: 'Laporta', foundation: '1908', stadium: 'campnio' },
{ id: 3, name: 'CSS', owner: 'Khemakhem', foundation: '1930', stadium: 'Taib Mhiri' }
];

//Business logic Add team by id (:id=> is a param changeable )
app.post('/api/teams', (req, res) => {
    console.log('here into BL:Add team ');
    let matchObj = new Team(req.body);
    matchObj.save();
    res.json({ msg: 'Added with success' });

});

//Business logic Get All matches , 
app.get('/api/teams', (req, res) => {
    console.log('here into BL:Get all teams');
    Team.find().then(
        (docs) => {
            res.json({ teamsTab: docs })
        });
});

//Business logic Get match by id 
app.get('/api/teams/:id', (req, res) => {
    console.log('here into BL:Get team By ID');
    //recupere l'identifiant mel path
    let id = req.params.id;
    Team.findOne({ _id: id }).then((doc) => {
        res.json({ findedTeam: doc });
    });
});


//Business logic Delete match by id 
app.delete('/api/teams/:id', (req, res) => {
    console.log('here into BL:delete team By ID');
    let id = req.params.id;
    Team.deleteOne({ _id: id }).then((response) => {
        console.log('Here response after delete', response);
        if (response.deletedCount == 1) {
            res.json({ message: 'Deleted with success' });
        } else {
            res.json({ message: 'Error' });
        }
    });

});


//Business logic Edit team by id
app.put('/api/teams', (req, res) => {
    console.log('here into BL:Edit team ');
    let newTeam = req.body;
    Team.updateOne({ _id: newTeam._id }, newTeam).then((response) => {
        console.log('here response after update', response);
        if (response.nModified == 1) {
            res.json({ message: 'Updated with success' });
        } else {
            res.json({ message: 'Error' });

        }
    });
});


//////Players

//DB Simulation
let playersTab = [{ id: 1, name: 'Ibrahimovic', age: '30', number: 7, position: 'attaquant' },
{ id: 2, name: 'kovic', age: '30', number: 3, position: 'attaquant' },
{ id: 3, name: 'msekni', age: '33', number: 9, position: 'attaquant' }]

//Business logic Add player by id
app.post('/api/players', (req, res) => {
    console.log('here into BL:Add player ');
    let matchObj = new Player(req.body);
    matchObj.save();
    res.json({ msg: 'Added with success' });

});

//Business logic Get All playeres , 
app.get('/api/players', (req, res) => {
    console.log('here into BL:Get all players');
    Player.find().then(
        (docs) => {
            res.json({ playersTab: docs })
        });
});


//Business logic Get player by id 
app.get('/api/players/:id', (req, res) => {
    console.log('here into BL:Get player By ID');
    //get id from path
    let id = req.params.id;
    Player.findOne({ _id: id }).then((doc) => {
        res.json({ findedPlayer: doc });
    });

});

//Business logic Delete player by id 
app.delete('/api/players/:id', (req, res) => {
    console.log('here into BL:delete player By ID');
    let id = req.params.id;
    Player.deleteOne({ _id: id }).then((response) => {
        console.log('Here response after delete', response);
        if (response.deletedCount == 1) {
            res.json({ message: 'Deleted with success' });
        } else {
            res.json({ message: 'Error' });
        }
    });

});



//Business logic Edit player by id 
app.put('/api/players', (req, res) => {
    console.log('here into BL:Edit player ');
    let newPlayer = req.body;
    Player.updateOne({ _id: newPlayer._id }, newPlayer).then((response) => {
        console.log('here response after update', response);
        if (response.nModified == 1) {
            res.json({ message: 'Updated with success' });
        } else {
            res.json({ message: 'Error' });

        }
    });
});


//Business Logic:Signup

app.post('/users/signup', multer({ storage: storageConfig }).single('img'),
    (req, res) => {
        console.log('here into BL signup', req.body);
        bcrypt.hash(req.body.pwd, 8).then((cryptedPwd) => {
            req.body.pwd = cryptedPwd;
            req.body.avatar = "http://localhost:3000/myFiles/" + req.file.filename;
            console.log('here crypted pwd', cryptedPwd);
            let user = new User(req.body);
            user.save((err, doc) => {
                if (err) {
                    res.json({ msg: 'Error with signup' });

                } else {
                    res.json({ msg: 'Added with success' });

                }
            });
        });
    });

//basic signup:
  // let user=new User(req.body);
    // user.save();
    // res.json({msg:'Added with success'});

//Business Logic:Login
// 0=> Email Error
// 1=> pwd Error
// 2 => welcome
app.post('/users/login', (req, res) => {
    console.log('here into BL login', req.body);
    let user;
    User.findOne({ email: req.body.email }).then((doc) => {
        console.log('here response after login', doc);
        user = doc;
        if (!doc) {
            res.json({ msg: '0' });
        } else {
            return bcrypt.compare(req.body.pwd, doc.pwd);
        }
    })
        //pas de ; ici 
        .then(
            (checkPwd) => {
                console.log('here check pwd', checkPwd);
                if (!checkPwd) {
                    res.json({ msg: '1' });

                } else {
                    let userToSend = {
                        id: user._id,
                        fName: user.firstName,
                        lName: user.lastName,
                        role: user.role
                    };
                    res.json({ msg: '2', connectedUser: userToSend });
                }
            });




    //basic login (with no bcrypt ) 
    // User.findOne({ email: req.body.email, pwd: req.body.pwd }).then((doc) => {
    //     //pwd 1: of collection
    //     //pwd 2: of form
    //     console.log('here response after login', doc);
    //     if (doc) {
    //         res.json({ msg: 'Welcome' });
    //     } else {
    //         res.json({ msg: 'Please check Email/Pwd' });

    //     }
    // });



  
});


app.post('/api/weather/searchCity', (req, res) => {
    console.log('here into BL:search City');
    let city = req.body.city;
    let key = "62ee756a34835483299877a61961cafb";
    console.log('here city:', city);
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
    axios.get(apiURL).then((response) => {
        console.log('here response from weather Api', response);
        let data = response.data;
        let result = {
            temp: response.data.main.temp,
            pressure: response.data.main.pressure,
            icon: data.weather[0].icon,
        };
        res.json({ weather: result });

    });
});




//make app exportable
module.exports = app;


