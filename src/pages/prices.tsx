import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import AuthDialog from "./auth"; // убедись, что путь правильный

function Prices() {
    const { user, updateMembership } = useAuth();
    const navigate = useNavigate();

    const [selectedPlan, setSelectedPlan] = useState<{
        name: string;
        price: string;
        type: string;
    } | null>(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [authOpen, setAuthOpen] = useState(false);
    const [notification, setNotification] = useState<string | null>(null);

    const showNotification = (msg: string) => {
        setNotification(msg);
        setTimeout(() => setNotification(null), 3000);
    };

    const plans = [
        { name: "Базовый", price: "1799₽", type: "Basic" },
        { name: "Премиум", price: "3699₽", type: "Premium" },
        { name: "Элитный", price: "6999₽", type: "Elite" },
    ];

    const handleGetStarted = (plan: { name: string; price: string; type: string }) => {
        if (user && user.membershipType === plan.type) {
            showNotification(`У вас уже активен план «${plan.name}»`);
            return;
        }
        setSelectedPlan(plan);
        if (user) {
            setConfirmOpen(true);
        } else {
            setAuthOpen(true);
        }
    };

    const handleConfirm = async () => {
        if (!selectedPlan) return;
        setConfirmOpen(false);
        try {
            await updateMembership(selectedPlan.type);
            showNotification(`Абонемент обновлён до «${selectedPlan.name}»!`);
            setSuccessOpen(true);
        } catch {
            showNotification("Не удалось обновить абонемент");
        }
    };

    return (
        <>
            {notification && <div className="custom-toast">{notification}</div>}

            <div className="block1p mx-0">
                <div className="block1pCT">
                    <div className="block1pBT">Варианты абонементов</div>
                    <div className="block1pT">Выберите идеальный абонемент для ваших фитнес-целей</div>
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
                        <li className="py-2 d-flex list"><div className="markp"></div><div className="mx-1">Доступ в тренажерный зал</div></li>
                        <li className="py-2 d-flex list"><div className="markp"></div><div className="mx-1">Доступ в раздевалку</div></li>
                        <li className="py-2 d-flex list"><div className="markp"></div><div className="mx-1">Бесплатная фитнес-консультация</div></li>
                        <li className="py-2 d-flex list"><div className="markp"></div><div className="mx-1">Доступ в мобильное приложение</div></li>
                        <li className="py-2 d-flex list"><div className="markp"></div><div className="mx-1">Групповые занятия (7 в месяц)</div></li>
                    </ul>
                    <div className="priceButtonW">
                        <button className="priceButton priceButton1" onClick={() => handleGetStarted(plans[0])}>Записаться</button>
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
                        <li className="py-2 d-flex list"><div className="markp"></div><div className="mx-1">Всё, что входит в тариф «Базовый»</div></li>
                        <li className="py-2 d-flex list"><div className="markp"></div><div className="mx-1">Безлимитные групповые занятия</div></li>
                        <li className="py-2 d-flex list"><div className="markp"></div><div className="mx-1">Гостевые пропуска (2 в месяц)</div></li>
                        <li className="py-2 d-flex list"><div className="markp"></div><div className="mx-1">Полотенца</div></li>
                        <li className="py-2 d-flex list"><div className="markp"></div><div className="mx-1">Сауна и парная</div></li>
                        <li className="py-2 d-flex list"><div className="markp"></div><div className="mx-1">Консультация нутрициолога (1 в месяц)</div></li>
                    </ul>
                    <div className="priceButtonW">
                        <button className="priceButton priceButton2" onClick={() => handleGetStarted(plans[1])}>Записаться</button>
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
                        <li className="py-2 d-flex list"><div className="markp"></div><div className="mx-1">Всё, что входит в тариф «Премиум»</div></li>
                        <li className="py-2 d-flex list"><div className="markp"></div><div className="mx-1">Персональные тренировки (4 в месяц)</div></li>
                        <li className="py-2 d-flex list"><div className="markp"></div><div className="mx-1">Безлимитные гостевые пропуска</div></li>
                        <li className="py-2 d-flex list"><div className="markp"></div><div className="mx-1">Приоритетный доступ к оборудованию</div></li>
                        <li className="py-2 d-flex list"><div className="markp"></div><div className="mx-1">Ежемесячный анализ состава тела</div></li>
                        <li className="py-2 d-flex list"><div className="markp"></div><div className="mx-1">Индивидуальный план питания</div></li>
                        <li className="py-2 d-flex list"><div className="markp"></div><div className="mx-1">Круглосуточный доступ в зал</div></li>
                        <li className="py-2 d-flex list"><div className="markp"></div><div className="mx-1">Персональная раздевалка</div></li>
                    </ul>
                    <div className="priceButtonW">
                        <button className="priceButton priceButton3" onClick={() => handleGetStarted(plans[2])}>Записаться</button>
                    </div>
                </div>
            </div>
            {confirmOpen && (
                <div className="modal-overlay" onClick={() => setConfirmOpen(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setConfirmOpen(false)}>✖</button>
                        <h2 className="modal-title">Подтверждение</h2>
                        <p className="modal-subtitle">Смена абонемента</p>
                        {user && (
                            <div className="confirm-details">
                                <div className="confirm-row">
                                    <span>Текущий:</span>
                                    <span className="badge badge-basic">{user.membershipType}</span>
                                </div>
                                <div className="confirm-arrow">→</div>
                                <div className="confirm-row new-plan">
                                    <span>Новый:</span>
                                    <span className="badge badge-premium">{selectedPlan?.name}</span>
                                    <span className="confirm-price">{selectedPlan?.price}</span>
                                </div>
                            </div>
                        )}
                        <div className="confirm-info">
                            Изменения вступят в силу сразу. Следующее списание через месяц.
                        </div>
                        <div className="d-flex gap-2 mt-3">
                            <button className="btn-outline-red flex-fill" onClick={() => setConfirmOpen(false)}>Отмена</button>
                            <button className="btn-red flex-fill" onClick={handleConfirm}>Подтвердить</button>
                        </div>
                    </div>
                </div>
            )}
            {successOpen && (
                <div className="modal-overlay" onClick={() => setSuccessOpen(false)}>
                    <div className="modal-content text-center" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSuccessOpen(false)}>✖</button>
                        <div className="success-icon">🎉</div>
                        <h2 className="modal-title">Поздравляем!</h2>
                        <p className="modal-subtitle">Абонемент успешно изменён</p>
                        <div className="success-plan">
                            <span className="badge badge-premium">{selectedPlan?.name}</span>
                            <div className="success-price">{selectedPlan?.price}</div>
                        </div>
                        <div className="d-flex gap-2 mt-4">
                            <button className="btn-outline-red flex-fill" onClick={() => setSuccessOpen(false)}>Закрыть</button>
                            <button className="btn-red flex-fill" onClick={() => { setSuccessOpen(false); navigate("/profile"); }}>В профиль</button>
                        </div>
                    </div>
                </div>
            )}
            <AuthDialog isOpen={authOpen} onClose={() => setAuthOpen(false)} />
        </>
    );
}

export default Prices;