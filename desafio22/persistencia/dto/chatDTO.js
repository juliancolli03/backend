class MessageDto {
    constructor({ id, fecha, text, autor }) {
      this.id = id
      this.fecha = fecha
      this.text = text
      this.autor = {
        id: autor.id,
        email: autor.email,
      }
    }
  }
  
module.exports = function formatDTO(messages) {
    if (Array.isArray(messages)) {
      return messages.map(obj => new MessageDto(obj))
    } else {
      return new MessageDto(messages)
    }
  }