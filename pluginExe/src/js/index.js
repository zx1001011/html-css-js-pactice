import '../css/normal.css'
console.log('This is in index.js!')
// import { print } from './print'

// const print = require('./print')
import $ from 'jquery';

console.log($);
let a = 1
let b = [a, 1]
b.forEach((item) => {
    console.log(item)
})
console.log(a)
// print();
var time = setTimeout(() => {
    import(/* webpackChunkName: 'print' */'./print')
        .then(({ print }) => {
            console.log('加载print.js成功了')
            console.log('被使用了')
            print()
        })
        .catch(() => {
            console.log('加载print.js失败了')
        })
    clearTimeout(time)
}, 2000);