import { Link } from "react-router-dom"

function Home(){
    return(
        <>
            <div className="block1 align-items-center d-flex justify-content-center">
                <div className="textBlock">
                    <div className="mainText text-center">Transform Your Body</div>
                    <div className="miniMainText text-center">Become the best version of yourself</div>
                    <div className="buttonsUnder d-flex justify-content-center pt-4">
                        <div className="px-2">
                            <Link to="/">
                                <button className='butt1 text-center'>Get Started</button>
                            </Link></div>
                        <div className="pl-3">                        
                            <Link to="/">
                                <button className='butt2 text-center'>View Classes</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="block2 py-4">
                <div className="whyTextBlock text-center">
                    <div className="whyText">Why choose POWERFIT?</div>
                    <div className="whyDesc">We provide everything you need to reach your fitness goals</div>
                </div>
                <div className="whyTables row gap-5 py-4">
                    <div className="col text-center miniTable">
                        <div className="miniTableImageBack">
                            <div className='miniTableImage1'></div>
                        </div>
                        <div className="miniTableZagolov">Premium Equipment</div>
                        <div className="miniTableText">State-of-the-art fitness equipment for all your training needs</div>
                    </div>
                    <div className="col text-center miniTable">
                        <div className="miniTableImageBack">
                            <div className='miniTableImage2'></div>
                        </div>
                        <div className="miniTableZagolov">Premium Equipment</div>
                        <div className="miniTableText">State-of-the-art fitness equipment for all your training needs</div>
                    </div>
                    <div className="col text-center miniTable">
                        <div className="miniTableImageBack">
                            <div className='miniTableImage3'></div>
                        </div>
                        <div className="miniTableZagolov">Premium Equipment</div>
                        <div className="miniTableText">State-of-the-art fitness equipment for all your training needs</div>
                    </div>
                    <div className="col text-center miniTable">
                        <div className="miniTableImageBack">
                            <div className='miniTableImage4'></div>
                        </div>
                        <div className="miniTableZagolov">Premium Equipment</div>
                        <div className="miniTableText">State-of-the-art fitness equipment for all your training needs</div>
                    </div>
                </div>
            </div>
            <div className="block3 py-4 text-center">
                <div className="whyTextBlock text-center">
                    <div className="whyText">Featured Classes</div>
                    <div className="whyDesc">Explore our most popular fitness programs</div>
                </div>
                <div className="classesTables row gap-5 py-4">
                    <div className="col tablee text-center">
                        <div className="tableBackImage1">
                            <div className="tableText">
                                <div className="nameOfClasses">Yoga</div>
                                <div className="classesDesc">Find balance and flexibility</div>
                            </div>
                        </div>
                        <div className="schedule py-2">Daily at 7:00 AM & 6:00 PM</div>
                    </div>
                    <div className="col tablee text-center">
                        <div className="tableBackImage2">
                            <div className="tableText">
                                <div className="nameOfClasses">Strength Training</div>
                                <div className="classesDesc">Build muscle and power</div>
                            </div>
                        </div>
                        <div className="schedule py-2">Mon/Wed/Fri at 6:00 PM</div>
                    </div>
                    <div className="col tablee text-center">
                        <div className="tableBackImage3">
                            <div className="tableText">
                                <div className="nameOfClasses">Cardio</div>
                                <div className="classesDesc">Boost your heart rate and endurance</div>
                            </div>
                        </div>
                        <div className="schedule py-2">Tue/Thu at 7:30 AM & Sat at 9:00 AM</div>
                    </div>  
                </div>
                <div>     
                    <Link to="/">
                        <button className='butt3 text-center'>View All Classes</button>
                     </Link>
                </div>
            </div>
            <div className="block4 text-center py-4">
                <div className="textBlock">
                    <div className="mainText1 text-center">Ready to Start Your Journey?</div>
                    <div className="miniMainText2 text-center">Join POWERFIT today and get your first week free</div>
                    <div className="buttonsUnder d-flex justify-content-center pt-3">
                        <div>                        
                            <Link to="/">
                                <button className='butt4 text-center'>View Membership Plans</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home