import './postPage.scss'
import videoIcon from '../../imgs/videoIcon.svg'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined'
import { useState } from "react"
import { axiosInstance } from '../../requestMethods'
import { useSelector } from 'react-redux'
const PostPage = ({postActive, setPostActive}) => {
    const [file, setFile] = useState(null)
    const [comment, setComment] = useState("")
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const user = useSelector(state=>state.user.user)
    const handleClick = async (e)=>{
        e.preventDefault()
        const newPost = {
            userId: user._id,
            desc: comment,
        }
        if(file){
            const data = new FormData()
            const filename = Date.now() + file.name
            data.append("name", filename)
            data.append("file", file)
            newPost.image = filename

            try{
                await axiosInstance.post('/upload', data)
            }catch(err){}
        }
        try{
            await axiosInstance.post('/posts', newPost, { headers: {
                token: `Bearer ${user.token}`
            }})
            setSuccess(true)
        }catch(err){
            setError(true)
        }
    }
    
    return (
        <div className={postActive ? "postPage" : "postPage close"}>
            <CloseOutlinedIcon className="postPageClose" onClick={()=>setPostActive(false)}/>
            {!file ? (
                <>
                    <div className="postPageWrapper">
                        <div className="postPageTop">
                            <span>create a new post</span>
                        </div>
                        <div className="postPageBottom">
                            <img src={videoIcon} alt="" />
                            <span>Drag photos and videos here</span>
                            <input type="file" id="file" name="file" style={{display: "none"}} onChange={e=>setFile(e.target.files[0])}/>
                            <label htmlFor="file" className="fileSelectBtn">
                                select from computer
                            </label>
                        </div>
                    </div>
                </>
            ) :(    
            <>
                <div className="postPageWrapper second">
                    <div className="postPageTop">
                        <KeyboardBackspaceOutlinedIcon className="backIcon"/>
                        <button className="postBtn" onClick={handleClick}>Post</button>
                    </div>
                    <div className="postPageBottom">
                    <img src={URL.createObjectURL(file)} alt="" className="toPostImage"/>
                        <span>write your comment</span>
                        <textarea type="text" className="postComment" onChange={e=>setComment(e.target.value)}/>
                    </div>
                </div>
            </>
            )}
            {success && <span className="postSuccess">post made successfully...</span>}
            {error && <span className="postError">sorry, your post failed due to network issues...</span>}
        </div>
    )
}

export default PostPage
