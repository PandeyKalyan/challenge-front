import { useState, useContext } from 'react'; 
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';  

export default function useAuth() {
    let history = useHistory();
    const {setUser} = useContext(UserContext);
    const [error, setError] = useState(null);

    //set user
    const setUserContext =  (user) => {
        setUser(user);
        history.push('/dashboard')

    }

    //register user  
    const registerUser = async (data) => {
        const { name, email, password, passwordConfirm } = data;
            return axios.post(`${process.env.REACT_APP_API_URL}/api/signup`, {
                  name,
                  email,
                  password,
                  passwordConfirm
                }).then((response) => {
                    localStorage.setItem('user', JSON.stringify(response.data))
                    setUserContext(response.data);
                })
                .catch((err) => {
                   return setError(err.response.data);
            })
        };

    //login user 
    const loginUser = async (data) => {
        const { email, password } = data;
            return axios.post(`${process.env.REACT_APP_API_URL}/api/signin`, {
                email,
                password,
            }).then((response) => {
                localStorage.setItem('user', JSON.stringify(response.data))
                setUserContext(response.data);
            }).catch((err) => {
                setError(err.response.data);
            })
        };

    return {
        registerUser,
        loginUser,
        error
    }
}
