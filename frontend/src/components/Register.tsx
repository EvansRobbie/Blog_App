import Button from "./Button"

const Register = ({handleToggle}:{handleToggle:()=> void}) => {
  return (
    <form action="">
        <div className="flex flex-col w-full gap-2">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" />
                    </div>
                    <div className="flex flex-col w-full gap-2">
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" />
                    </div>
                    <div className="flex flex-col gap-2">
                    <label htmlFor="password">Password</label>
                    <input type="text" id="password" />
                    </div>
                    <div className="flex flex-row-reverse justify-start gap-2">
                    <label htmlFor="check">Remember me</label>
                    <input type="checkbox" id="check" />
                    </div>
                    <Button text='Register' className="absolute  top-0 text-center flex items-center justify-between w-full text-slate-200 left-0 h-full rounded-full bg-slate-900"/>
                    <div className="flex md:hidden gap-2 items-center">
                        <p className="text-sm">Already have an account?</p>
                        <span onClick={handleToggle} className="text-cyan-500 hover:underline underline-offset-2">Login</span>
                    </div>
                    
    </form>
  )
}

export default Register