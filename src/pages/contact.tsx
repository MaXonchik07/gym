function Contact() {
    const textarea = document.querySelector('textarea');
    textarea?.addEventListener('input', function(){
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    })
    
    return (
        <>
            <div className="block1cs mx-0">
                <div className="block1csCT">
                    <div className="block1csBT">
                        Свяжитесь с нами
                    </div>
                    <div className="block1csT">
                        Есть вопросы? Мы будем рады услышать вас. Отправьте нам сообщение, и мы ответим в ближайшее время
                    </div>
                </div>
            </div>
            <div className="block2cs mx-0">
                <div className="row gap-5 mx-0">
                    <div className="col text-center miniTablecs">
                        <div className="miniTableImageBackcs">
                            <div className='miniTableImage1cs'></div>
                        </div>
                        <div className="miniTableZagolovcs">Местоположение</div>
                        <ul className="list-unstyled my-0 miniTableTextcs py-1">
                            <li>Ул. Политехническая 29</li>
                            <li>Саратов</li>
                        </ul>
                    </div>
                    <div className="col text-center miniTablecs">
                        <div className="miniTableImageBackcs">
                            <div className='miniTableImage2cs'></div>
                        </div>
                        <div className="miniTableZagolovcs">Телефон</div>
                        <ul className="list-unstyled my-0 miniTableTextcs py-1">
                            <li>8 800 535-35-35</li>
                            <li>Пн-Пт 6:00-22:00</li>
                        </ul>
                    </div>
                    <div className="col text-center miniTablecs">
                        <div className="miniTableImageBackcs">
                            <div className='miniTableImage3cs'></div>
                        </div>
                        <div className="miniTableZagolovcs">E-Mail</div>
                        <ul className="list-unstyled my-0 miniTableTextcs py-1">
                            <li>info@powerfit.com</li>
                        </ul>
                    </div>
                    <div className="col text-center miniTablecs">
                        <div className="miniTableImageBackcs">
                            <div className='miniTableImage4cs'></div>
                        </div>
                        <div className="miniTableZagolovcs">Часы Работы</div>
                        <ul className="list-unstyled my-0 miniTableTextcs py-1">
                            <li>Пн-Пт: 5:00 - 23:00</li>
                            <li>Сб: 6:00 - 22:00</li>
                            <li>Вск: 7:00 - 21:00</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="block3cs mx-0">
                <div className="row gap-5 px-0 gx-0 block3MapMedia">
                    <div className="col">
                        <form className="formCS">
                            <div className="questionsCS">Есть вопросы?</div>
                            <label htmlFor="firstname" className="d-flex mb-1 textCS">Имя</label>
                            <input className="nameInputCS mb-3 textCS1" name="firstname" type="text" placeholder="Иван"/>
                            <label htmlFor="surname" className="d-flex mb-1 textCS">Фамилия</label>
                            <input className="nameInputCS mb-3 textCS1" name="surname" type="text" placeholder="Иванов"/>
                            <label htmlFor="e-mail" className="d-flex mb-1 textCS">Почта</label>
                            <input type="email" name="e-mail" className="emailInputCS mb-3 textCS1" placeholder="ivanovIvan@mail.ru" />
                            <label htmlFor="phone" className="d-flex mb-1 textCS">Телефон</label>
                            <input type="tel" name="phone" className="phoneInputCS mb-3 textCS1" placeholder="8 800-535-35-35" />
                            <label htmlFor="theme" className="d-flex mb-1 textCS">Тема</label>
                            <input type="text" name="theme" className="themeInputCS mb-3 textCS1" placeholder="Абонемент" />
                            <label htmlFor="problem" className="d-flex mb-1 textCS">Сообщение</label>
                            <textarea name="problem" placeholder="Опишите нам вашу проблему" className="textareaCS textCS1 mb-3"></textarea>
                            <input type="submit" value={"Отправить сообщение"} className="submitCS" />
                        </form>
                    </div>
                    <div className="col row gx-0">
                        <div className="mb-5 mapMedia"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.0641328100855!2d45.97882389444005!3d51.530383532241444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4114c7000890260d%3A0xb69430fed1b7968c!2z0KHQsNGA0LDRgtC-0LLRgdC60LjQuSDQs9C-0YHRg9C00LDRgNGB0YLQstC10L3QvdGL0Lkg0YLQtdGF0L3QuNGH0LXRgdC60LjQuSDRg9C90LjQstC10YDRgdC40YLQtdGCINC40LzQtdC90Lgg0JPQsNCz0LDRgNC40L3QsCDQri4g0JAu!5e0!3m2!1sru!2sru!4v1778598762125!5m2!1sru!2sru"  loading="lazy" className="mapCS" title="googleMap"></iframe></div>
                        <div className="oftenQuestions">
                            <div className="queBlocksZagolov pb-1">Часто задаваемые вопросы</div>
                            <div className="queBlock">
                                <div className="queZagolov">Есть ли возрастные ограничения для посещения?</div>
                                <div className="queText">Посетители должны быть не младше 16 лет для использования тренажерного зала и не младше 18 лет для групповых занятий и персональных тренировок. Для участников младше 18 лет требуется подпись родителя или опекуна. </div>
                            </div>
                            <div className="queBlock">
                                <div className="queZagolov">Могу ли я заморозить или отменить абонемент?</div>
                                <div className="queText">Абонемент можно заморозить на срок до 3 месяцев при подаче письменной заявки за 14 дней. Для отмены требуется уведомление за 30 дней. Обратитесь на стойку администратора для получения помощи.        </div>
                            </div>
                            <div className="queBlock">
                                <div className="queZagolov">Предоставляете ли вы скидки для семей?</div>
                                <div className="queText">Да, мы предлагаем семейную скидку 10% для двух и более членов семьи, оформляющих абонементы вместе. Для получения скидки необходимо указать, что вы являетесь членами одной семьи, при регистрации. </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact