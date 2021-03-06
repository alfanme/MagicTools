const inetInputOutput = document.querySelector('.input')
const run = document.querySelector('.run')
const copy = document.querySelector('.copy')
const total = document.querySelector('.total')

let count = 0

inetInputOutput.addEventListener('input', () => {
    const input = inetInputOutput.value
    const inets = input.split('\n')
    count = inets.length

    if (inets[count - 1] === '') {
        count--
    }

    if (count <= 1) {
        total.innerHTML = `${count} line`
    } else if (count > 1) {
        total.innerHTML = `${count} lines`
    }

    if (input === '') {
        count = 0
        total.innerHTML = `${count} line`
    }
})

run.addEventListener('click', () => {
    const input = inetInputOutput.value
    const rxs = input.split('\n')
    let output = ''

    rxs.forEach((rx, index) => {
        if (!rx.includes('SPEC')) {
            if (rx !== '') {
                if (index === rxs.length - 1) {
                    if (!isNaN(rx) && rx > -24 && rx <= -13) {
                        output = output + `SPEC`
                    } else {
                        output = output + `UNSPEC`
                    }
                } else {
                    if (!isNaN(rx) && rx > -24 && rx <= -13) {
                        output = output + `SPEC\n`
                    } else {
                        output = output + `UNSPEC\n`
                    }
                }
            } else {
                if (index === rxs.length - 1) {
                    if (rx !== '') {
                        output = output + `UNSPEC`
                    }
                } else {
                    output = output + `UNSPEC\n`
                }
            }
        } else {
            if (index === rxs.length - 1) {
                output = output + `${rx}`
            } else {
                output = output + `${rx}\n`
            }
        }
    })

    inetInputOutput.value = output

    if (count > 0) {
        total.classList.add('done')
        total.innerHTML = `<i class="fas fa-check"></i>&nbsp&nbspDone`
        setTimeout(() => {
            total.innerHTML = `${count} data`
            total.classList.remove('done')
        }, 2000)
    }
})

copy.addEventListener('click', () => {
    inetInputOutput.select()
    inetInputOutput.setSelectionRange(0, 99999)
    document.execCommand("copy")
    copy.innerHTML = `<i class="fas fa-copy"></i>&nbsp&nbspCopied!`
    setTimeout(() => {
        copy.innerHTML = `<i class="fas fa-copy"></i>&nbsp&nbspCopy`
    }, 1500)
})