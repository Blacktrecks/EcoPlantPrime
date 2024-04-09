import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Header = () => {
    const { user, logoutUser } = useContext(AuthContext);

    return (
        <div>
            {user && (
                <>
                    
                </>
            )}
            {!user && (
                <Link to="/register">Register</Link>
              
            )}
        </div>
    );
};

export default Header;
