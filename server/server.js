var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Customer} = require('./models/customer');

var app = express();

app.use(bodyParser.json());

//addCustomer
app.post('/customers', (req, res) => {
  var addCustomer = new Customer({
    vorname: req.body.vorname,
    nachname: req.body.nachname,
    email: req.body.email,
    worthiness: req.body.worthiness
  });

  addCustomer.save().then(() => {
    res.send(true);
  }, (e) => {
    res.status(400).send(false);
  })
});

//findAllCustomers
app.get('/customers', (req, res) => {
  Customer.find().then((customers) => {
    res.send(customers);
  }, (e) => {
    res.status(400).send(e);
  });
});

//findCustomer by nachname and vorname
app.get('/customer', (req, res) => {
  console.log(req.query);
  Customer.findOne({
    vorname: req.query.vorname,
    nachname: req.query.nachname
  }).then((customer) => {
    if (customer === null) res.status(404);
    res.send(customer);
  }, (e) => {
    res.status(400).send(e);
  });
});

//isCreditWorthy

app.post('/creditworthy', (req, res) => {
  var worthiness = req.body.worthiness;
  var credit = req.query.credit;
  if(credit > worthiness) {
    res.send(`Leider könnte der Kredit mit dem Wert ${credit} zu ${req.body.nachname} ${req.body.vorname} nicht erteilt`);
  } else {
    res.send(`Glückwunsch! der Kredit auf Höhe von ${credit} könnte zu ${req.body.nachname} ${req.body.vorname} erteilt werden`);
  }
}, (e) => {
  res.status(400).send(e);
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});