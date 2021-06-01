import React, {useState, useEffect, useContext} from 'react';
import Header from './../sections/Header';
import axios from 'axios';
import { UserContext } from '../hooks/UserContext';

const PROFILE_URL = '${process.env.REACT_APP_API_URL}/api/profile';

export default function Profile() {
    const { user } = useContext(UserContext);
    const { token } = user
    const [userDetail, setUserDetail] = useState({});

    useEffect(() => {
        axios.get(PROFILE_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            setUserDetail(response.data)
        }).catch(err => {
            console.log(err.response.data)
        })
    }, [token]);
    return (
        <div className="page">
            <Header />
            Name: {userDetail.name}
            <br></br>
            Email: {userDetail.email}
            <br></br>
            Level: {userDetail.level}
        </div>
    )
}