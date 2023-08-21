const context = document.querySelector('#snowfall-canvas').getContext('2d')
const screen = {
    x: 0, 
    y: 0,
    width: window.innerWidth, 
    height: window.innerHeight, 
}

context.canvas.width = screen.width
context.canvas.height = screen.height

class Snowflake {
    constructor(radius, x, y, velocity, color) {
        this.radius = radius
        this.x = x
        this.y = y
        this.velocity = velocity
        this.color = color
    }

    draw() {
        context.beginPath()
        context.arc(this.x, this.y, this.radius, Math.PI * 0, Math.PI * 2)
        context.fillStyle = this.color
        context.fill()
    }

    fall() {
        this.x += this.velocity.x
        this.y += this.velocity.y
    }
}

let snowflakes = []

for (let i = 0; i < 500; i++) {
    let radius = Math.random() * 2 + 2 // defines falue 2-4 px radius
    let x = Math.random() * screen.width
    let y = Math.random() * screen.height
    let velocity = {
        x: Math.random() * 2 - 1,
        y: Math.random(),
    }
    let color = `rgba(255, 255, 255, ${Math.random()})`

    snowflakes.push(new Snowflake(radius, x, y, velocity, color))
}

let animationId = null

function snowfallAnimation(allowAnimation) {
    context.fillStyle = 'black'

    context.fillRect(screen.x, screen.y, screen.width, screen.height)

    for (let i = 0; i < snowflakes.length; i++) {
        const snowflake = snowflakes[i]
        snowflake.draw()
        snowflake.fall()

        if (snowflake.y - snowflake.radius >= screen.height) {
            snowflake.y = 0 - snowflake.radius
        }
        if (snowflake.x >= screen.width || snowflake.x <= 0) {
            snowflake.velocity.x *= -1
        } 
    }
    if (allowAnimation) {
        animationId = window.requestAnimationFrame(snowfallAnimation)
    } else {
        window.cancelAnimationFrame(animationId)
    }

}
snowfallAnimation()

/* SWITCH-SLIDER 
----------------*/
const switchInput = document.querySelector('#switch-input')
const switchLabel = document.querySelector('#switch-label')
const switchSlider = document.querySelector('#switch-slider')

switchInput.addEventListener('change', (event) => {
    const checked = switchInput.checked
    const red = 'rgba(128, 0, 0, 0.2)'
    const green = 'rgba(0, 128, 0, 0.2)'
    
    switchLabel.style.backgroundColor = checked? green: red
    snowfallAnimation(checked)
})














