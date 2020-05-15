const express = require('express');
const app = express();
const fetch = require('node-fetch');

let port = 3000;

app.use(express.static('public'));

app.get('/', async function (req, res) {
  let p = req.query.link;
  if(!p) return res.send('No link specified.');
  p = p.split('/')[4];
  let response = await fetch(`https://instagram.com/p/${p}/?__a=1`);
  response = await response.json();
  let photo = response.graphql.shortcode_media.display_url;
  if(!photo) return res.send('Photo not found.');
  res.redirect(photo);
});

app.get('/multiple', async function (req, res) {
  let p = req.query.link;
  if(!p) return res.send('No link specified.');
  p = p.split('/')[4];
  let response = await fetch(`https://instagram.com/p/${p}/?__a=1`);
  response = await response.json();
  let postarray = response.graphql.shortcode_media.edge_sidecar_to_children.edges;
  let photoarray = [];
  postarray.forEach(e => {
    photoarray.push(e.node.display_url);
  });
  let final = photoarray.join('<br \> <br \> <br \>');
  res.send(final);
});

let listener = app.listen(port, () => {
  console.log('Listening on port ' + listener.address().port);
});
