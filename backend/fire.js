var firebase = require('firebase')

const firebaseConfig = {
    apiKey: "AIzaSyAv82RTXjM_OlwhezkBI6fIRbh2VtNmOkI",
    authDomain: "chadbot-stima.firebaseapp.com",
    projectId: "chadbot-stima",
    storageBucket: "chadbot-stima.appspot.com",
    messagingSenderId: "304576991461",
    appId: "1:304576991461:web:7e1aae88ab6fa5f372840c",
    measurementId: "G-2ST32YS256"
  };

  var fire = firebase.initializeApp(firebaseConfig);
  module.exports = fire