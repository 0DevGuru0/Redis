var express = require('express');
var router = express.Router();
var Redis = require('ioredis')
var redis = new Redis()
redis.flushall()
redis.geoadd('places',86.2520,41.6764,'South Bend');
redis.geoadd('places',85.9767,41.6820,'Elkhart');
redis.geoadd('places',87.6298,41.8781,'chicago');

router.get('/aroundsb/:miles', function(req, res, next) {
  redis.georadiusbymember('places','South Bend',parseInt(req.params.miles),'mi','WITHDIST')
      .then((data)=>res.send(data))
});
router.get('/around/:long/:lat/:miles', (req, res) => {
  redis.georadius('places',req.params.long,req.params.lat,req.params.miles,'mi','WITHDIST')
      .then((data)=>res.send(data))
});


module.exports = router;
