import * as React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import BubbleChatGroup from './component/BubbleChatGroup'
import { kmp } from './script/kmp'

import "./App.css"

function App() {
    const [chatText, setChatText] = React.useState("")

    const sendChat = (text) => {
        var res = kmp(text, "test")

        console.log(res)
    }

    const myChat = [
        "Tesrtingadsg",
        "Crazier than usual"
    ]

    const partnerChat = [
        "Tesrtingadsg",
        "Crazier than usual"
    ]

    return (
        <body className="main-container">
            <div className="side-header">
                <h1>Chadbot</h1>
            </div>

            <div className="chat-container">
                <BubbleChatGroup myChat={myChat} partnerChat={partnerChat} myChatColor={"green"} partnerChatColor={"grey"}/>
                <div className="chat-text-box">
                    <InputGroup className="mb-3" size="lg">
                        <FormControl
                            placeholder="Chat something here!"
                            aria-label="Chat something here!"
                            aria-describedby="basic-addon2"
                            onChange={e => setChatText(e.target.value)}/>
                        <InputGroup.Append>
                        <Button variant="secondary" onClick={() => sendChat(chatText)}>Send</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
            </div>
        </body>
    );
}

export default App