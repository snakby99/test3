const express = require('express')
var cors = require('cors');
const mysql = require('mysql2');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'test3'
});


const app = express()
app.use(cors());
app.use(express.json())


app.post('/product', function (req, res,) {
    connection.query(
      'INSERT INTO `product`(`picture`,`price`) VALUES (?, ?)',
      [req.body.picture , req.body.price],
      function (err, result) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
      }
    );
  })




app.put('/product', function (req, res, next) {
    connection.query(
        'UPDATE `product` SET `picture`=?,`price`=? WHERE id = ?',
        [req.body.picture, req.body.price, req.body.id],
        function (err, result) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    }
  );
})



app.delete('/product', function (req, res, next) {
  connection.query(
    'DELETE FROM `product` WHERE id = ?',
    [req.body.id],
    function (err, result) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    }
  );
})


app.get('/product', function (req, res, next) {
    connection.query(
        'SELECT * FROM `product`', function (err, result, fields) {
        res.json(result);
    });
  });


app.listen(3333, function () {
    console.log('CORS-enabled web server listening on port 3000');
  });