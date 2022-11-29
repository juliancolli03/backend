const socket = io()

socket.on("chat",data=>{
    const html = data.map(msj=>{
        return  `<div>
        <strong>${msj.email}</strong>
        <em>${msj.texto}</em>
        <em>${msj.time}</em>
        </div>`
    })
    .join(" ")
    document.getElementById("messagesDeUsers").innerHTML = html

    })


socket.on('messages', data => {
    const html = data.map(msj => {
        return `<div>
        <strong>${msj.username}</strong>
        <em>${msj.text}</em>
        <em>${msj.precio}</em>
        </div>`
    })
    .join(" ")

    document.getElementById("messages").innerHTML = html
})

function addProductos() {
    
    const message = {
        username: document.getElementById("username").value,
        text: document.getElementById("text").value,
        precio: document.getElementById("precio").value
    }

    socket.emit('new-message', message)

    

    return false


        
    
}


function addMsj() {
    
    const message = {
        email: document.getElementById("email").value,
        texto: document.getElementById("texto").value,
        time: new Date().toLocaleString()
    }

    socket.emit('new-msg', message)

    

    return false


        
    
}