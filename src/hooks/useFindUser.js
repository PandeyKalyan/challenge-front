import { useState, useEffect } from 'react';

export default function useFindUser() {
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() =>{
        function findUser() {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        console.log(currentUser)
        setUser(currentUser);
        setLoading(false);
        }
        
        findUser();  
    }, []);
    
    return {
        user,
        setUser,
        isLoading
    }
}