module.exports = (redis)=>{
    redis.flushall();
//sets with subcategories
    redis.sadd('groceries:dairies','milk','cheese','yogurt');
    redis.sadd('groceries:seafood','salmon','calamari','lobster');
    redis.sadd('groceries:fruits','apples','grapes','pears','orange','apples','apples','apples','apples');

//print set to console
    redis.smembers('groceries:fruits')
    .then((res)=>console.log('smember:',res));

//remove an item
    redis.spop('groceries:fruits',1)
    .then(res=>console.log('spop:',res));
    redis.smembers('groceries:seafood')
    .then((res)=>console.log('smember:',res));

//copy all sub elements to another category
    redis.sunionstore("groceries:tree_fruits","groceries:fruits")
    .then(res=>console.log('sunionstore',res))

    redis.smembers("groceries:tree_fruits")
    .then((res)=>console.log('groceries:tree_fruits:',res));

    redis.scard("groceries:tree_fruits")
    .then((res)=>console.log('scard tree_fruits:',res));

// Returns the members of the set resulting from the difference between the first set and all the successive sets.
    redis.sdiff("groceries:tree_fruits","groceries:seafood")
    .then(res=>console.log('sdiff:"groceries:tree_fruits","groceries:seafood"',res));
    redis.sdiffstore('groceries','groceries:seafood','groceries:fruits')
    .then(res=>console.log('sdiffstore|groceries::',res))
    redis.smembers('groceries')
    .then((res)=>console.log('smember:',res));

    redis.sinter('groceries:fruits','groceries:tree_fruits')
    .then((res)=>console.log("sinter:'groceries:fruits','groceries:tree_fruits'",res));

    redis.sinterstore('sinter:store','groceries:fruits','groceries:tree_fruits')
    .then((res)=>console.log("sinter:store",res));

    redis.smove('groceries:dairies','sinter:store','cheese')
    .then((res)=>console.log('smove:',res));
    redis.smembers('sinter:store')
    .then((res)=>console.log('sinter:store',res));

    redis.spop("groceries:tree_fruits")
    .then((res)=>console.log('spop:groceries:tree_fruits::',res));

    redis.srandmember('groceries:fruits',3)
    .then((res)=>console.log('srand_member:fruits::',res));
    redis.srandmember('groceries:fruits',-3)
    .then((res)=>console.log('srand_member:fruits::',res));

    redis.srem('groceries','salmon')
    .then(res=>console.log('groceries:srem:salmon||',res))
    redis.smembers('groceries')
    .then(res=>console.log('groceries:',res))

    redis.sunion('sinter:store','groceries','groceries:seafood','groceries:fruits')
    .then(res=>console.log('sunion:',res))
    redis.sunionstore('FinalDestination',
        'sinter:store',
        'groceries',
        'groceries:seafood',
        'groceries:fruits'
    )
    .then(res=>console.log('final:',res))

    redis.sscan('FinalDestination',0,'COUNT',100,'MATCH','*e*')
    .then(res=>console.log('sscan:',res))

}

