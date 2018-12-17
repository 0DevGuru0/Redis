module.exports =(redis)=> {
  redis.flushall()
  
  redis.geoadd('places',86.2520,41.6764,'South Bend');
  redis.geoadd('places',85.9767,41.6820,'Elkhart');
  redis.geoadd('places',87.6298,41.8781,'chicago');

  redis.georadiusbymember('places','South Bend',parseInt(200),'mi','WITHDIST','WITHCOORD','ASC')
  .then((data)=>console.log('georadiusbymember',data))

  redis.georadius('places',85,41,200,'mi','WITHDIST')
  .then((data)=>console.log('georadius',data))

  redis.geopos('places','South Bend','Elkhart','chicago').then((data)=>console.log(`geoPosition:[
  southBend: ${data[0]},
  Elkhart  : ${data[1]},
  chicago  : ${data[2]}
]`))

  redis.geodist('places','South Bend','Elkhart').then((data)=>console.log('distance between south bend and elkhart::',data))

}
