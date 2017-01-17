/*
import sayHello from './utils/greet'
console.log(sayHello('ES6 JavaScript!'))

import '../components/google-motion/google-motion'
const Emix = window.Emix

document.addEventListener('DOMContentLoaded', function (e) {
  const nav = document.querySelector('#navigation')
  Emix.enterMotion().on(nav)
})
*/

import '../components/form/form'

const comeTop = document.querySelectorAll('.animated-come-top')
console.log({comeTop})
const comeBottom = document.querySelectorAll('.animated-come-bottom')

window.addEventListener('load', () => { // Document ou windows ? http://stackoverflow.com/questions/588040/window-onload-vs-document-onload
  console.log('load!!!')
  comeTop.forEach(ct => ct.classList.add('showed'))
  comeBottom.forEach(ct => ct.classList.add('showed'))

})

console.log('Hello from main.js')
