import * as React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import BubbleChatGroup from './component/BubbleChatGroup'
import { IoSend } from 'react-icons/io5'
import axios from 'axios'

// Script
import { kmp } from './script/kmp'
import { extractdate, extractmakul, extracttopik, extractjenis, extractnminggu, extractnhari, extracthariini, extractid } from './script/extract'
import { levenshtein, similarityscore } from './script/levenshtein'

// Styles
import "./App.css"

// Images
import avatar from './assets/johnnybravo.png';

function App() {
    // Const
    const commands = ["add", "update", "finished", "help", "show", "deadline"]

    // Ref
    const lastChat = React.useRef()

    // States
    const [chatText, setChatText] = React.useState("")
    const [messages, setMessages] = React.useState([
        {message: "Hey there, Momma! Let's have a chat for a bit :)", isMyChat: false},
        {message: "How to chat with me you might asked? Just type your chat below and send it to me. I'm used to a compliment so don't worry.", isMyChat: false}
    ])

    // Functions
    const sendChat = (text) => {
        if (text.length > 0) {
            const temp = [...messages, {message: text, isMyChat: true}]            

            let scores = []
            let commandIsCalled = false
            for (const command of commands) {
                const res = kmp(text, command)
                if (commandIsCalled) {
                    break;
                } else if (res[0] === true) {
                    let id; //extract
                    let date = extractdate(text)
                    let makul = extractmakul(text)
                    let topik = extracttopik(text)
                    let jenis = extractjenis(text)
                    commandIsCalled = true

                    switch (command) {
                        case "add":
                            if (date != null && makul != null && topik != null && jenis != null){
                                // masukin ke database
                                console.log("Masuk add")
                            }
                            else{
                                // info ga lengkap
                                temp.push({
                                    message: "Momma, you need to provide more info!",
                                    isMyChat: false
                                })
                            }
                            break;
                        case "update":
                            id = extractid(text)
                            if (id != null && date != null){
                                // ganti database
                                console.log("Masuk update")
                            }
                            else{
                                // info ga lengkap
                                temp.push({
                                    message: "Momma, you need to provide more info!",
                                    isMyChat: false
                                })
                            }
                            break;
                        case "finished":
                            id = extractid(text)
                            if (id != null){
                                // delete database
                                console.log("Masuk finished")
                            }
                            else{
                                // info ga lengkap
                                temp.push({
                                    message: "Momma, you need to provide more info!",
                                    isMyChat: false
                                })
                            }
                            break;
                        case "show":
                            // semua
                            // periode antara 2 tanggal
                            // n minggu ke depan
                            // n hari kedepan
                            // hari ini
                            if (date.length === 2){
                                console.log("Masuk show periode")
                            }
                            else{
                                let nminggu = extractnminggu(text);
                                let nhari;
                                let hariini;
                                if (nminggu != null){
                                    console.log("Masuk show n minggu")
                                    //n minggu ke depan
                                }
                                else {
                                    nhari = extractnhari(text);
                                    if (nhari != null){
                                        console.log("Masuk show n hari")
                                        //n hari kedepan
                                    }
                                    else{
                                        hariini = extracthariini(text);
                                        if (hariini != null){
                                            console.log("Masuk show hari ini")
                                        }
                                        else{
                                            let test = axios.get(`http://localhost:5000/data/print`);
                                            console.log(test)
                                        }
                                    }
                                }
                            }
                            break;
                        case "deadline":
                            if (makul != null){
                                // masukin ke database
                                console.log("Masuk dedline")
                            }
                            else{
                                // info ga lengkap
                                temp.push({
                                    message: "Momma, you need to provide more info!",
                                    isMyChat: false
                                })
                            }
                            break;
                        case "help":
                            //help
                            temp.push({
                                message: 
                                `Available features:
                                1. Add a new task to the planner (Keyword: add, Args: )
                                2. 
                                `,
                                isMyChat: false
                            })
                            break;
                        default:
                            break;
                    }
                } else {
                    let strdeket = res[1]
                    console.log(strdeket)
                    console.log(command)
                    let i = command.length
                    let j = strdeket.length
                    let ldis = levenshtein(command, strdeket, i, j)
                    let score = similarityscore(command, strdeket, ldis)
                    console.log(score)
                    if (score > 0.75){
                        scores.push({command: command, score: score})
                    }
                }
            }

            console.log(scores)
            if (scores.length === 0 && !commandIsCalled) {
                // command not found
                temp.push({
                    message: "Sorry Momma, I only understand English. But I still appreciate your compliment though!",
                    isMyChat: false
                })
            } else if (scores.length > 0) {
                // recommend the correct command
                scores.sort((a, b) => (b.score - a.score))
                temp.push({
                    message: `Momma, did you mean ${scores[0].command}?`,
                    isMyChat: false
                })
            }

            setMessages(temp)
            setChatText("")
        }
    }

    const getAllData = async () => {
        try {
            let res = await axios.get(`http://localhost:5000/data`)
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }

    React.useEffect(() => {
        getAllData()
        lastChat.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    return (
        <div className="main-container">
            <div className="side-header">
                <h1>Chadbot</h1>
                <img alt='' src={avatar} style={{width: '100%'}}/>
                <div className="side-footer">
                    <h2>The Team</h2>
                    <p>Girvin Junod - 13519096</p>
                    <p>Renaldi Arlin - 13519114</p>
                    <p>Alvin Wilta - 13519163</p>
                </div>
            </div>

            <div className="body">
                <div className="chat-container">
                    <BubbleChatGroup 
                        messages={messages} 
                        myChatTextColor={"white"}
                        partnerTextColor={"black"}
                        myChatColor={"#32353f"}
                        partnerChatColor={"#FACA00"}/>
                    <div ref={lastChat} style={{height: "32px"}}/>
                </div>
                <div className="chat-text-box">
                    <InputGroup size="lg" className="shadow">
                        <FormControl
                            value={chatText}
                            placeholder="Type here and press enter or click the right button to send!"
                            aria-describedby="basic-addon2"
                            onKeyPress={key => {if (key.charCode === 13) sendChat(chatText)}}
                            onChange={e => setChatText(e.target.value)}/>
                        <InputGroup.Append>
                            <Button variant="primary" onClick={() => sendChat(chatText)}>
                                <IoSend/>
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
            </div>
        </div>
    );
}

export default App