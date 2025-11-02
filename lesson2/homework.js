// задание 1
    const sum = function(a){
        let acc = a;
        const innerSum = b => (acc += b, innerSum);
        innerSum.toString = () => acc;
        return innerSum;
    }

    const accumulator = sum(2)(5)(4)(1000)(15);
    console.log(`Сумма чисел(2,5,4,1000,15): ${accumulator}`); //1026


// задание 2
    const str = 'one.two.three.four.five';
    const array = str.split('.');
    let obj = {};

    for (let i = array.length - 1; i >= 0; i--) {
        obj = { [array[i]]: obj };
    }
    console.log({obj});