import BubbleChat from './BubbleChat'

const BubbleChatGroup = (props) => {
    const mergeArraySwitching = (arr1, arr2) => {
        var res = []
        var i = 0, j = 0
        while (true) {
            if (i >= arr1.length && j >= arr2.length) break
            if (i < arr1.length) {
                res.push(arr1[i])
                i++
            }

            if (j < arr2.length) {
                res.push(arr2[j])
                j++
            }
        }

        return res
    }

    const { partnerChat, myChat, partnerChatColor, myChatColor } = props
    const allChat = mergeArraySwitching(myChat, partnerChat)

    return (
        <div className="d-flex flex-column">
            {allChat.map((value, index) => 
                <BubbleChat text={value}
                    isRight={(index % 2 == 0)}
                    color={(index % 2 == 0) ? myChatColor : partnerChatColor} 
                    className={(index % 2 == 0) ? "align-self-end" : "align-self-start"}/>
            )}
        </div>
    )
}

export default BubbleChatGroup