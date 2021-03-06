const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.PORT;
const axios = require('axios');


app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('assets'));
app.use(express.static('pwa'));

app.get('/', function(req, res) {
  res.render('index', { title: 'Qui prend quoi ?' });
});

app.post('/party', function(req, res) {
  axios
  .post(`${process.env.API_URL}/party`, req.body)
  .then(({ data }) => res.redirect(`/party/${data._id}`))
  .catch((err) => res.send(err));
});


app.get('/party/:id', function(req, res) {
  axios
  .get(`${process.env.API_URL}/party/${req.params.id}`)
  .then(({ data }) =>
  res.render('party', {
    party: data,
    title: data.name,
    url: `${process.env.FRONT_URL}:${process.env.PORT}/party/${data._id}`,
    id:`${data._id}`,
    liste: data.items
  }),
  )
  .catch((err) => console.log(err));
  
});


app.post('/party/:id/items', function(req, res) {

  axios
  .post(`${process.env.API_URL}/party/${req.params.id}/items`, req.body)
  .then(() => res.redirect(`/party/${req.params.id}`))
  .catch((err) => res.send(err));

})


app.post('/party/:id/items/:idItem', function(req, res) {

  axios
  .delete(`${process.env.API_URL}/party/${req.params.id}/items/${req.params.idItem}`, req.body)
  .then(() => res.redirect(`/party/${req.params.id}`))
  .catch((err) => res.send(err));

})

app.listen(port, () => console.log(`Front app listening on port ${port}!`));

