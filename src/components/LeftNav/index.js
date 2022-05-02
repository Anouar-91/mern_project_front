import React from 'react'
import { NavLink } from 'react-router-dom'

const LeftNav = () => {
  return (
    <div className="left-nav-container">
        <div className="icons">
            <div className="icons-bis">
                <NavLink to="/" exact className={(navData) => navData.isActive ? "active-left-nav" : "" }>
                    <img src="./img/icons/home.svg" alt="Home" />
                </NavLink>
                <NavLink to="/trending" exact className={(navData) => navData.isActive ? "active-left-nav" : "" }>
                    <img src="./img/icons/rocket.svg" alt="Home" />
                </NavLink>
                <NavLink to="/profil" exact className={(navData) => navData.isActive ? "active-left-nav" : "" } >
                    <img src="./img/icons/user.svg" alt="Home" />
                </NavLink>
            </div>
        </div>
    </div>
  )
}

export default LeftNav