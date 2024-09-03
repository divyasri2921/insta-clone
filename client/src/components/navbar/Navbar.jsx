import './navbar.scss'
import Logo from '../../imgs/instagramLogo.jpg'
import Messanger from '../../imgs/messanger.png'
import Avatar from '../../imgs/avatar.jpg'
import SearchIcon from '@mui/icons-material/Search'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined'
import HomeIcon from '@mui/icons-material/Home'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'
import PostPage from '../postPage/PostPage'
import { useSelector, useDispatch } from 'react-redux'
import { userLogout } from '../../redux/apiCalls'
import { Link } from 'react-router-dom'
const Navbar = ({ active, setActive,  postActive, setPostActive }) => {
    const user = useSelector((state)=>state.user.user)
    const dispatch = useDispatch()

    const handleClick = ()=>{
        userLogout(dispatch)
    }
    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="left">
                    <img src={Logo} alt="" className="logo" />
                </div>
                <div className="center">
                    <SearchIcon className="searchIcon"/>
                    <input type="text" placeholder="Search" className="searchInput"/>
                </div>
                <div className="right">
                    <div className="icons">
                        <Link to="/" style={{color: "inherit"}}>
                            <div className="icon">
                                <HomeIcon/>
                            </div>
                        </Link>
                        <div className="icon">
                            <img src={Messanger} alt="" className="mImg"/>
                            <div className="message">2</div>
                        </div>
                        <div className="icon" onClick={()=>setPostActive(true)}>
                            <AddBoxOutlinedIcon/>
                        </div>
                        <div className="icon">
                            <ExploreOutlinedIcon/>
                        </div>
                        <div className="icon">
                            <FavoriteBorderOutlinedIcon/>
                        </div>
                    </div>
                    <div className="navProfile" onClick={()=>setActive(!active)}>
                        <img src={user.profilePic || Avatar} alt="" className="profilePic" />
                    </div>
                </div>
            </div>
            <div className={ active ? "profileInfoCard active": "profileInfoCard"}>
                <div className="profileInfoCardWrapper">
                    <Link to={`/${user.username}`} style={{textDecoration: "none", color: "inherit"}}>
                        <div className="profileInfoCardItem">
                            <AccountCircleOutlinedIcon  className="cardIcon"/>
                            <span>Profile</span>
                        </div>
                    </Link>
                    <div className="profileInfoCardItem">
                        <BookmarkBorderOutlinedIcon className="cardIcon"/>
                        <span>Saved</span>
                    </div>
                    <div className="profileInfoCardItem">
                        <SettingsOutlinedIcon   className="cardIcon"/>
                        <span>Settings</span>
                    </div>
                    <div className="profileInfoCardItem">
                        <AutorenewOutlinedIcon  className="cardIcon"/>
                        <span>Switch Account</span>
                    </div>
                    <div className="profileInfoCardItem logout" onClick={handleClick}>
                        <span>Logout</span>
                    </div>
                </div>
            </div>
            { postActive &&
                <div className="postPageContainer">
                    <PostPage postActive={postActive} setPostActive={setPostActive}/>
                </div>
            }
        </div>
    )
}

export default Navbar
