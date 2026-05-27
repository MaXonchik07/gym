import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Auth from "./auth";

function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/"); 
    };

    return (
        <>
            <header className='poss'>
                <div className="container d-flex nav-direct justify-content-between">
                    <div className="d-flex p-0 align-items-center">
                        <div className="logoW">
                            <div className='logo'></div>
                        </div>
                        <div className='headLogoText'><Link to="/" className='logoLink'>POWERFIT</Link></div>
                    </div>
                    <div className="row m-0 align-items-center nav-contact">
                        <div className="col navMinu">
                            <Link to="/" className='headTxt'>Главная</Link>
                        </div>
                        <div className="col navMinu">
                            <Link to="/classes" className='headTxt'>Занятия</Link>
                        </div>
                        <div className="col navMinu">
                            <Link to="/prices" className='headTxt'>Цены</Link>
                        </div>
                        <div className="col navMinu">
                            <Link to="/contact" className='headTxt'>Контакты</Link>
                        </div>
                        {user ? (
                            <>
                                <div className="col navMinu" >
                                    <Link to="/profile" className="headTxt">
                                        {user.firstName}
                                    </Link>
                                </div>
                                <div className="col navMinu">
                                    <button className='butt text-center' onClick={handleLogout}>Выйти</button>
                                </div>
                            </>) : (
                            <div className='col navMinu'>
                                <button className='butt text-center' id="logButt" onClick={() => setIsModalOpen(true)}>Войти</button>
                            </div>
                        )}
                    </div>
                </div>
            </header>
            <Auth isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}

export default Header;