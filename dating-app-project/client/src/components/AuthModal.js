import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const AuthModal = ({ setShowModal, isSignUp }) => {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)
    const [cookie, setCookie, removeCookie] = useCookies(['user'])

    let navigate = useNavigate()

    console.log(email, password, confirmPassword)

    const handleClick = () => {
        setShowModal(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (isSignUp && (password !== confirmPassword)) {
                setError('Passwords not matching!')
                return
            }
            console.log('posting',email,password)
            const response = await axios.post(`http://localhost:8000/${isSignUp ? 'signup' : 'login'}`, {email, password})

            //setCookie('Email',response.data.email)
            setCookie('UserId',response.data.userId)
            setCookie('AuthToken',response.data.token)


            const success = response.status == 201

            if(success && isSignUp) navigate ('/onboarding')
            if(success && !isSignUp) navigate('/dashboard')

            window.location.reload()

        } catch (error) {
            console.log(error)
        }

    }



    return (
        <div className='auth-modal'>
            <div className='close-icon' onClick={handleClick}>x</div>
            <h2>{isSignUp ? 'CREATE ACCOUNT' : 'LOG IN'}</h2>
            <p>Fill the form below to join logo dating today!</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    id='email'
                    name='email'
                    placeholder='email'
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    id='password'
                    name='password'
                    placeholder='password'
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {isSignUp && <input
                    type="password"
                    id='password-check'
                    name='password-check'
                    placeholder='confirm password'
                    required={true}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                }
                <p>{error} </p>
                <input className='secondary-button' type='submit' />
            </form>
        </div>
    )
}

export default AuthModal