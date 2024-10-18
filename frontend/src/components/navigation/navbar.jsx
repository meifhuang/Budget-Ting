import React from 'react';
import { NavBarButtons } from './navbar-buttons';


export const Navbar = () => {
        return (
            <div className="nav-bar__container">
              <nav className="nav-bar">
                <NavBarButtons />
              </nav>
            </div>
        )
    }