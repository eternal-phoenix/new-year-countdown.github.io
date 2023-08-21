let nav = 0 // navigation throuth the months
// define the weekdays array to determine the number of padding days 
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const calendarBtn = document.querySelector('#calendar-image>img')
const calendarContainer = document.getElementById('calendar-container')
const calendar = document.getElementById('calendar')
const calendarHeader = document.querySelector('#calendar-nav>h5')
const backBtn = document.getElementById('left-arrow')
const nextBtn = document.getElementById('right-arrow')

calendarContainer.style.display = 'none'

calendarBtn.onclick = () => {
    calendarContainer.style.display = calendarContainer.style.display === 'none'? 'block': 'none'
    nav = 0
    render()
}

// hide calendar while clicked anywhere else
document.addEventListener('click', (event) => {
    if (!calendarContainer.contains(event.target) && event.target !== calendarBtn) {
        calendarContainer.style.display = 'none'
    }
})

backBtn.onclick = () => {
    nav--
    render()
}

nextBtn.onclick = () => {
    nav++ 
    render()
}

function render() {
    const now = new Date()
    
    if (nav !== 0) {
        now.setMonth(new Date().getMonth() + nav)
    }

    const day = now.getDate()
    const month = now.getMonth()
    const year = now.getFullYear()

    const headerText = `${now.toLocaleDateString('en-us', {month: 'long'})}, ${year}`
    calendarHeader.innerHTML = headerText
    
    const firstDayOfMonth = new Date(year, month, 1).toLocaleDateString('en-us', {
        weekday: 'long', 
        year: 'numeric', 
        month: 'numeric', 
        day: 'numeric'
    })
    // get the prev. month's last day date
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const paddingDays = weekdays.indexOf(firstDayOfMonth.split(', ')[0])

    // clear inner html first
    calendar.innerHTML = ''

    // populate calendar with days
    const days = 7 * Math.ceil((daysInMonth + paddingDays) / 7) 

    for (let i = 1; i <= days; i++) {

        const dayBox = document.createElement('div')
        dayBox.classList.add('day')
        dayBox.classList.add('box')



        if (paddingDays < i && i <= daysInMonth + paddingDays) {
            dayBox.innerHTML = i - paddingDays
            if (i - paddingDays === day && nav === 0) {
                dayBox.id = 'today'
            }
            if (i % 7 === 1 || i % 7 == 0) {
                dayBox.classList.add('weekend')
            }
        } else {
            dayBox.classList.add('padding')
        }

        calendar.appendChild(dayBox)
    }

}

render()









