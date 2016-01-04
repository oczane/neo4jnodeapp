var express = require('express');
var router = express.Router();
var neo4j = require('neo4j');

/* GET home page. */
router.get('/', function(req, res, next) {

	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //next();

	var db = new neo4j.GraphDatabase('http://username:password@localhost:7474');

	db.cypher({
	    //query: 'Match(d:DUBAI)-[:ARRIVING_AT]-(p:PaxInfo) Where d.ArrivalPort={APort} Return p.FirstName AS FirstName, d.BookingReloc AS BookingReloc,p.LastName AS LastName',
	    query: 'Match(d:DUBAI)-[:ARRIVING_AT]-(p:PaxInfo) Return p.FirstName AS FirstName, d.BookingReloc AS BookingReloc,p.LastName AS LastName,d.ArrivalPort as ArrivalPort',
	    //params: {APort: 'BRU',},
	}, function (err, results) {
	    if (err) throw err;
	    if (!results) {
	        console.log('No user found.');
	    } else {
	      res.status(200).json(results);
	      if (results.length == 0) console.log("Nothing found");
	    }
	});
});

module.exports = router;
