import './profile.scss'
import SettingsIcon from '@mui/icons-material/Settings'
import Avatar from '../../imgs/avatar.jpg'
import Navbar from '../../components/navbar/Navbar'
import { useSelector } from 'react-redux'
import GridOnIcon from '@mui/icons-material/GridOn'
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'
import PhoneEnabledOutlinedIcon from '@mui/icons-material/PhoneEnabledOutlined'
import { useState } from 'react'
const Profile = () => {
    const user = useSelector(state=>state.user.user)
    const [postsActive, setPostsActive] = useState(false) 
    const [savedActive, setSavedActive] = useState(false) 
    const [taggedActive, setTaggedActive] = useState(false) 

    return (
        <div className="profile">
            <Navbar/>
            <div className="mainWrapper">
                <div className="profileWrapper">
                    <div className="profileTop">
                        <div className="pTLeft">
                            <img src={user.profilePic || Avatar} alt="" className="ptImg"/>
                        </div>
                        <div className="pTRight">
                            <div className="pTRightTop">
                                <span className="profileName">{user.username}</span>
                                <button className="edit">Edit Profile</button>
                                <SettingsIcon className="settingIcon"/>
                            </div>
                            <div className="pTRightCenter">
                                <div className="pTRightCenterItem">
                                    <span>1</span>
                                    <span className="secondSpan">posts</span>
                                </div>
                                <div className="pTRightCenterItem">
                                    <span>1.6K</span>
                                    <span className="secondSpan">followers</span>
                                </div>
                                <div className="pTRightCenterItem">
                                    <span>56</span>
                                    <span className="secondSpan">following</span>
                                </div>
                            </div>
                            <div className="pTRightBottom">
                                <span className="profileNameBottom">{user.username}</span>
                                <span className="profileBio">I am a software dev</span>
                            </div>
                            <div className="profileButtons">
                                <div className={postsActive ? "profileButton postsActive" : "profileButton"} onClick={()=>setPostsActive(!postsActive)}>
                                    <GridOnIcon className="profileButtonIcon"/>
                                    <span className="profileButtonName">
                                        POSTS
                                    </span>
                                </div>
                                <div className={savedActive ? "profileButton savedActive" : "profileButton"} onClick={()=>setSavedActive(!savedActive)}>
                                    <PermContactCalendarOutlinedIcon className="profileButtonIcon"/>
                                    <span className="profileButtonName">
                                        SAVED
                                    </span>
                                </div>
                                <div className={taggedActive ? "profileButton taggedActive" : "profileButton"} onClick={()=>setTaggedActive(!taggedActive)}>
                                    <BookmarkBorderOutlinedIcon className="profileButtonIcon"/>
                                    <span className="profileButtonName">
                                        TAGGED
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="profileBottom">
                        <div className="profileBottomContainer">
                            <span className="containerHeader">Getting Started</span>
                            <div className="containerBody">
                                <div className="cBIconContainer">
                                <PhoneEnabledOutlinedIcon className="containerBodyIcon"/>
                                </div>
                                <span className="containerSpan">Add Phone Number</span>
                                <span className="containerSpan1">Add your phone number so you can reset your password, find friends and more.</span>
                                <button className="containerBodyBtn">Add Phone Number</button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
