const BubbleChat = (props) => {
    const { text, color, className } = props

    return (
        <div className={className}
            style={{
                margin: 8,
                backgroundColor: color, 
                borderRadius: 15,
                paddingTop: 8,
                paddingBottom: 8,
                paddingLeft: 14,
                paddingRight: 14,
                whiteSpace: 'pre-wrap',
                width: 'max-content',
                maxWidth: '512px'}}>
            {text}
        </div>
    )
}

export default BubbleChat