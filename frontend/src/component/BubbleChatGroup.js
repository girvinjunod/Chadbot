import BubbleChat from './BubbleChat'

const BubbleChatGroup = (props) => {
    const { messages, partnerChatColor, myChatColor, partnerChatTextColor, myChatTextColor } = props

    return (
        <div className="d-flex flex-column">
            {messages.map((value, index) => 
                <BubbleChat key={index}
                    text={value.message}
                    isRight={(value.isMyChat)}
                    color={(value.isMyChat) ? myChatColor : partnerChatColor} 
                    textColor={(value.isMyChat) ? myChatTextColor : partnerChatTextColor} 
                    className={(value.isMyChat) ? "align-self-end" : "align-self-start"}/>
            )}
        </div>
    )
}

export default BubbleChatGroup