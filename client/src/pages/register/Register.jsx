import './register.scss'
import Logo from '../../imgs/instagramLogo.jpg'
import facebook from '../../imgs/facebook1.png'
import AppStore from '../../imgs/appleStore.png'
import GoogleStore from '../../imgs/googlePlayStore.png'
import { Link } from 'react-router-dom'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import { useState } from 'react'
import {axiosInstance} from '../../requestMethods'
import { useNavigate } from 'react-router-dom'
const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fullName, setFullName] = useState("")
    const [username, setUsername] = useState("")
    const [error, setError] = useState(false)

    const navigate = useNavigate()
    const User = {
        username: username,
        email: email,
        password: password,
        fullName: fullName,
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            await axiosInstance.post("/auth/register", User)
            navigate("/login")
        }catch{
            setError(true)
        }
    }

    const [visible, setVisible] = useState(false)
    return (
        <div className="register">
            <div className="wrapper">
            <div className="right">
                    <div className="rightTop">
                        <img className="formLogo" src={Logo} alt=""/>
                        <span className="topInfo">Sign up to see photos and videos from your friends</span>
                        <div className="socialLogin">
                            <img src={facebook} alt="" />
                            <span>Log in with facebook</span>
                        </div>
                        <div className="horizontalLine">
                            <span className="or">OR</span>
                        </div>
                        <form onSubmit={handleSubmit}>
                            {visible ? 
                                <VisibilityOffOutlinedIcon className="visibleIcon" onClick={()=>setVisible(!visible)}/> :
                                <VisibilityOutlinedIcon className="visibleIcon" onClick={()=>setVisible(!visible)}/>
                            }
                            <input type="text" placeholder="mobile number or email" onChange={(e)=>setEmail(e.target.value)}/>
                            <input type="text" placeholder="Full name" onChange={(e)=>setFullName(e.target.value)}/>
                            <input type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/>
                            <input type={visible ? "text" : "password"} placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
                            <button className="loginBtn" type="submit">Sign up</button>
                        </form>
                        {error && <span className="error">registration unsuccessful</span>}
                        <span className="terms">By signing up, you agree to our Terms, Data Policy and Cookie Policy </span>
                    </div>
                    <div className="signUpBox">
                        <span>Have an account? </span>
                        <Link to="/login" style={{textDecoration:"none", color: "inherit"}}>
                            <span className="signUp">Log in</span>
                        </Link>
                    </div>
                    <div className="rightBottom">
                        <span>Get the app.</span>
                        <div className="rBImages">
                            <img src={AppStore} alt="" className="appImage"/>
                            <img src={GoogleStore} alt="" className="appImage"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
