import './login.scss'
import Logo from '../../imgs/instagramLogo.jpg'
import facebook from '../../imgs/facebook.png'
import AppStore from '../../imgs/appleStore.png'
import GoogleStore from '../../imgs/googlePlayStore.png'
import LoginImage1 from '../../imgs/loginImage1.jpg'
import LoginImage2 from '../../imgs/loginImage2.png'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import  { userLogin } from '../../redux/apiCalls'
import { userLogin } from '../../redux/userRedux' 
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
const Login = () => {
    const [visible, setVisible] = useState(false)
    const emailRef = useRef()
    const passwordRef = useRef()
    const dispatch = useDispatch()

    const { isFetching, error} = useSelector((state)=> state.user)

    const handleSubmit = (e)=>{
        e.preventDefault()
        const user = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        dispatch(userLogin(user))
    }

    return (
        <div className="login">
            <div className="wrapper">
                <div className="left">
                    <img src={LoginImage2} alt="" className="leftImage" />
                    <img src={LoginImage1} alt="" className="leftImage2" />
                </div>
                <div className="right">
                    <div className="rightTop">
                        <img className="formLogo" src={Logo} alt=""/>
                        <form onSubmit={handleSubmit}>
                            {visible ? 
                                <VisibilityOffOutlinedIcon className="visibleIcon" onClick={()=>setVisible(!visible)}/> :
                                <VisibilityOutlinedIcon className="visibleIcon" onClick={()=>setVisible(!visible)}/>
                            }
                            <input type="email" placeholder="email address" ref={emailRef}/>
                            <input type={visible ? "text" : "password"} placeholder="password" ref={passwordRef}/>
                            <button className="loginBtn" type="submit" disabled={isFetching}>Log In</button>
                        </form>
                        {error &&
                           <span style={{color: "red", fontSize: "14px"}}>username or password incorrect</span>
                        }
                        <div className="horizontalLine">
                            <span className="or">OR</span>
                        </div>
                        <div className="socialLogin">
                            <img src={facebook} alt="" />
                            <span>Log in with facebook</span>
                        </div>
                        <span className="forgot">Forgot password?</span>
                    </div>
                    <div className="signUpBox">
                        <span>Don't have an account? </span>
                        <Link to="/register" style={{textDecoration: "none"}}>
                            <span className="signUp">Sign up</span>
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

export default Login
