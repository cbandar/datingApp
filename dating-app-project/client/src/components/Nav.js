import React from 'react'
import logo from '../images/Heart.png'

//Navbar 
const Nav = ({minimal, setShowModal, showModal,setIsSignUp}) => {

  const handleClick =( ) =>{
    setShowModal(true)
    setIsSignUp(false)
  }
  const authToken = false


  return (
    <nav>
      <div className='logo-container'>
        
        <img className='logo' src={logo}/>

      </div>

      {!authToken && !minimal && <button 
      className='nav-button' 
      onClick={handleClick}
      disabled={showModal}
      >Log in</button>}


    </nav>
  )
}

export default Nav