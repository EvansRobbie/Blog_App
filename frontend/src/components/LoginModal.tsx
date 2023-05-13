// import React from 'react'
import React, { useState } from "react";
import { useSpring, animated, useTransition } from "react-spring";
import {useMouse, useElementSize, useClickOutside} from '@mantine/hooks'
import Login from "./Login";
import Register from "./Register";
// import Button from "./Button";
interface modalProp{
    showModal:boolean, 
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>, 
    onChange:() => void
}

const LoginModal:React.FC<modalProp> = ({showModal, setShowModal, onChange}) => {
    // console.log(showModal)
//   return (
   
const [toggle, setToggle] = useState(false);
  const [position, setPosition] =  useState({left:-1000, top:-1000})
  const [opacity, setOpacity] = useState(0)
  const {ref:circlEl, width, height} = useElementSize()
  const {ref:cardEl,  x, y} = useMouse()
  const slideAnimation = useSpring({
    transform: toggle ? "translate(-50%)" : "translate(50%)",
    config: { tension: 300, friction: 20 },
  });
  const slideBlur = useSpring({
    transform: toggle ? "translate(-10%)" : "translate(100%)",
    config: { tension: 300, friction: 20 },
  });
const mouseHover = () =>{
    setPosition({
        left: x -width /2,
        top: y- height/ 2
    })
    setOpacity(1)
}
const handleMouseLeave =  () =>{
    setOpacity(0)
}
const style= {
    top:position.top,
     left:position.left,
     opacity: opacity
}

  const handleToggle = () => {
    setToggle(!toggle);
  };
  const transition = useTransition(showModal, {
    from: { opacity: 0, scale:0 , },// transform: "translateY(-50%)"
    enter: { opacity: 1, scale:1, },//  transform: "translateY(0%)",
    leave: { opacity: 0, scale:0 , },// transform: "translateY(-50%)"
  })
  const ref = useClickOutside(() => setShowModal(false))
//   console.log(toggle)
  
  return (
    <div className="flex items-center absolute top-1/2 left-1/2 w-full z-20 -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-slate-900 bg-opacity-90 h-screen">
       
         {transition(
        (styles , item: boolean) =>
          item && (
            
              <animated.div ref={ref}  style={styles}  className="max-w-2xl relative items-center  mx-4  md:mx-auto z-0 bg-slate-100 overflow-hidden justify-around shadow-2xl shadow-slate-900 flex grow shrink-0 py-6 px-4 rounded-2xl">
                <div className= {`${toggle? 'flex': 'hidden' } md:flex flex-col gap-2 py-2 md:py-0 md:px-0 px-10 `}>
                   <Login setShowModal ={setShowModal} handleToggle={handleToggle}/>
                </div>
                <div className={`${toggle ? 'hidden': 'flex' } md:flex flex-col gap-2 py-2 md:py-0 md:px-0 px-10  `}>
                    <Register setToggle={setToggle} handleToggle={handleToggle}/>
                </div>
                <animated.div
                ref= {cardEl}
                    style={slideAnimation}
                    onMouseOver={mouseHover}
                onMouseLeave={handleMouseLeave}
                    className={` absolute bg-slate-900 group w-1/2 h-full hidden md:block  `}
                >
                    <div className=" flex flex-col items-center justify-center h-full">
                    <h2 className="text-2xl md:text-4xl font-bold text-slate-200 -pt-5">
                        Hello <span className="text-cyan-500">Friend.</span>{" "}
                    </h2>
                    <p className="text-slate-200 text-lg my-2  md:text-2xl">
                        {toggle ? "Already have an account?": "Don't have an Account ?" }
                    </p>
                    <div
                        onClick={handleToggle}
                        className="bg-slate-200 relative z-50 opacity-100  px-6 border-cyan-500 border-2 p-0.5 rounded-full shadow-cyan-600 my-4 shadow-2xl"
                    >
                        <button className="text-slate-900 font-semibold">{toggle ? "Login": "Register" }</button>
                                            </div>
                    </div>
                    <animated.div
                ref={circlEl}
                
                    style={{...slideBlur, ...style,}}
                    className={` absolute  w-48 scale-[1.5] z-10  blur-3xl  transition-opacity bg-cyan-500  rounded-full shadow-[24px 24px 47px #5a5a5a,
                        -24px -24px 47px #ffffff] h-48`}
                />
                </animated.div>
    
            </animated.div>
          )
      )}
   
    </div>
    
  )
}

export default LoginModal