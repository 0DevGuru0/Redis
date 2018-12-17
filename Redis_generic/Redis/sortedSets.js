module.exports = (redis)=>{
    redis.flushall()
    redis.sadd('rockets','dfsc','sdf')
    redis.zadd('rockets',
        1996,'luna 9',
        1998,'Deep Space 1',
        1957,'sputnik',
        1969,'Apollo 11',
        1977,'sputnik', // sputnik score(1957) overWrite with new score(1977)
        2008,'Falcon 1'
    );
    redis.zrangebyscore('rockets','-inf',1999,'withscores',(err,res)=>{console.log(res)})
    redis.zrange('rockets',0,-1,'withscores',(err,res)=>{console.log('zrange res:',res)})
}