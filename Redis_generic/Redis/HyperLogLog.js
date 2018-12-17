/*
HyperLogLog ::
A HyperLogLog is a probabilistic data structure used to count unique values.

A HyperLogLog solves this problem by allowing to trade memory consumption for
    precision making it possible to estimate cardinalities larger than 10^9
    with a standard error of 2% using only 1.5 kilobytes of memory.

*/
module.exports = (redis)=>{
    // for(var i=0;i<1000000;i++){
    //     redis.pfadd('customer-count',i)
    // }
    // // redis.pfadd('customer-count','a','b','c','a','e','f','w','w').then((res)=>console.log(res))
    // console.log('End')
    console.time()
    redis.pfcount('customer-count').then((res)=>console.timeEnd())

    //  for(var i=0;i<1000000;i++){
    //     redis.sadd('customer_count',i)
    // }
    // console.log('end')
    //    console.time()
    // redis.scard('customer_count').then((res)=>console.timeEnd())

}