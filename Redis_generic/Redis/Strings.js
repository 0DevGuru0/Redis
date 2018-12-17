module.exports = (redis)=>{

    redis.flushall()

    redis.set('name','sajjad','EX',5);

    redis.get('name').then(res=>console.log('name:',res));

    redis.set('address',100);

    redis.incrby('address',300)

    redis.get('address').then(res=>console.log(res));

    redis.mset('street','Awesome','city','San Francisco');

    redis.mget('street','city').then(res=>console.log(res));

    // redis.del('street').then(res=>console.log(res));
    // redis.expire('city',10).then(res=>console.log(res));

    // redis.expireat('street',new Date().getTime()+10).then(res=>console.log('expireat'));

    //remove expiration item from key
    redis.persist('street').then(res=>console.log(res));

    redis.pexpire('street',1000).then(res=>console.log('pexire'));
  
    // redis.dump('city').then(res=>{
    //     redis.restore(res).then(res=>console.log(res))
    // });

    // const redisTiming = (key,text,ExpireTime)=>{
    //     redis.set(key,text,'EX',ExpireTime)
    //     setInterval(()=>{
    //         process.stdout.clearLine();
    //         process.stdout.cursorTo(0);
    //         redis.pttl(key)
    //             .then(res=>
    //                 process.stdout.write(`${key} Expire Time Left:${(res/1000).toFixed(0)}`)
    //             );
    //     },1000);
    // }

    // redisTiming('hour','happy birthday',60*60);

    redis.randomkey().then(res=>console.log('randomkey::',res));

    redis.set('my','hello world')
    redis.rename('my','myOriginalKey')
    redis.get('myOriginalKey').then(res=>console.log('myOriginalKey:',res));

    
    redis.set('one','hello')
    redis.set('two','world')
    redis.renamenx('one','two').then(res=>console.log(res));
    redis.renamenx('one','three').then(res=>console.log(res));
    redis.mget('two','three').then(res=>console.log('two,three',res));


    // touch: Alters the last access time of a key(s). Returns the number of existing keys specified.
    redis.touch('city','three').then(res=>console.log('files touched:',res));
    redis.type('myOriginalKey').then(res=>console.log('type of the myOriginalKey:',res))
}





    // MULTI
    // RPUSH pagewviews.user:<userid> http://.....
    // RPUSH pagewviews.user:<userid> http://.....1
    // RPUSH pagewviews.user:<userid> http://.....2
    // RPUSH pagewviews.user:<userid> http://.....3
    // RPUSH pagewviews.user:<userid> http://.....4
    // RPUSH pagewviews.user:<userid> http://.....5
    // EXPIRE pagewviews.user:<userid> 60
  
    // RPUSH pagewviews.user:<userid1> http://.....
    // RPUSH pagewviews.user:<userid1> http://.....1
    // RPUSH pagewviews.user:<userid1> http://.....2
    // RPUSH pagewviews.user:<userid1> http://.....3
    // RPUSH pagewviews.user:<userid1> http://.....4
    // RPUSH pagewviews.user:<userid1> http://.....5
    // EXPIRE pagewviews.user:<userid1> 60
    // EXEC