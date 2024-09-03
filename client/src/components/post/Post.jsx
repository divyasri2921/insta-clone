import './post.scss'
import Avatar from '../../imgs/avatar.jpg'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import { useState, useEffect } from 'react';
import { axiosInstance, publicFolder } from '../../requestMethods'
import { format } from 'timeago.js'
const Post = ({post}) => {
    const [optionsActive, setOptionsActive] = useState(false)
    const [postUser, setPostUser] = useState("")
    // const [cancel, setCancel] = useState(false)
    // console.log(cancel);
    const userId = post.userId
    useEffect(()=>{
        let isMounted = true
        const fetchPostUser = async()=>{
            try{
                const res = await axiosInstance.get("/users/find/" + userId)
                if(isMounted){
                    setPostUser(res.data)
                }
            }catch{}
        }
        fetchPostUser()
        return ()=>{
            isMounted = false
        }
    },[userId])
    return (
        <div className="post">
            {optionsActive && 
            <>
                <div className="optionsContainer">
                    <div className="option">
                        <span className="red">Report</span>
                    </div>
                    <div className="option">
                    <span className="red">Unfollow</span>
                    </div>
                    <div className="option">
                        <span className="option">Go to post</span>
                    </div>
                    <div className="option">
                        <span className="option">Share to ...</span>
                    </div>
                    <div className="option">
                        <span className="option">Tagged acccouts</span>
                    </div>
                    <div className="option">
                    <span className="option">Embed</span>
                    </div>
                    <div className="option">
                        <span className="option">CopyLink</span>
                    </div>
                    <div className="option last" onClick={()=>setOptionsActive(false)}>
                        <span className="option">Cancel</span>
                    </div>    
                </div>
            </>
            }
            <div className="postHeader">
                <div className="postHeaderLeft">
                    <img src={postUser.profilePic || Avatar} alt="" className="profilePic" />
                    <span className="postUsername">{postUser.username}</span>
                </div>
                <div className="postHeaderRight" onClick={()=>setOptionsActive(!optionsActive)}>
                    <MoreHorizIcon/>
                </div>
            </div>
            <img src={publicFolder + post.image} alt="" className="postImage" />
            <div className="postFooter">
                <div className="postFooterTop">
                    <div className="pfooterTopLeft">
                        <FavoriteBorderOutlinedIcon className="pFIcon"/>
                        <img src="https://img.icons8.com/ios/50/000000/topic.png" className="pFIcon" alt=""/>
                        <NearMeOutlinedIcon className="pFIcon"/>
                    </div>
                    <div className="pfooterTopRight">
                        <BookmarkBorderOutlinedIcon className="pFIcon"/>
                    </div>
                </div>
                <div className="postInfo">
                    <span style={{fontSize: "15px"}}>156.8k likes</span>
                    <p style={{marginTop: "20px", fontSize: "15px", marginBottom: "10px"}}>{post.desc}</p>
                    <span style={{color: "#8e8e8e", fontSize: "12px"}}>{format(post.createdAt)}</span>
                </div>
                <div className="comment">
                    <div className="cleft">
                        <SentimentSatisfiedIcon/>
                        <input type="text" placeholder="comment" className="postComment"/>
                    </div>
                    <div className="cRight">
                        <button className="cBtn">Post</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
