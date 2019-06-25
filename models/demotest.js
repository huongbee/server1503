exports.getName = (name)=>{
    return `My name is ${name}`;
}

exports.getData = async (a, b)=>{
    if(isNaN(a) || isNaN(b)) throw new Error('must be a number');
    if(a===b) return Promise.resolve('a equal b');
    return Promise.reject('a not equal b');
}