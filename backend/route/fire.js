var firebase = require('firebase')

const firebaseConfig = {
    apiKey: "AIzaSyCdk3zlIpTrDHtxXvYFof7vt8pHUw_qVSA",
    authDomain: "testprojectalpha123.firebaseapp.com",
    databaseURL: "https://testprojectalpha123-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "testprojectalpha123",
    storageBucket: "testprojectalpha123.appspot.com",
    messagingSenderId: "1081057662498",
    appId: "1:1081057662498:web:722199b34f8d1a481c1c7b"
  };

  var fire = firebase.initializeApp(config);
  module.exports = fire