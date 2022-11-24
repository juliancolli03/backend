const socket = io()
const pregutnar=  prompt("tunombre")

const input = document.querySelector('input')

document.querySelector('button').addEventListener('click', () => {
    socket.emit('mimensaje', input.value)
})

socket.on('mensajes', data => {
    const mensajesHTML = data
        .map(msj => {
            // if (msj.socketid == socket.id) {
            //     msj.socketid = 'yo'
            // } 
            return `SocketID: ${pregutnar} dice: ${msj.mensaje}`
    })
        .join('<br>')

    document.querySelector('p').innerHTML = mensajesHTML
})
