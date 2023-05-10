import { useState} from 'react'
import {useSpring, animated} from 'react-spring'
const Button = ({text, className}:{text:string, className?:string}) => {
    const [hover, setHover] = useState(false)
    const buttonFill = useSpring({
        width: hover ? '100%' : '0%',
        config:{duration:300}
    })

  return (
    <button
    onMouseEnter={()=> setHover(true)}
    onMouseLeave={()=> setHover(false)}
    className='registration h-8 '>
        <animated.div style={buttonFill} className={className}>
        {/* <span className={`${hover}justify-center flex w-full`}>{text}</span> */}
        {hover && (<span className={`justify-center flex w-full`}>{text}</span>) }
        </animated.div>
        <span className=''>{text}</span>
    </button>
  )
}

export default Button