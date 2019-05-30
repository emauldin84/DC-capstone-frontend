import React from 'react';
export default function TripToggle({changePast, changeFuture}){
    return(
        <div className='triptoggle'>
            <div className="past">
                {/* Past Trips Switch */}
                <label>Past Trips</label>
                <div className="switch">
                    <label>
                    hide
                    <input type="checkbox" defaultChecked onChange={changePast}/>
                    <span className="lever"></span>
                    show
                    </label>
                </div>
            </div>
            <p>
            </p>
            <div className="future">
                {/* Future Trips Switch */}
                <label>Future Trips</label>
                <div className="switch">
                    <label>
                    hide
                    <input type="checkbox" defaultChecked onChange={changeFuture}/>
                    <span className="lever"></span>
                    show
                    </label>
                </div>
            </div>
        </div>
    )
}
