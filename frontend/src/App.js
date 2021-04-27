import * as React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import BubbleChatGroup from './component/BubbleChatGroup'
import { kmp } from './script/kmp'
import { extractdate, extractmakul, extracttopik } from './script/extract'

// Styles
import "./App.css"

// Images
import avatar from './assets/johnnybravo.png';

function App() {
    // Ref
    const lastChat = React.useRef()

    // States
    const [chatText, setChatText] = React.useState("")
    const [messages, setMessages] = React.useState([
        {message: "Hey there, Momma! Let's have a chat for a bit :)", isMyChat: false},
        {message: "How to chat with me you might asked? Just type your chat below and send it to me. I'm used to a compliment so don't worry.", isMyChat: false}
    ])

    const sendChat = (text) => {
        if (text.length > 0) {
            const temp = [...messages, {message: text, isMyChat: true}, {message: text, isMyChat: false}]
            const res = kmp(text, "pat")
            // if (res[0] === true) {
            //     extractdate()
            // }

            setMessages(temp)
            setChatText("")
            lastChat.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }

    React.useEffect(() => {

    }, [])

    return (
        <div className="main-container">
            <div className="side-header">
                <h1>Chadbot</h1>
                <img alt='' src={avatar} style={{width: '100%'}}/>
                <div className="side-footer">
                    <h2>The Team</h2>
                    <p>Girvin Junod - 13519</p>
                    <p>Alvin Wilta - 13519</p>
                    <p>Renaldi Arlin - 13519114</p>
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
                    <div ref={lastChat} style={{height: "64px", scrollMargin: "16px"}}/>
                </div>
                <div className="chat-text-box">
                    <InputGroup size="lg">
                        <FormControl
                            value={chatText}
                            placeholder="Chat something here!"
                            aria-describedby="basic-addon2"
                            onKeyPress={key => {if (key.charCode === 13) sendChat(chatText)}}
                            onChange={e => setChatText(e.target.value)}/>
                        <InputGroup.Append>
                            <Button variant="secondary" onClick={() => sendChat(chatText)}>Send</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
            </div>
        </div>
    );
}

export default App