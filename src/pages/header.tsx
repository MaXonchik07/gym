import { Link } from 'react-router-dom';

function Header(){
    return (
        <header className='poss'>
             <div className="container d-flex nav-direct justify-content-between">
                <div className="d-flex p-0 align-items-center">
                    <div className="logoW">
                        <div className='logo'></div>
                    </div>
                    <div className='headLogoText'>POWERFIT</div>
                </div>
                <div className="row m-0 align-items-center nav-contact">
                    <div className="col navMinu">
                        <Link to="/" className='headTxt'>Home</Link>
                    </div>
                    <div className="col navMinu">
                        <Link to="/classes" className='headTxt'>Classes</Link>
                    </div>
                    <div className="col navMinu">
                        <Link to="/" className='headTxt'>Trainers</Link>
                    </div>
                    <div className="col navMinu">
                        <Link to="/" className='headTxt'>Prices</Link>
                    </div>
                    <div className="col navMinu">
                        <Link to="/" className='headTxt'>Contact</Link>
                    </div>
                    <div className='col navMinu'>
                        <Link to="/">
                            <button className='butt text-center'>Login</button>
                        </Link>
                    </div>
                </div>
             </div>
        </header>
    );
}

export default Header;