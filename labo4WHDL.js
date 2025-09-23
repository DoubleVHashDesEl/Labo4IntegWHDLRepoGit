import express from 'express';
import path from 'path';
import fs from 'fs';

const app = express();
const port = 8080;

//static files
app.use(express.static('public'));
// Body parser middleware for form data (btn POST)
app.use(express.urlencoded({ extended: true }));



// View engine setup
app.set('view engine', 'ejs');
app.set('views', './views');

import InfoPizza from './classInfoPizza.js';


// Home page
app.get('/', (req, res) => {
  res.render('pagePizza');
});

// Data Submitted page
app.post('/soumission-pizza', (req, res) => {

  const pizzaInfo = new InfoPizza();

  pizzaInfo.pizzaType = req.body.pizzaType;
  pizzaInfo.pizzaQuantity = req.body.pizzaQuantity;
  pizzaInfo.pizzaSize = req.body.pizzaSize;
  pizzaInfo.extras = req.body.extras || [];
  pizzaInfo.address = req.body.address;
  pizzaInfo.codePostal = req.body.codePostal;
  pizzaInfo.nom = req.body.nom;
  pizzaInfo.prenom = req.body.prenom;
  pizzaInfo.telephone = req.body.telephone;
  pizzaInfo.email = req.body.email;
  pizzaInfo.modePaiement = req.body.modePaiement;

  pizzaInfo.pizzaPrixCommande();

  //Console log pour premier commit
  console.table(pizzaInfo);



  res.render('dataSubmitted', { InfoPizza: pizzaInfo });

});

//Data transmission to dataSubmitted page
app.post('/dataSubmitted', (req, res) => {

  res.redirect('/dataSubmitted');
});


app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});