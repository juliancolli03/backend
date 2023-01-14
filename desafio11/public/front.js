const socket = io()

const authorSchema = new normalizr.schema.Entity("autor",{},{idAttribute: "email"});
const messageSchema = new normalizr.schema.Entity("mensaje", {
  autor: authorSchema
});
const messagesSchema = new normalizr.schema.Entity("messages", {
  messages: [messageSchema]
});

socket.on("messages",data=>{
    const dataDesnor = normalizr.denormalize(data.result, messagesSchema, data.entities)
    const html = dataDesnor.messages.map(msj => {
        return `<div>
        <strong>${msj.autor.email}</strong>
        <strong>${msj.time}</strong>
        <em>${msj.text}</em>
        </div>`
    })
    .join(" ")

    document.getElementById("messagesDeUsers").innerHTML = html

    })

    socket.on('compres', data => {
        const html = `<strong>${"Porcentaje de compresion: " +data}</strong>`
        document.getElementById("compresion").innerHTML = html
    })
    

function addMsj() {
    
    const message = {
        autor:{
            email: document.getElementById("email").value,
        },
        text: document.getElementById("textoo").value,
        time: new Date().toLocaleString()


    }
    
    socket.emit('new-message', message)

    

      return false


        
    
}