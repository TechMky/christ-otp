var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var index = 0;
var email = [
  {
    user: 'info.elective.christuniversity@gmail.com'
  },
  {
    user: 'elctive.christuniversity@gmail.com'
  },
  {
    user: 'elective.info.christuniversity@gmail.com' 
  }
];
var t1 = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email[0].user,
    pass: process.env.GOOGLE_ID_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});
var t2 = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email[1].user,
    pass: process.env.GOOGLE_ID_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});
var t3 = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email[2].user,
    pass: process.env.GOOGLE_ID_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});
var transporters = [t1, t2, t3];
/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('404: Page Not Found');
});

router.post('/', function (req, res) {
  var thank = "<h1>Thank You for registering for Magnovite | Season 7</h1><br/>";
  if(index==0){
    index++;
    let list = ""
    req.body.eventNames.map((val) => {
      list += "<li>" + val.name + "</li>" 
    })
      t1.sendMail({
      from: 'Christ University <'+ email[0].user +'>',
      to: req.body.email,
      subject: 'Registration confirmation for events.',
      html: thank + "<h2>You have been registered for following events:</h2>" + "<ul>" + list + "</ul>"
    }).then((pon) =>{
      res.json({
        status: true,
        number: index
      });
    }).catch((err) =>{
      console.log(err);
    });
  }
  else if(index==1){
    index++;
    let list = ""
    req.body.eventNames.map((val) => {
      list += "<li>" + val.name + "</li>" 
    })
    t2.sendMail({
      from: 'Christ University <'+ email[1].user +'>',
      to: req.body.email,
      subject: 'Registration confirmation for events.',
      html: thank + "<h2>You have been registered for following events:</h2>" + "<ul>" + list + "</ul>"
    }).then((pon) =>{
      res.json({
        status: true,
        number: index
      });
    }).catch((err) =>{
      console.log(err);
    });
  }
  else{
    index = 0;
    let list = ""
    req.body.eventNames.map((val) => {
      list += "<li>" + val.name + "</li>" 
    })
    t3.sendMail({
      from: 'Christ University <'+ email[2].user +'>',
      to: req.body.email,
      subject: 'Registration confirmation for events.',
      html: thank + "<h2>You have been registered for following events:</h2>" + "<ul>" + list + "</ul>"
    }).then((pon) =>{
      res.json({
        status: true,
        number: index
      });
    }).catch((err) =>{
      console.log(err);
    })
  }
  
});
module.exports = router;
