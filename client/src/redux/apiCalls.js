import { logout } from './userRedux'

export const userLogout = async (dispatch)=>{
    dispatch(logout())
}
