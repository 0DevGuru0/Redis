module.exports =(redis)=>{
    redis.flushall();

    redis.rpush('planets','venus','earth','mars','jupiter','saturn','uranus','neptune');

    redis.rpush('planets','saturn');

    // In contrary to LPUSH, no operation will be performed when key does not yet exist.
    redis.lpush('planets','mercury');
    redis.rpush('planets','testicle');
    redis.lpushx('universe','sheri').then(res=>console.log('lpushx|universe:',res));
    redis.rpushx('universe','sheri').then(res=>console.log('Rpushx|universe:',res));

    redis.ltrim('planets',0,-1);

    redis.rpop('planets');

    redis.lrange('planets',0,-1,(err,res)=>console.log("Lists",res))

    redis.sort('planets','ALPHA','LIMIT',0,3).then(res=>console.log('sort:',res))

    //Removes and returns the first element of the list stored at key
    redis.lpop('planets').then(res=>console.log('Lpop:',res));
    redis.rpop('planets').then(res=>console.log('Rpop:',res));
    redis.lindex('planets',0).then(res=>console.log('item one:',res))

    redis.linsert('planets','before','venus','sajjad')

    redis.lindex('planets',0).then(res=>console.log('item one:',res))

    redis.lrem('planets',1,'sajjad').then(res=>console.log('lrem|sajjad:',res))
    redis.lrange('planets',0,-1,(err,res)=>console.log("Lists",res))

    redis.lset('planets',2,'hadaf').then(res=>console.log('lset|hadaf|2:',res))
    redis.lrange('planets',0,-1,(err,res)=>console.log("Lists",res))

    // ltrim: Trim a list to the specified range
    redis.ltrim('planets',0, -2).then(res=>console.log('trim 1 of end|planets ',res))
    redis.lrange('planets',0,-1,(err,res)=>console.log("Lists",res))

    redis.rpop('planets').then(res=>console.log('rpop:',res))

    redis.rpoplpush('planets','planet').then(res=>console.log('rpoplpush:',res))
    redis.lrange('planet',0,-1,(err,res)=>console.log("planetList",res))
    redis.lrange('planets',0,-1,(err,res)=>console.log("planetsLists",res))
}
