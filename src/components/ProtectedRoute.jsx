import React from 'react'

export default function ProtectedRoute({children}) {
    const {token}=useSelector((state)=>state.auth);
    const navigate=useNavigate();
    if(token)
        return {children}
    else
        navigate("/login")
  return (
    <div>
      
    </div>
  )
}
