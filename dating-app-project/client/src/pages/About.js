import Nav from '../components/Nav'
import Footer from '../components/Footer'
import AuthModal from "../components/AuthModal"
import {useState} from 'react'
import {useCookies} from "react-cookie"
import { Link } from 'react-router-dom';

const About = () => {
    const [showModal, setShowModal] = useState(false)
    const [isSignUp, setIsSignUp] = useState(true)
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const authToken = cookies.AuthToken

    const handleClick = () => {
        if (authToken) {
            removeCookie('UserId', cookies.UserId)
            removeCookie('AuthToken', cookies.AuthToken)
            window.location.reload()
            return
        }
        setShowModal(true)
        setIsSignUp(true)
    }

    return (
        <div className="overlay">
            <Nav
                authToken={authToken}
                minimal={false}
                setShowModal={setShowModal}
                showModal={showModal}
                setIsSignUp={setIsSignUp}
            />
            <div className="home">
                <h1 className="secondary-title">About the application</h1>
                <p>The dating application has been developed using a MERN technology stack.</p>
                <p>The front-end of the application is managed by React. The back-end and functionality of the application is developed using Express and Node.js.</p>
                <p>MongoDB was used to store and manage user data.</p>
                <p>Click here to go back to the main page.</p>
                <p><Link to="/">Go to Homepage</Link></p>
                
                {showModal && (
                    <AuthModal setShowModal={setShowModal} isSignUp={isSignUp}/>
                )}
            </div>
            <Footer/>
        </div>

    )
}
export default About