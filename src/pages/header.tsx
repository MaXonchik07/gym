import { Link } from "react-router-dom";

function Header(){
    return (
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
                    <div className='col navMinu'>
                        <Link to="/">
                            <button className='butt text-center'>Войти</button>
                        </Link>
                    </div>
                </div>
             </div>
        </header>
    );
}

export default Header;