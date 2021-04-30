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

// const API_URL = `http://localhost:5000`
const API_URL = `https://chadbot-backend.herokuapp.com`

function App() {
    // Const
    const commands = ["add", "update", "finished", "help", "deadline", "show" ]
    const helpMessage = 
`Glad to help!
Here are my features: 
    - Add a new task into the planner
         * Keyword: "add"
         * Required information: date of deadline, 
           topic (use "<topic>"), task type, subject code
    - Show tasks
         * Keyword: "show"
         * Can show tasks with specific time ranges
         * Use words like "from 20/04/2020 to 25/04/2020", "today",
           "n week", "n day" to specify the time range
    - Show the deadline of tasks from a subject
         * Keyword: "deadline"
         * Required information: subject code
    - Update deadline of tasks
         * Keyword: "update"
         * Required information: task ID, new date of deadline
    - Mark task as finished
         * Keyword: "finished"
         * Required information: task ID
    - Show help
         * Keyword: "help"
`

    // Ref
    const lastChat = React.useRef()

    // States
    const [chatText, setChatText] = React.useState("")
    const [messages, setMessages] = React.useState([
        {message: "Hey there, Momma! Let's have a chat for a bit :)", isMyChat: false},
        {message: "How to chat with me you asked? Just type your chat below and send it to me. I'm used to a compliment so don't worry.", isMyChat: false}
    ])

    const convertDataObject = (obj) => {
        let deadline = new Date(obj.deadline);
        return `[${obj.wid}] | ${obj.jenis} | ${obj.makul} | ${deadline} | ${obj.topik}\n`
    }

    const receiveChat = (text, messages) => {
        messages.push({message: text, isMyChat: false})
    }

    // Functions
    const sendChat = async (text) => {
        if (text.length > 0) {
            const temp = [...messages, {message: text, isMyChat: true}]
            let scores = []
            let commandIsCalled = false
            let receiveMessage = ""

            try {
                const data = await getAllData()
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
                                    try {
                                        let res = await addData(makul, date, topik, jenis)
                                        receiveMessage = "Task added successfully, babe\n"
                                        receiveMessage += convertDataObject(res)
                                    } catch (err) {
                                        receiveMessage = "Sorry Momma, I failed to add your new task!"
                                    }
                                } else{
                                    // info ga lengkap
                                    receiveMessage = "Momma, you need to provide more info or u typo!"
                                }
                                break;
                            case "update":
                                id = extractid(text)
                                if (id != null && date != null){
                                    // ganti database
                                    try{
                                        await updateData(id, date)
                                        receiveMessage = "Task updated succesfully!"
                                    } catch (err) {
                                        receiveMessage = "I failed to update your task!"
                                    }  
                                }
                                else{
                                    // info ga lengkap
                                    receiveMessage = "Momma, you need to provide more info!"
                                }
                                break;
                            case "finished":
                                id = extractid(text)
                                if (id != null){
                                    // delete database
                                    try{
                                        await deleteData(id)
                                        receiveMessage = "Task marked as finished, another one bites the dust!"
                                    } catch (err) {
                                        receiveMessage = "Sorry Momma, I failed to mark it as finished, maybe you should try again!"
                                    }                      
                                }
                                else{
                                    // info ga lengkap
                                    receiveMessage = "Momma, you need to give me the task ID!"
                                }
                                break;
                            case "show":
                                let newMessage = "These are all of your tasks: \n[ID] | Type | Subject | Deadline | Topic \n"
                                if (date != null) {
                                    if (date.length === 2){
                                        // Show periode dari tgl 1 smp tgl 2
                                        for (const element of data) {
                                            let deadline = new Date(element.deadline);

                                            if (deadline.getTime() >= date[0].getTime() && deadline.getTime() <= date[1].getTime()) 
                                                newMessage += `[${element.wid}] | ${element.jenis} | ${element.makul} | ${deadline} | ${element.topik}\n`
                                        }

                                        receiveMessage = newMessage
                                    } else {
                                        receiveMessage = "You gotta give me a proper date range!"
                                    }
                                } else {
                                    console.log('test1')
                                    let nminggu = extractnminggu(text);
                                    let nhari = extractnhari(text);
                                    let hariini = extracthariini(text);

                                    if (nminggu != null){
                                        //n minggu ke depan
                                        let today = new Date()
                                        today.setHours(0, 0, 0, 0);
                                        let nWeeksDate = new Date(Date.now() + (7 * 24 * 60 * 60 * 1000) * nminggu)

                                        nWeeksDate.setHours(0, 0, 0, 0)
                                        console.log(nWeeksDate)
                                        for (const element of data) {
                                            let deadline = new Date(element.deadline);

                                            if (deadline.getTime() >= today.getTime() && deadline.getTime() <= nWeeksDate.getTime()) 
                                                newMessage += `[${element.wid}] | ${element.jenis} | ${element.makul} | ${deadline} | ${element.topik}\n`
                                        }
    
                                        receiveMessage = newMessage  
                                    } else if (nhari != null) {
                                        //n hari kedepan
                                        let today = new Date()
                                        today.setHours(0, 0, 0, 0);
                                        let nDaysDate = new Date(Date.now() + (24 * 60 * 60 * 1000) * nhari)

                                        nDaysDate.setHours(0, 0, 0, 0);
                                        for (const element of data) {
                                            let deadline = new Date(element.deadline);
                                            deadline.setHours(0, 0, 0, 0);
                                            if (deadline.getTime() >= today.getTime() && deadline.getTime() <= nDaysDate.getTime()) 
                                                newMessage += `[${element.wid}] | ${element.jenis} | ${element.makul} | ${deadline} | ${element.topik}\n`
                                        }

                                        receiveMessage = newMessage
                                    } else if (hariini != null){
                                        // hari ini
                                        let today = new Date()
                                        today.setHours(0, 0, 0, 0);
                                        let newMessage = ''

                                        for (const element of data) {
                                            let deadline = new Date(element.deadline);
                                            deadline.setHours(0, 0, 0, 0);
                                            if (deadline.getTime() === today.getTime()) 
                                                newMessage += `[${element.wid}] | ${element.jenis} | ${element.makul} | ${deadline} | ${element.topik}\n`;
                                        }

                                        receiveMessage = newMessage
                                    } else{
                                        for (const element of data) {
                                            newMessage += `[${element.wid}] | ${element.jenis} | ${element.makul} | ${new Date(element.deadline)} | ${element.topik}\n`
                                        }

                                        console.log('test')
                                        receiveMessage = newMessage 
                                        console.log(receiveMessage)
                                    }
                                }

                                if (receiveMessage === "These are all of your tasks: \n") {
                                    receiveMessage += "You don't have any task left Momma!"
                                }
                                break;
                            case "deadline":
                                if (makul != null){
                                    let newMessage = "These are all the deadlines of your tasks: \n[ID] | Type | Subject | Deadline | Topic \n"
                                    // masukin ke database
                                    for (const element of data) {
                                        if (element.makul === makul) 
                                            newMessage += `[${element.wid}] ${element.jenis} ${element.makul} ${new Date(element.deadline)} ${element.topik}\n`
                                    }

                                    receiveMessage = newMessage
                                }
                                else{
                                    // info ga lengkap
                                    receiveMessage = "Momma, you need to give me the Subject Code!"
                                }
                                break;
                            case "help":
                                //help
                                receiveMessage = helpMessage
                                break;
                            default:
                                break;
                        }
                    } else {
                        let strdeket = res[1]
                        // console.log(strdeket)
                        // console.log(command)
                        let i = command.length
                        let j = strdeket.length
                        let ldis = levenshtein(command, strdeket, i, j)
                        let score = similarityscore(command, strdeket, ldis)
                        // console.log(score)
                        if (score > 0.75){
                            scores.push({command: command, score: score})
                        }
                    }
                }
            } catch (err) {
                receiveMessage = 'Failed to get the data, Momma'   
            }

            // console.log(scores)
            if (scores.length === 0 && !commandIsCalled) {
                // command not found
                receiveMessage = "Sorry Momma, I only understand English. But I still appreciate your compliment though!"
            } else if (scores.length > 0) {
                // recommend the correct command
                scores.sort((a, b) => (b.score - a.score))
                receiveMessage = `Momma, did you mean ${scores[0].command}?`
            }

            receiveChat(receiveMessage, temp)
            setChatText("")
            setMessages(temp)
        }
    }

    const getAllData = async () => {
        try {
            let res = await axios.get(`${API_URL}/data/fetch`)
            return res.data
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    const deleteData = async (id) => {
        try {
            const idx = toInt(id);
            let res = await axios.delete(`${API_URL}/data/delete`, {
                data: {wid: idx}
            }, { headers: {'Content-Type': 'application/json'} })

            console.log(res)
        } catch (err) {
            console.log(err.message)
            throw err
        }
    }

    const updateData = async (id, deadline) => {
        try {
            const idx = toInt(id);
            let res = await axios.put(`${API_URL}/data/update`, {
                wid: idx,
                deadline: deadline
            }, { headers: {'Content-Type': 'application/json'}, withCredentials: true })

            console.log(res)
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    const addData = async (makul, deadline, topik, jenis) => {
        try {
            let res = await axios.post(`${API_URL}/data/add`, {
                makul: makul,
                deadline: deadline,
                topik: topik,
                jenis: jenis
            })

            return res.data
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    React.useEffect(() => {
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