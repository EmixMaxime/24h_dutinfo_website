/* eslint-disable no-new */
require('./_header.scss')
// import { HeaderResponsive } from './headerResponsive'
import { enterMotion, leaveMotion } from '../google-motion/Motion'

const EnterMotion = enterMotion()
const LeaveMotion = leaveMotion()

const optionsHeader = {
  trigger: '#topbar-trigger',
  bodyClass: 'menu-opened', // className add to body when the header is open
  menuSelector: '#topbar-menu',
  hiddenSelector: '.site-cache' // The selector of the div for hide the website when the header is open
}

const trigger = document.querySelector(optionsHeader.trigger)
// const hidden = document.querySelector(optionsHeader.hiddenSelector)
const menu = document.querySelector(optionsHeader.menuSelector)

// const AnimationMenu = new EnterAndLeaveMouvement({container: menu})
// const AnimationTrigger = new EnterAndLeaveMouvement({container: trigger})

trigger.addEventListener('click', function (e) {
  e.preventDefault()
  e.stopPropagation()

  if (this.classList.contains('is-open')) {
    LeaveMotion.on(this)
    LeaveMotion.on(menu)
    // AnimationTrigger.leaveScreen()
    // AnimationMenu.leaveScreen()
    this.classList.remove('is-open')
  } else {
    EnterMotion.on(this)
    EnterMotion.on(menu)
    this.classList.add('is-open')
  }
})

// new HeaderResponsive(trigger, hidden, optionsHeader)

// const header = document.querySelector('#topbar')
// const headerFake = document.querySelector('#fake')
// const links = header.querySelectorAll('.topbar-li a')
//
// new HeaderAnimate(header, headerFake, links)
