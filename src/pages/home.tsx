import { Link } from "react-router-dom";

function Home(){
    return(
        <>
            <div className="block1 align-items-center d-flex justify-content-center">
                <div className="textBlock">
                    <div className="mainText text-center">Преобрази Свое Тело</div>
                    <div className="miniMainText text-center">Стань лучшей версией себя</div>
                    <div className="buttonsUnder d-flex justify-content-center pt-4">
                        <div className="px-2">
                            <Link to="/prices">
                                <button className='butt1 text-center'>Начать</button>
                            </Link></div>
                        <div className="pl-3">                        
                            <Link to="/classes">
                                <button className='butt2 text-center'>Все занятия</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="block2 py-4">
                <div className="whyTextBlock text-center">
                    <div className="whyText">Почему выбирают POWERFIT?</div>
                    <div className="whyDesc">Мы предоставляем всё необходимое для достижения твоих фитнес-целей</div>
                </div>
                <div className="whyTables row gap-5 py-4">
                    <div className="col text-center miniTable">
                        <div className="miniTableImageBack">
                            <div className='miniTableImage1'></div>
                        </div>
                        <div className="miniTableZagolov">Современное оборудование</div>
                        <div className="miniTableText">Лучшее фитнес-оборудование для всех видов тренировок</div>
                    </div>
                    <div className="col text-center miniTable">
                        <div className="miniTableImageBack">
                            <div className='miniTableImage2'></div>
                        </div>
                        <div className="miniTableZagolov">Опытные тренеры</div>
                        <div className="miniTableText">Сертифицированные профессионалы для твоего фитнес-пути</div>
                    </div>
                    <div className="col text-center miniTable">
                        <div className="miniTableImageBack">
                            <div className='miniTableImage3'></div>
                        </div>
                        <div className="miniTableZagolov">Гарантированный результат</div>
                        <div className="miniTableText">Тысячи людей уже изменили свою жизнь с нами</div>
                    </div>
                    <div className="col text-center miniTable">
                        <div className="miniTableImageBack">
                            <div className='miniTableImage4'></div>
                        </div>
                        <div className="miniTableZagolov">Удобный график</div>
                        <div className="miniTableText">Работаем с раннего утра и до самого позднего вечера</div>
                    </div>
                </div>
            </div>
            <div className="block3 py-4 text-center">
                <div className="whyTextBlock text-center">
                    <div className="whyText">Популярные занятия</div>
                    <div className="whyDesc">Изучи наши самые востребованные фитнес-программы</div>
                </div>
                <div className="classesTables row gap-5 py-4">
                    <div className="col tablee text-center">
                        <div className="tableBackImage1">
                            <div className="tableText">
                                <div className="nameOfClasses">Йога</div>
                                <div className="classesDesc">Найди баланс и гибкость</div>
                            </div>
                        </div>
                        <div className="schedule py-2">Ежедневно в 7:00 и 18:00</div>
                    </div>
                    <div className="col tablee text-center">
                        <div className="tableBackImage2">
                            <div className="tableText">
                                <div className="nameOfClasses">Силовые тренировки</div>
                                <div className="classesDesc">Накачай мышцы и силу</div>
                            </div>
                        </div>
                        <div className="schedule py-2">Пн/Ср/Пт в 18:00</div>
                    </div>
                    <div className="col tablee text-center">
                        <div className="tableBackImage3">
                            <div className="tableText">
                                <div className="nameOfClasses">Кардио</div>
                                <div className="classesDesc">Укрепи сердце и выносливость</div>
                            </div>
                        </div>
                        <div className="schedule py-2">Вт/Чт в 7:30 и Сб в 9:00</div>
                    </div>  
                </div>
                <div>     
                    <Link to="/classes">
                        <button className='butt3 text-center'>Все занятия</button>
                     </Link>
                </div>
            </div>
            <div className="block4 text-center py-4">
                <div className="textBlock">
                    <div className="mainText1 text-center">Готов начать свой путь?</div>
                    <div className="miniMainText2 text-center">Присоединяйся к POWERFIT сегодня и получи первую неделю бесплатно</div>
                    <div className="buttonsUnder d-flex justify-content-center pt-3">
                        <div>                        
                            <Link to="/prices">
                                <button className='butt4 text-center'>Выбрать абонемент</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home