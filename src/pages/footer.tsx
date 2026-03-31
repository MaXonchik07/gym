import { Link } from "react-router-dom";

function Footer(){
    return(
        <>
            <footer className="footerContacts">
                <div className=" row text-center gap-5 py-4 footMain">
                    <div className="col p-0">
                        <div className="text-start d-flex">
                            <div className="logoFoot"></div>
                            <div className="lastLogoText">POWERFIT</div>
                        </div>
                        <div className="logoText text-start pt-2">Преобрази свое тело, преобрази свою жизнь. Присоединяйся к лучшему фитнес-опыту</div>
                    </div>
                    <div className="col footMiniCont p-0">
                        <div className="text-start">
                            <div className="footCont">Быстрые ссылки</div>
                            <div>
                                <ul className="list-unstyled">
                                    <li><Link to="/classes" className="liColor">Занятия</Link></li>
                                    <li><Link to="/contact" className="liColor">Контакты</Link></li>
                                    <li><Link to="/prices" className="liColor">Цены</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col footMiniCont p-0">
                        <div className="text-start">
                            <div className="footCont">Контакты</div>
                            <div>
                                <ul className="list-unstyled">
                                    <li className="liColor py-1">ул. Политехническая, 29</li>
                                    <li className="liColor py-1">Саратов, 413503</li>
                                    <li className="liColor py-1">8-800-535-35-35</li>
                                    <li className="liColor py-1">info@powerfit.com</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col footMiniCont p-0">
                        <div className="text-start">
                            <div className="footCont">Часы работы</div>
                            <div>
                                <ul className="list-unstyled">
                                    <li className="liColor py-1">Пн-Пт: 5:00 - 23:00</li>
                                    <li className="liColor py-1">Суббота: 6:00 - 22:00</li>
                                    <li className="liColor py-1">Воскресенье: 7:00 - 21:00</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footerLastText py-4">© 2026 POWERFIT. Все права защищены</div>
            </footer>
        </>
    )
}

export default Footer