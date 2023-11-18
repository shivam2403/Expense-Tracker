import {createContext,useContext,useEffect,useState} from 'react'

const UserContext=createContext();

export const UserProvider=({children})=>{
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
      });
    
      useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
      }, [user]);

    const login=(userData)=>{
        setUser(userData);
    }

    const logout=()=>{
        setUser(null);
    }

    return (<UserContext.Provider value={{user,login,logout}}>
        {children}
    </UserContext.Provider>)
}

export const useUser=()=>{
    const context=useContext(UserContext);

    if(!context){
        throw new Error('useUser must be used within a UserProvider');
    }

    return context;
}