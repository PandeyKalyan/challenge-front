import React, {useContext} from 'react';
import { Link, Redirect } from 'react-router-dom';
import FormInput from './../components/FormInput';
import CTA from './../components/CTA';
import Prompt from './../components/Prompt';
import Error from './../components/Error';
import useForm from './../hooks/useForm';
import useAuth from './../hooks/useAuth';

import { UserContext } from '../hooks/UserContext';

export default function Login() {
    const { user } = useContext(UserContext);
   

    const { values, handleChange } = useForm({
        initialValues: {
            email: '',
            password: ''
        }
    });

    const { loginUser, error } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        await loginUser(values);
    }

    if(user) {
        return(
            <Redirect to='/dashboard'/>
        )
    }
    return(
        <div className='page' style={{justifyContent:'center'}}>
             <div className="inlineForm">
                <h3>Login</h3>
             <div className="inlineForm__notif">
                 {error && <Error error={error.error}/>}
             </div>
                <form onSubmit={handleLogin}>
                    <FormInput type={"text"} 
                                placeholder={"Email"} 
                                name={"email"} 
                                value={values.email} 
                                handleChange={handleChange} />
                    <FormInput type={"password"} 
                                placeholder={"Password"} 
                                name={"password"} 
                                value={values.password} 
                                handleChange={handleChange} />
                    <div className="inlineForm__submit">
                        <Link to='/register'>
                            <Prompt prompt={"No account? Create one."}/>
                        </Link>
                        <CTA name={"login"} type={"submit"} 
                            /> 
                    </div>
                </form>
            </div>
        </div>
    )
}