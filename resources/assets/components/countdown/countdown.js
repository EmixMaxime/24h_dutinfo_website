require('./_countdown.scss')

let countdown
// const timerDisplay = document.querySelector('.display__time-left')
const timerDays = document.querySelector('#countdown-days')
const timerHours = document.querySelector('#countdown-hours')
const timerMinutes = document.querySelector('#countdown-minutes')
const timerSeconds = document.querySelector('#countdown-seconds')

function timer (seconds) {
  // clear any existing timers
  clearInterval(countdown)

  const now = Date.now()
  const then = now + seconds * 1000
  displayTimeLeft(seconds)
  // displayEndTime(then)

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000)
    // check if we should stop it!
    if (secondsLeft < 0) {
      clearInterval(countdown)
      return
    }
    // display it
    displayTimeLeft(secondsLeft)
  }, 1000)
}

function displayTimeLeft (seconds) {
  const days = Math.floor(seconds / (3600 * 24))
  const hours = Math.floor(seconds % (3600 * 24) / 3600)
  const minutes = Math.floor((seconds % (3600 * 24) % 3600) / 60)
  const remainderSeconds = Math.floor((seconds % (3600 * 24) % 3600) % 60)
  const secondesFormat = remainderSeconds

  // console.log(`Il reste ${days} jours, ${hours} heures, ${minutes} minutes, ${secondesFormat} secondes`)
  timerDays.textContent = days
  timerHours.textContent = hours
  timerMinutes.textContent = minutes
  timerSeconds.textContent = secondesFormat
  // const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}` // eslint-disable-line template-curly-spacing
  // document.title = display
  // timerDisplay.textContent = 'lol'
}

// function startTimer () {
//   const seconds = parseInt(this.dataset.time)
//   timer(seconds)
// }

timer(120 * 3600 * 24)

// buttons.forEach(button => button.addEventListener('click', startTimer))
// document.customForm.addEventListener('submit', function (e) {
//   e.preventDefault()
//   const mins = this.minutes.value
//   console.log(mins)
//   timer(mins * 60)
//   this.reset()
// })
