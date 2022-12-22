
var admin = require("firebase-admin");
let fs = require("fs")
var serviceAccount = JSON.parse(fs.readFileSync("./dbfirebase/backend-b056f-firebase-adminsdk-4u3xv-d282c7f3da.json"))

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const query = db.collection("colores")

const verde =  query.add({nombre:"verde"})

const azul =  query.add({nombre:"azul"})

const colores = query.get()
colores.forEach(element => {
    element.data()
});

console.log(colores)