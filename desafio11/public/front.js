const socket = io()

socket.on("messages",data=>{
    const html = data.map(msj=>{

        return  `<div>
        <strong>${msj.autor.email}</strong>
        <em>${msj.text}</em>
        <em>${msj.time}</em>
        </div>`
    })
    .join(" ")
    document.getElementById("messagesDeUsers").innerHTML = html

    })

function addMsj() {
    
    const message = {
        autor:{
            email: document.getElementById("email").value,
        },
        text: document.getElementById("textoo").value,
        time: new Date().toLocaleString()


    }
console.log(message)
    socket.emit('new-message', message)

    

    //  return false


        
    
}