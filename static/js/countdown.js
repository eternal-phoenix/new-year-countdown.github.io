const days = document.querySelector('#days>h2')
const hours = document.querySelector('#hours>h2')
const minutes = document.querySelector('#minutes>h2')
const seconds = document.querySelector('#seconds>h2')

const currentYear = new Date().getFullYear()
const newYearDate = new Date(`January 1 ${currentYear + 1} 00:00:00`)

function updateCountdownTime() {
    const currentDate = new Date()
    const diff = (newYearDate - currentDate) / 1000
    const sec = Math.floor(diff % 60)
    const min = Math.floor(diff / 60 % 60)
    const hr = Math.floor(diff / 60 / 60 % 24)
    const ds = Math.floor(diff / 60 / 60 / 24)
    
    days.innerHTML = ds < 10? '0' + ds: ds
    hours.innerHTML = hr < 10? '0' + hr: hr
    minutes.innerHTML = min < 10? '0' + min: min
    seconds.innerHTML = sec < 10? '0' + sec: sec
}

updateCountdownTime()
setInterval(updateCountdownTime, 1000)


