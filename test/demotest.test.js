const { getName, getData } = require('../models/demotest');

test('object assignment', () => {
    const data = {one: 1};
    data['two'] = 2;
    expect(data).toEqual({one: 1, two: 2});
});

test('null', () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
});
test('undefined', () => {
    const n = undefined;
    expect(n).not.toBeNull();
    expect(n).not.toBeDefined();
    expect(n).toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
});

test('two plus two', () => {
    const value = 2 + 2;
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(3.5);
    expect(value).toBeLessThan(5);
    expect(value).toBeLessThanOrEqual(4.5);
  
    // toBe and toEqual are equivalent for numbers
    expect(value).toBe(4);
    expect(value).toEqual(4);
  });


test('Output hello',()=>{
    const hello = getName('Ti');
    expect(hello).toBe('My name is Ti');

    const hello2 = getName('Teo');
    expect(hello2).toBe('My name is Teo');
})
test('Output hello2',()=>{
    const hello2 = getName('Teo');
    expect(hello2).toBe('My name is Teo');
})
test('Check with Promise',()=>{
    getData(1,2)
    .then(data=>{
        expect(data).toBe('a equal b')
    })
    .catch(err=>{
        expect(err).toBe('a not equal b')
    })
})

test('Check with async', async ()=>{
    const compare = await getData(1,1)
    expect(compare).toBe('a equal b')
    expect(compare).not.toBe('a not equal b')
    
    await expect(getData(1,1)).resolves.toBe('a equal b')
    await expect(getData(1,2)).rejects.toBe('a not equal b')
    
    await expect(getData(1,'x')).rejects.toThrow()

    try{
        await getData(1,'x')
    } 
    catch (e) {
        message = e.message
    }
    expect(message).toBe('must be a number')

})

test("Test description", () => {
    const t = () => {
      throw new TypeError();
    };
    expect(t).toThrow(TypeError);
});