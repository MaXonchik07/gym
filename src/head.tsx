import React from "react";

function headd(){
    return (
        <>
             <div className="container d-flex nav-direct">
                <div className="container d-flex p-0">
                    <div>logo</div>
                    <div className="mx-1">POWERFIT</div>
                </div>
                <div className="container row text-end">
                    <div className="col-4 p-0">Home</div>
                    <div className="col p-0">Classes</div>
                    <div className="col p-0">Trainers</div>
                    <div className="col p-0">Prices</div>
                    <div className="col p-0">Contact</div>
                    <div className="col p-0">Login</div>
                </div>
             </div>
        </>
    );
}

export default headd;