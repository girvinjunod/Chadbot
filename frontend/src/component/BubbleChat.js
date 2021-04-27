import { motion } from "framer-motion"

const BubbleChat = (props) => {
    const { text, color, className, isRight } = props
    const spring = {
        type: "spring",
        damping: 10,
        stiffness: 100
    }

    return (
        <motion.div className={className} 
            style={{
                display: 'flex', 
                flexDirection: 'row', 
                width: 'max-content',
                maxWidth: '512px',
                alignItems: 'center'}}
            transiton={spring}
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1}}>
            {!isRight && 
                <div style={{
                    width: 0,
                    height: 0,
                    borderTop: "8px solid transparent",
                    borderBottom: "8px solid transparent",
                    borderRight: `8px solid ${color}`}}/>
            }
            <div style={{
                    display: 'block',
                    backgroundColor: color, 
                    borderRadius: 12,
                    paddingTop: 8,
                    paddingBottom: 8,
                    paddingLeft: 14,
                    paddingRight: 14,
                    whiteSpace: 'pre-wrap',
                    width: 'max-content',
                    maxWidth: '512px'}}>
                {text}
            </div>
            {isRight && 
                <div style={{
                    width: 0,
                    height: 0,
                    borderTop: "8px solid transparent",
                    borderBottom: "8px solid transparent",
                    borderLeft: `8px solid ${color}`}}/>
            }
        </motion.div>
    )
}

export default BubbleChat