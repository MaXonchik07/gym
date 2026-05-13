import { useEffect, useState } from "react";

function Profile() {
    const [currentUser, setCurrentUser] = useState("");

    useEffect(() => {
        const user = localStorage.getItem("currentUser");
        if (user) {
            setCurrentUser(JSON.parse(user));
        }
    }, []);
    
    return (
        <>
            <div className="block1pfl mx-0">
                <div className="block1pflCT">
                    <div className="block1pflBT">
                        Привет, {currentUser.firstName} {currentUser.surName}! 
                    </div>
                    <div className="block1pflT">
                        Добро пожаловать в ваш личный кабинет
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;