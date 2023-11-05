const express = require('express');
const path = require('path');
var bodyParser = require('body-parser')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({
  extended : true,
}));


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/loginform.html'));
});

app.post('/user', function(req, res) {
  res.send('du har poster din form' + req.body.Username);
  console.log("du har postet din form");
});


db.serialize(() => {
  db.run('CREATE TABLE lorem (info TEXT)')
  const stmt = db.prepare('INSERT INTO lorem VALUES (?)')

  for (let i = 0; i < 10; i++) {
    stmt.run(`Ipsum ${i}`)
  }

  stmt.finalize()

  db.each('SELECT rowid AS id, info FROM lorem', (err, row) => {
    console.log(`${row.id}: ${row.info}`)
  })
})

db.close()


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})