var express = require('express');
var router = express.Router();
var Redis  = require('ioredis');
var redis = new Redis();

redis.flushall();
redis.hmset('dog:1',['name','gizmo','age','5'])
redis.hmset('dog:2',['name','dexter','age','6'])
redis.hmset('dog:3',['name','fido','age','5'])

redis.set('dog:name:gizmo','dog:1');
redis.set('dog:name:dexter','dog:2');
redis.set('dog:name:fido','dog:3');

redis.lpush('dog:age:5',['dog:1','dog:3'])
redis.lpush('dog:age:6','dog:2')

router.get('/',(req,res,next)=>{
  res.render('index')
})
router.get('/dog/age/:age', function(req, res, next) {
  redis.lrange('dog:age:'+req.params.age,0,-1)
      .then((data)=>Promise.all(data.map((d)=>redis.hgetall(d))))
      .then((data)=>res.send(data));
});

router.get('/dog/name/:name', (req, res) => {
  var now = Date.now();
  redis.zadd('dog:last-lookup',now,'dog:name:'+req.params.name);
  redis.get('dog:name:'+req.params.name)
    .then((data)=>{
      console.log(data)
      redis.hmset(data,'last-lookup',now);
      return data;
    })
    .then((d)=>redis.hgetall(d))
    .then((data)=>res.send(data))
});

router.get('/dog/any',(req,res)=>{
  redis.zrevrangebyscore('dog:last-lookup','+inf','-inf')
  .then((data)=>Promise.all(data.map((d)=>redis.get(d))))
  .then((data)=>Promise.all(data.map((d)=>redis.hgetall(d))))
  .then((data)=>res.send(data))
})
router.get('/dog/last-lookup', (req, res) => {
  var now= Date.now();
  var minuteAgo = now-60000;
  redis.zrevrangebyscore(['dog:last-lookup',now,minuteAgo,'LIMIT',0,1])
  .then((data)=>(Promise.all(data.map((d)=>redis.get(d)))))
  .then((data)=>(Promise.all(data.map((d)=>redis.hgetall(d)))))
  .then((data)=>res.send(data))
});

module.exports = router;