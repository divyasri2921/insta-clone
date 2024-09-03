import './sidebar.scss'
import { useSelector } from 'react-redux'
import Avatar from '../../imgs/avatar.jpg'
const Sidebar = () => {
    const user = useSelector((state)=>state.user.user)
    const users = useSelector((state)=>state.users.users)
    return (
        <div className="sidebar">
            <div className="sidebarTop">
                <div className="sidebarTopLeft">
                    <img src={user.profilePic || Avatar} alt="" className="sidebarProfilePic" />
                    <div className="sidebarTopLeftUser">
                        <span className="sidebarUsernameTop">{user.username}</span>
                        <span className="sidebarUsername" style={{textTransform: "uppercase"}}>{user.username}</span>
                    </div>
                </div>
                <div className="sidebarTopRight">
                    <button className="sidebarSwitchBtn">Switch</button>
                </div>
            </div>
            <div className="sidebarBottom">
                <table>
                    <thead>
                        <tr className="tableHeadContainer">
                            <th className="tableHead">
                                <span>Suggestions for you</span>
                            </th>
                            <th className="tableHead">
                                <span style={{color: "black"}}>See all</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user)=>
                            <tr key={user._id}>
                                <td>
                                    <div className="sidebarUsers">
                                        <div className="sidebarUsersLeft">
                                            <img src={user.profilePic || Avatar} alt="" className="sidebarUsersImg"/>
                                            <div className="sidebarUsersLeftSpans">
                                                <span >{user.username}</span>
                                                <span className="span2">Follows You</span>
                                            </div>
                                        </div>
                                        <div className="sidebarUsersRight">
                                            <button className="followBtn">Follow</button>
                                        </div>
                                    </div>
                                </td>
                            </tr>                       
                        )}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default Sidebar
