var protest = {
    test: function () {
        console.log('this is test')
    },
    a: 1
}
function Fun(name) {
    this.name = name
    this.sayName = function () {
        console.log('I am ' + this.name)
    }
    console.log('this is in fun')
}
Fun.prototype.walk = function () {
    console.log('I am walking')
}
var fn = new Fun('f1')
var fn2 = new Fun('f2')
console.log(fn)
console.log(fn.__proto__ === Fun.prototype)   // 对象都有__proto__属性，指向构造函数的prototype
console.log(Fun.__proto__ === Function.prototype)
console.log(Function.__proto__ === Function.prototype)  // 
console.log(Function.prototype.__proto__ === Object.prototype) //
console.log(Fun.prototype.__proto__ === Object.prototype)
console.log(Object.__proto__ === Function.prototype)
console.log(Object.prototype.__proto__ === null)
module.exports = protest