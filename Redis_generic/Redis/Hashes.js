
module.exports = (redis)=> {

    redis.hmset('user:450','firstName','jeremy','lastName','Henri');

    redis.hmset('user:450','address',450);

    redis.hincrby('user:450','address',300);

    redis.hgetall('user:450',res=>console.log("user:450 =>",res));

    redis.hdel('user:450', 'address').then(res=>console.log('delete address filed:',res))

    redis.hexists('user:450','firstName').then(data=>console.log('firstName is :',data))

    redis.hmset('user:450','address',450);

    redis.hincrbyfloat('user:450','address',0.2)

    redis.hget('user:450','address').then(res=>console.log("user:450/address =>",res));

    redis.hmget('user:450','address','firstName','lastName').then(res=>console.log("user:450/address/firstName/lastName =>",res));

    redis.hkeys('user:450').then(res=>console.log(res))

    redis.hlen('user:450').then(res=>console.log('number of hash field:',res))

    redis.hstrlen('user:450','firstName').then(res=>console.log('Length of the firstName filed:',res))

    redis.hsetnx('user:450','age','20')

    redis.hget('user:450','age').then(res=>console.log('new assigned field[age]:',res))

    redis.hvals('user:450').then(res=>console.log('show all values in hash:',res))

}