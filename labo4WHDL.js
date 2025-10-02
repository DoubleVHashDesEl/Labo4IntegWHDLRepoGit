/*
  Fichier : labo4WHDL.js
  Description : Serveur principal Express pour la gestion des commandes de pizzas, l'affichage, et l'historique.
  Créateur : DoubleVHashDesEl
  Date de création : 23 septembre 2025
  Dernière modification : 23 septembre 2025
*/

import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8080;



//static files
app.use(express.static('public'));
// Body parser middleware for form data (btn POST)
app.use(express.urlencoded({ extended: true }));



// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

import InfoPizza from './classInfoPizza.js';


// Home page
app.get('/', (req, res) => {
  res.render('pagePizza');
});
/*
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

  const dataFile = './Data/historique.json';
  let orders = [];
  if (fs.existsSync(dataFile)) {
    try {
      orders = JSON.parse(fs.readFileSync(dataFile));
    } catch (e) {
      orders = [];
    }
  }
  orders.push(pizzaInfo);
  fs.writeFileSync(dataFile, JSON.stringify(orders, null, 2));

  res.render('dataSubmitted', { InfoPizza: pizzaInfo });//page pour le reçu

});*/



// Data Submitted page//Code par EliottDB
app.post('/soumission-pizza', (req, res) => {
  const {
    pizzaType, pizzaQuantity, pizzaSize,
    extras = [], address, codePostal,
    nom, prenom, telephone, email, modePaiement
  } = req.body;

  const pizzaInfo = new InfoPizza();
  Object.assign(pizzaInfo, {
    pizzaType,
    pizzaQuantity,
    pizzaSize,
    extras: Array.isArray(extras) ? extras : (extras ? [extras] : []),
    address,
    codePostal,
    nom,
    prenom,
    telephone,
    email,
    modePaiement
  });

  pizzaInfo.pizzaPrixCommande();
  saveOrder(pizzaInfo);

  res.render('dataSubmitted', { InfoPizza: pizzaInfo });
});


/*
// Order History page
app.get('/historiqueDeVosCommandes', (req, res) => {

  // telephone par query string
  const phone = req.query.telephone;
  let orders = [];
  // lire le fichier JSON
  const dataFile = './Data/historique.json';
  if (fs.existsSync(dataFile)) {
    orders = JSON.parse(fs.readFileSync(dataFile));
  }
  

  let filteredOrders = orders;
  if (phone) {
    filteredOrders = orders.filter(order => order.telephone === phone);
  }

  res.render('historiqueDeVosCommandes', { orders: filteredOrders, phone });

});*/


// Order History page//Code par EliottDB
app.get('/historiqueDeVosCommandes', (req, res) => {

  // telephone par query string
  const phone = req.query.telephone;
  let orders = [];
  // lire le fichier JSON
  const dataFile = './Data/historique.json';
  if (fs.existsSync(dataFile)) {
    orders = JSON.parse(fs.readFileSync(dataFile));
  }
  

  let filteredOrders = orders;
  if (phone) {
    filteredOrders = orders.filter(order => order.telephone === phone);
  }

  res.render('historiqueDeVosCommandes', { orders: filteredOrders, phone });

});

app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const DATA_FILE = './Data/historique.json';

function loadOrders() {
  if (!fs.existsSync(DATA_FILE)) return [];
  try { return JSON.parse(fs.readFileSync(DATA_FILE)); }
  catch { return []; }
}

function saveOrder(order) {
  const orders = loadOrders();
  orders.push(order);
  fs.writeFileSync(DATA_FILE, JSON.stringify(orders, null, 2));
}