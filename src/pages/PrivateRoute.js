import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from './../hooks/UserContext';
import Loading from './../components/Loading'; 


export default function PrivateRoute(props) {   
    const { user, isLoading } = useContext(UserContext); 

    const { component: Component,
        ...rest } = props;

      if(isLoading) {
          return <Loading/>
        }

      return ( <Route {...rest} render={(props) => (user? <Component {...props}/>: <Redirect to='/login'/>)}/>)
        

}




