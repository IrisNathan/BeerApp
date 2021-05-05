const express = require('express');
const app = express();
const $fetch = require('node-fetch');
const bodyParser = require('body-parser');

// access to public files
app.use(express.static('public'));
//set view engine
app.set('view engine', 'ejs');
// parse application
app.use(bodyParser.urlencoded({extended: false}));
// parse json
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000
// set view engine
app.set('view engine', 'ejs');

// route
// route
app.get('/', (req, res) => {
  $fetch(`https://api.punkapi.com/v2/beers?page=1&per_page=80`)
.then(response => {
  if(!response.ok) {
    throw Error(res.statusText);
  }
  return response.json();
})
.then(data => {
  res.render('home.ejs', {data: data})
})
.catch(error => console.error("Error from network: ", error))
});

app.get('/search', (req, res) => {
  searchBeer =(beer) => {
    $fetch(`https://api.punkapi.com/v2/beers?beer_name=${beer}`)
  .then(response => {
    if(!response.ok) {
      throw Error(res.statusText);
    }
    return response.json();
  })
  .then(data => {
    if(!data.length)
    return alert('Sorry, no beer found with that input')
    res.render('home.ejs', {data: data})
  })
  .catch(error => console.error("Error from network: ", error))
}
});
 
//listeners
app.listen(PORT, () => console.log(`App listening on Port ${PORT}`));