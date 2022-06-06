import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyDghLOP7QQCuyu2K4OwLlw74RGsSfXvHKo",
  authDomain: "nodeattendweb.firebaseapp.com",
  projectId: "nodeattendweb",
  storageBucket: "nodeattendweb.appspot.com",
  messagingSenderId: "144192411303",
  appId: "1:144192411303:web:86388f88eba3d102f12d82"
})

export const auth = app.auth()
export default app
