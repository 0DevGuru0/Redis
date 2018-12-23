module.exports = (redis)=>{
    redis.flushall()
    //ZADD key [NX|XX] [CH] [INCR] score member [score member ...] 
    redis.zadd('rockets',
        1996,'luna 9',
        1998,'Deep Space 1',
        1998,"Replicate",
        1957,'sputnik',
        1969,'Apollo 11',
        1977,'sputnik', // sputnik score(1957) overWrite with new score(1977)
        2008,'Falcon 1'
    );
    //redis.zrangebyscore('rockets','-inf',1999,'withscores',(err,res)=>{console.log(res)})
    redis.zrange('rockets',0,-1,'WITHSCORES')
    .then(res=>console.log('zrange res:',res));

    redis.zrevrange('rockets',0,-1,'WITHSCORES')
    .then(res=>console.log('zrevrange res:',res));

    redis.zcard("rockets")
    .then(res=>console.log('zcard|rockets::',res));

    redis.zcount('rockets','1990','(2008')
    .then(res=>console.log('zcount|rockets::',res));

    redis.zrank('rockets','Falcon 1')
    .then(res=>console.log('zrank|rockets|Falcon 1::',res));

    redis.zrevrank('rockets','Falcon 1')
    .then(res=>console.log('zrevrank|rockets|Falcon 1::',res));

    redis.zincrby('rockets',2,'Deep Space 1')
    .then(res=>console.log('zincrby|Deep Space 1::',res))
    redis.zrange('rockets',0,-1,'withscores')
    .then(res=>console.log('zrange res:',res));

    redis.zrangebyscore('rockets','-inf','1995','WITHSCORES')
    .then(res=>console.log('|||zrangeByScore|rockets::',res));

    redis.zrank('rockets','Deep Space 1')
    .then(res=>console.log('zrank|rockets|Deep Space 1::',res));
    redis.zrem('rockets','Replicate')
    .then(res=>console.log('zrem|rockets|Replicate::',res));

    redis.zremrangebyscore('rockets',2000,2009)
    .then(res=>console.log('zremrangebyscore|2000:2009|::',res))

    redis.zremrangebyrank('rockets',2,4)
    .then(res=>console.log('zremrangebyrank|2:4|::',res))
/////////////////////////////////////////////////////////////////////////////////////

    redis.zadd('zset1',
        1,'a',
        2,"b",
        3,"c",
        5,"y"
    )

    redis.zadd('zset2',
        1,'z',
        2,"y",
        3,"c",
        4,'a'
    )

    redis.zadd('zset3',
        1,'z',
        7,"y",
        3,"c",
        4,'a'
    )

    redis.zinterstore('out',2,['zset1','zset2'],'WEIGHTS',2,2)
    redis.zrange('out',0,-1,'withscores')
    .then(res=>console.log('out|zrange res:',res));

// store all collection and computed them
    redis.zunionstore('unionOut',2,['zset1','zset2'],'WEIGHTS',2,2)
    redis.zrange('unionOut',0,-1,'withscores')
    .then(res=>console.log('\\unionOut|zrange res:',res));

    redis.zinterstore('aggregate',2,['zset1','zset2'],'aggregate',"MIN")
    redis.zrange('aggregate',0,-1,'withscores')
    .then(res=>console.log('aggregate|zrange res:',res));

    redis.zunionstore('unionaggregate',2,['zset1','zset2'],'aggregate',"MIN")
    redis.zrange('unionaggregate',0,-1,'withscores')
    .then(res=>console.log('\\unionaggregate|zrange res:',res));

    redis.zinterstore('threeCollection',3,['zset1','zset2','zset3'],'WEIGHTS',1,2,1)
    redis.zrange('threeCollection',0,-1,'withscores')
    .then(res=>console.log('threeCollection|zrange res:',res));

    redis.zinterstore('UnionthreeCollection',3,['zset1','zset2','zset3'],'WEIGHTS',1,2,1)
    redis.zrange('UnionthreeCollection',0,-1,'withscores')
    .then(res=>console.log('\\UnionthreeCollection|zrange res:',res));

    redis.zinterstore('aggregate2',3,['zset1','zset2','zset3'],'aggregate',"MAX")
    redis.zrange('aggregate2',0,-1,'withscores')
    .then(res=>console.log('aggregate2|zrange res:',res));

    redis.zinterstore('Unionaggregate2',3,['zset1','zset2','zset3'],'aggregate',"MAX")
    redis.zrange('Unionaggregate2',0,-1,'withscores')
    .then(res=>console.log('\\Unionaggregate2|zrange res:',res));



/////////////////////////////////////////////////////////////////////////////////////

    redis.zadd('MyCities',
        1,'Iran',
        1,'Delhi',
        1,'Mumbai',
        1,'London',
        1,'Paris',
        1,'Tokyo',
    )
    redis.zrange('MyCities',0,-1)
    .then(res=>console.log('MyCities::',res))

    redis.zrevrangebylex('MyCities','(Tokyo','-','limit',1,3)
    .then(res=>console.log('||MyCities::',res))

    redis.zlexcount('MyCities','[London','(Tokyo')
    .then(res=>console.log('MyCities:',res))

    redis.zlexcount('MyCities','-','+')
    .then(res=>console.log('MyCities::',res))

    redis.zrangebylex('MyCities','[Iran','+','limit',1,3)
    .then(res=>console.log('MyCities|zrangebylex::',res))

    // redis.zremrangebylex('MyCities',"-",'Paris')
    // .then(res=>console.log('zremrangebylex::',res))

/////////////////////////////////////////////////////////////////////////////////////
// :::::SCAN:::::
// Starting an iteration with a cursor value of 0,
//  and calling SCAN until the returned cursor is 0 again is called a full iteration.

    redis.zadd('mytestset',
    1,'M1',
    2,'M2',
    3,'M3',
    4,'N1',
    5,'N2',
    6,'N3',
    7,'O1',
    8,'O2',
    9,'O3'
    )
    redis.zscan('mytestset',0,'COUNT',1).then(res=>console.log(res))

    for(var i=0;i<1000;i++){
        redis.zadd('keySet',i,`key:${i}`)
    }
    redis.zcard("keySet")
    .then(res=>console.log('zcard|keySet::',res));

    redis.zscan('keySet',0,'MATCH','*6[5,2,1]5*','COUNT',10000)
    .then(res=>console.log('zscan|keySet::',res));


    redis.zscore('keySet','key:500')
    .then(res=>console.log('zscore|keySet::',res));

}