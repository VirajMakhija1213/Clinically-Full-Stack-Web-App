import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

export default function OpenRoute({ children }) {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      navigate("/")
    }
  }, [token, navigate])

  // Only render children if user is not authenticated
  return !token ? children : null
}
