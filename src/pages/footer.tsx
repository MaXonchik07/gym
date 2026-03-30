import { Link } from "react-router-dom"

function Footer(){
    return(
        <>
            <footer className="footerContacts">
                <div className=" row text-center gap-5 py-4 footMain">
                    <div className="col">
                        <div className="text-start d-flex">
                            <div className="logoFoot"></div>
                            <div className="lastLogoText">POWERFIT</div>
                        </div>
                        <div className="logoText text-start pt-2">Transform your body, transform your life. Join the ultimate fitness experience</div>
                    </div>
                    <div className="col footMiniCont">
                        <div className="text-start">
                            <div className="footCont">Quick Links</div>
                            <div>
                                <ul className="list-unstyled">
                                    <li><Link to="/classes" className="liColor">Classes</Link></li>
                                    <li><Link to="/classes" className="liColor">Trainers</Link></li>
                                    <li><Link to="/classes" className="liColor">Pricing</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col footMiniCont">
                        <div className="text-start">
                            <div className="footCont">Contact</div>
                            <div>
                                <ul className="list-unstyled">
                                    <li className="liColor py-1">456 Studio Lane</li>
                                    <li className="liColor py-1">Brooklyn, NY 11215</li>
                                    <li className="liColor py-1">8-800-535-35-35</li>
                                    <li className="liColor py-1">info@powerfit.com</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col footMiniCont">
                        <div className="text-start">
                            <div className="footCont">Hours</div>
                            <div>
                                <ul className="list-unstyled">
                                    <li className="liColor py-1">Mon-Fri: 5:00 AM - 11:00 PM</li>
                                    <li className="liColor py-1">Saturday: 6:00 AM - 10:00 PM</li>
                                    <li className="liColor py-1">Sunday: 7:00 AM - 9:00 PM</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footerLastText py-4">© 2026 POWERFIT. All rights reserved</div>
            </footer>
        </>
    )
}

export default Footer