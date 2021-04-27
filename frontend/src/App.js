import * as React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import BubbleChatGroup from './component/BubbleChatGroup'
import { kmp } from './script/kmp'

import "./App.css"

function App() {
    // Ref
    const lastChat = React.useRef()

    // States
    const [chatText, setChatText] = React.useState("")
    const [myChat, setMyChat] = React.useState([])
    const [partnerChat, setPartnerChat] = React.useState([])

    const sendChat = (text) => {
        if (text.length > 0) {
            const temp = [...myChat, text]
            const res = kmp(text, "test")

            setMyChat(temp)
            setChatText("")
            lastChat.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <div className="main-container">
            <div className="side-header">
                <h1>Chadbot</h1>
            </div>

            <div className="body">
                <div className="chat-container">
                    <BubbleChatGroup 
                        myChat={myChat} 
                        partnerChat={partnerChat} 
                        myChatColor={"green"} 
                        partnerChatColor={"grey"}/>
                    <div ref={lastChat} style={{height: "48px", scrollMargin: "16px"}}/>
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