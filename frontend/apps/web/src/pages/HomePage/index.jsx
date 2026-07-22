import React, { useEffect } from 'react'
import { useMainContext } from '../../context/MainContext'
import { useNavigate } from 'react-router-dom';



const HomePage = () => {
    const {user} = useMainContext();

    const navigate = useNavigate();
    useEffect(() => {
        
        user["_id"] ? navigate(`/${user.userName}/personal-info`,{replace: true}) : navigate("/login",{replace: true})
    },[user])
  return null
}

export default HomePage