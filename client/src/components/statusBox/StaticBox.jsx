import './statusBox.scss'
import { useSelector } from 'react-redux'

const StaticBox = () => {
    const users = useSelector((state)=>state.users.users)
    return (
        <div className="statusBox">
               <div className="statusBoxWrapper">
                    {users.map((user)=> 
                        <div className="statusImgContainer" key={user._id}>
                            <img src={user.profilePic} alt="" className="statusImg"/>
                            <span className="profileName">{user.username}</span>
                        </div>
                    )}
                </div>
        </div>
    )
}

export default StaticBox
