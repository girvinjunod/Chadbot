# Tugas Besar 3 IF2211 Strategi Algoritma
> Dalam tugas besar ini, Penulis diminta untuk membangun sebuah chatbot sederhana yang berfungsi untuk membantu mengingat berbagai deadline, tanggal penting, dan task-task tertentu kepada user yang menggunakannya. Dengan memanfaatkan algoritma String Matching dan Regular Expression, Penulis dapat membangun sebuah chatbot interaktif sederhana layaknya Google Assistant yang akan menjawab segala pertanyaan Penulis terkait informasi deadline tugas-tugas yang ada.

## Table of contents
* [General info](#general-info)
* [Screenshots](#screenshots)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)

## General info
Chadbot adalah sebuah website yang bekerja melalui sistem Question and Answer dimana chadbot dapat menjawab pertanyaan atau menerima command yang diberikan oleh pengguna. Fitur-fitur dari chadbot adalah menambahkan task baru, melihat daftar task yang harus dikerjakan, menampilkan deadline dari suatu task tertentu, memperbaharui task tertentu, menandai bahwa suatu task sudah selesai dikerjakan, menampilkan opsi help yang difasilitasi oleh assistant, mendefinisikan list kata penting terkait apakah itu merupakan suatu task atau tidak, dan menampilkan pesan error jika assistant tidak dapat mengenali masukan user. Dalam kerjanya chatbot akan diberikan masukan oleh user, lalu dari masukan itu chatbot akan memilih fitur yang tepat dan melakukan fungsinya sesuai dengan masukan user. Aplikasi chatbot yang dibuat merupakan aplikasi berbasis web.

## Screenshots
![Example screenshot](./img/screenshot.png)
Layar Utama

## Technologies
* MongoDB - version 3.6.6
* Dotenv - version 8.2.0
* Express - version 4.17.1
* Mongoose - version 5.12.5
* Axios - version 0.21.1
* React - version 17.0.2
* Bootstrap - version 4.6.0

## Setup
https://chadbot-stima.herokuapp.com/ - Frontend
https://chadbot-stima-backend.herokuapp.com/ - Backend

## Deploy Locally
1. Deploy Backend
2. Deploy Frontend
3. Open https://localhost:3000/
### Deploy Backend
```
cd backend
npm install
node app.js
```
### Deploy Frontend
```
cd frontend
npm install
npm start
```

## Features
List of features ready
* Menambahkan task baru
* Melihat daftar task
* Menampilkan deadline dari suatu task tertentu
* Memperbaharui task tertentu
* Menandai bahwa suatu task sudah selesai dikerjakan
* Menampilkan opsi _help_ yang difasilitasi oleh _assistant_

## Status
Project is: _finished_

## Inspiration
*Spesifikasi Tugas Besar* Penerapan String Matching dan Regular Expression dalam
Pembangunan Deadline Reminder Assistant - [@Link](https://informatika.stei.itb.ac.id/~rinaldi.munir/Stmik/2020-2021/Tugas-Besar-3-IF2211-Strategi-Algoritma-2021.pdf)

*Referensi 1* Pencocokan String oleh Rinaldi Munir [@Link](http://informatika.stei.itb.ac.id/~rinaldi.munir/Stmik/2018-2019/String-Matching-dengan-Regex-2019.pdf)

*Referensi 2* Pencocokan String dengan Regular Expression (Regex) [@Link](http://informatika.stei.itb.ac.id/~rinaldi.munir/Stmik/2018-2019/String-Matching-dengan-Regex-2019.pdf)

## Contact
13519096 [Girvin Junod](https://github.com/girvinjunod)
13519114 [Renaldi Arlin](https://github.com/PLBU)
13519163 [Alvin Wilta](https://github.com/alvinwilta)