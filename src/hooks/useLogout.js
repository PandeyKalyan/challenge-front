import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from './UserContext';

export default function useLogout() {
    let history = useHistory();
    const {setUser} = useContext(UserContext);

    const logoutUser = () => {
        localStorage.removeItem('user');
        setUser(null)
        history.push('/');
    }

    return {
        logoutUser
    }

}