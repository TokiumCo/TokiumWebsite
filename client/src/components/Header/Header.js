import React from 'react'
import { Link } from 'react-router-dom';
import tokiumLogo from "../../assets/tokium_logo.png";
import './Header.css'

const Header = () => {
  const mobile = window.innerWidth < 500;
  return (
    <div className="header blackBackground flexWrap" style={{width: !mobile && '100%'}}>
      <div className=' textBig' style={{color: '#ff5998'}}>
        {!mobile? <img src={tokiumLogo} className="tokium_logo"></img>: 'Tokium'}
      </div>
      <div className='flex'>
        <div className='white bold borderRadius marHorMed transparentBackground textMed underlineHover' onClick={() => window.open('https://tokium.co')}>Home</div>
        <Link to='/'><div className='white bold borderRadius marHorMed transparentBackground textMed underlineHover'>Pay Royalties</div></Link>
        <Link to='/demo'><div className='white bold borderRadius marHorMed transparentBackground textMed underlineHover'>Demo</div></Link>
      </div>
      
    </div>
  )
}

export default Header