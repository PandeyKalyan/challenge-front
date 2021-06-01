import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import InlineButton from './../components/InlineButton';
import { UserContext } from '../hooks/UserContext';
import useLogout from './../hooks/useLogout';

export default function Header() {
    const {user} = useContext(UserContext);
    let token = user && user.token;
    const { logoutUser } = useLogout();

    return(
        <header>
            {user 
            ? <>
                Hello, {user.name}. <br></br>Your JWT token: {token}
                <Link to = "/dashboard"> 
                    <InlineButton name={"dashboard"}/>
                </Link>
                <Link to = "/topten"> 
                    <InlineButton name={"topten"}/>
                </Link>
                <Link to = "/profile"> 
                    <InlineButton name={"profile"}/>
                </Link>
                <InlineButton name={'logout'} handleClick={logoutUser} />
            </>
           : <div className='btnGroup'>
                <Link to = "/login"> 
                    <InlineButton name={"login"}/>
                </Link>
                <Link to = "/register"> 
                    <InlineButton name={"register"}/>
                </Link>
            </div>
            }
        </header>
    )
}