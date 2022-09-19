const btnContainer = document.querySelector('.btn-container'),
    btns = btnContainer.querySelectorAll('button'),
    numberBtns = document.querySelectorAll('[data-number]'),
    operationBtns = document.querySelectorAll('[data-operator]'),
    deleteBtn = document.querySelector('[data-delete]'),
    equalsBtn = document.querySelector('[data-equals]'),
    resetBtn = document.querySelector('[data-reset]'),
    previousValueSpan = document.querySelector('[data-previous]'),
    currentValueSpan = document.querySelector('[data-current]'),
    themeBtns = document.querySelectorAll('.theme-indicators button');

let operator = null
let previousValue = ''
let currentValue = ''

const addNumber = (num) => {
    if (num === '.' && currentValue.includes('.')) return

    if (num === '0' && currentValue === '') {
        currentValue = '0.'
        updateOutput()
    } else {
        currentValue += num
        updateOutput()
    }
}

const selectOperation = (operation) => {
    if (!currentValue) return

    if (previousValue) {
        calculate()
    }

    operator = operation
    previousValue = currentValue
    currentValue = ''
    updateOutput()
}

const calculate = () => {
    if (previousValue === '' || currentValue === '') return

    let result
    const prev = Number(previousValue)
    const curr = Number(currentValue)

    switch (operator) {
        case '+':
            result = prev + curr
            break
        case '-':
            result = prev - curr
            break
        case 'x':
            result = prev * curr
            break
        case '/':
            result = prev / curr
            break
        default:
            return
    }

    previousValue = ''
    currentValue = (Number(result.toFixed(8))).toString().slice(0, 9)
    operator = null
    updateOutput()
}

const updateOutput = () => {
    previousValueSpan.textContent = previousValue
    currentValueSpan.textContent = currentValue
}

const delNumber = () => {
    if (currentValue === '0.') currentValue = ''
    currentValue = currentValue.toString().slice(0, -1)
    updateOutput()
}

const reset = () => {
    previousValue = ''
    currentValue = ''
    operator = null
    updateOutput()
}

numberBtns.forEach(btn => btn.addEventListener('click', (e) => {
    addNumber(e.target.textContent)
}))

operationBtns.forEach(btn => btn.addEventListener('click', (e) => {
    selectOperation(e.target.textContent)
}))

equalsBtn.addEventListener('click', calculate)

deleteBtn.addEventListener('click', delNumber)

resetBtn.addEventListener('click', reset)


/* Button press animation */
btns.forEach(btn => btn.addEventListener('mousedown', (e) => {
    e.target.style.transition = 'all .05s ease-in-out'
    e.target.style.transform = 'translateY(4px)'
}))

btns.forEach(btn => btn.addEventListener('mouseup', (e) => {
    e.target.style.transition = ''
    e.target.style.transform = ''
}))


/* Theme toggle */
const changeTheme = (e) => {
    const { target } = e,
        { theme } = target.dataset;
    
    document.body.querySelector('.theme-indicators button.active').classList.remove('active')
    target.classList.add('active')
    document.body.setAttribute('class', theme)
    localStorage.setItem('theme', theme)
}

themeBtns.forEach(btn => btn.addEventListener('click', changeTheme));

window.addEventListener('DOMContentLoaded', () => {
    const theme = localStorage.getItem('theme')

    if (theme) {
        document.body.querySelector(`[data-theme="${theme}"]`).classList.add('active')
        document.body.setAttribute('class', localStorage.getItem('theme'))
    } else {
        document.body.setAttribute('class', 'theme-1')
        document.body.querySelector(`[data-theme="theme-1"]`).classList.add('active')
    }
})
