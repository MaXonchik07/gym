import { Link } from "react-router-dom"

function Prices() {
    return (
        <>
            <div className="block1p mx-0">
                <div className="block1pCT">
                    <div className="block1pBT">
                        Варианты абонементов
                    </div>
                    <div className="block1pT">
                        Выберите идеальный абонемент для ваших фитнес-целей
                    </div>
                </div>
            </div>
            <div className="block2p mx-0 row gap-5">
                <div className="col priceTable d-flex priceTable1">
                    <div className="priceZagolov">Базовый</div>
                    <div className="priceDesc">Идеально подходит для начала вашего пути к фитнесу.</div>
                    <div className="d-flex price">
                        <div className="priceNum">1799р</div>
                        <div className="priceMonth"><p></p>/месяц</div>
                    </div>
                    <ul className="list-unstyled priceText">
                        <li className="py-2 d-flex list">
                            <div className="markp"></div>
                            <div className="mx-1">Доступ в тренажерный зал</div>
                        </li>
                        <li className="py-2 d-flex list">
                            <div className="markp"></div>
                            <div className="mx-1">Доступ в раздевалку</div>
                        </li>
                        <li className="py-2 d-flex list">
                            <div className="markp"></div>
                            <div className="mx-1">Бесплатная фитнес-консультация</div>
                        </li>
                        <li className="py-2 d-flex list">
                            <div className="markp"></div>
                            <div className="mx-1">Доступ в мобильное приложение</div>
                        </li>
                        <li className="py-2 d-flex list">
                            <div className="markp"></div>
                            <div className="mx-1">Групповые занятия (7 в месяц)</div>
                        </li>
                    </ul>
                    <div className="priceButtonW">
                        <Link to="/"><button className="priceButton priceButton1">Записаться</button></Link>
                    </div>
                </div>
                <div className="col priceTable d-flex priceTable2">
                    <div className="priceZagolov">Премиум</div>
                    <div className="priceDesc">Самый популярный тариф для тех, кто настроен на серьезный результат</div>
                    <div className="d-flex price">
                        <div className="priceNum">3699р</div>
                        <div className="priceMonth"><p></p>/месяц</div>
                    </div>
                    <ul className="list-unstyled priceText">
                        <li className="py-2 d-flex list">
                            <div className="markp"></div>
                            <div className="mx-1">Всё, что входит в тариф «Базовый»</div>
                        </li>
                        <li className="py-2 d-flex list">
                            <div className="markp"></div>
                            <div className="mx-1">Безлимитные групповые занятия</div>
                        </li>
                        <li className="py-2 d-flex list">
                            <div className="markp"></div>
                            <div className="mx-1">Гостевые пропуска (2 в месяц)</div>
                        </li>
                        <li className="py-2 d-flex list">
                            <div className="markp"></div>
                            <div className="mx-1">Полотенца</div>
                        </li>
                        <li className="py-2 d-flex list">
                            <div className="markp"></div>
                            <div className="mx-1">Сауна и парная</div>
                        </li>
                        <li className="py-2 d-flex list">
                            <div className="markp"></div>
                            <div className="mx-1">Консультация нутрициолога (1 в месяц)</div>
                        </li>
                    </ul>
                    <div className="priceButtonW">
                        <Link to="/"><button className="priceButton priceButton2">Записаться</button></Link>
                    </div>
                </div>
                <div className="col priceTable d-flex priceTable3">
                    <div className="priceZagolov">Элитный</div>
                    <div className="priceDesc">Максимальный результат с персональной поддержкой и индивидуальным подходом</div>
                    <div className="d-flex price">
                        <div className="priceNum">6999р</div>
                        <div className="priceMonth"><p></p>/месяц</div>
                    </div>
                    <ul className="list-unstyled priceText">
                        <li className="py-2 d-flex list">
                            <div className="markp"></div>
                            <div className="mx-1">Всё, что входит в тариф «Премиум»</div>
                        </li>
                        <li className="py-2 d-flex list">
                            <div className="markp"></div>
                            <div className="mx-1">Персональные тренировки (4 в месяц)</div>
                        </li>
                        <li className="py-2 d-flex list">
                            <div className="markp"></div>
                            <div className="mx-1">Безлимитные гостевые пропуска</div>
                        </li>
                        <li className="py-2 d-flex list">
                            <div className="markp"></div>
                            <div className="mx-1">Приоритетный доступ к оборудованию</div>
                        </li>
                        <li className="py-2 d-flex list">
                            <div className="markp"></div>
                            <div className="mx-1">Ежемесячный анализ состава тела</div>
                        </li>
                        <li className="py-2 d-flex list">
                            <div className="markp"></div>
                            <div className="mx-1">Индивидуальный план питания</div>
                        </li>
                        <li className="py-2 d-flex list">
                            <div className="markp"></div>
                            <div className="mx-1">Круглосуточный доступ в зал</div>
                        </li>
                        <li className="py-2 d-flex list">
                            <div className="markp"></div>
                            <div className="mx-1">Персональная раздевалка</div>
                        </li>
                    </ul>
                    <div className="priceButtonW">
                        <Link to="/"><button className="priceButton priceButton3">Записаться</button></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Prices