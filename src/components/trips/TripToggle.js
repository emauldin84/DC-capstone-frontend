import React, { Component } from 'react'

export default class tripToggle extends Component {
    constructor(props){
        super(props)
        this.state = {
            pastTrips: true,
            futureTrips: true,
        }
    }
    render() {
        return (
            <div>
                  {/* Past Trips Switch */}
                <div className="switch">
                    <label>
                    Off
                    <input type="checkbox"/>
                    <span className="lever"></span>
                    On
                    </label>
                </div>

                {/* Future Trips Switch */}
                <div className="switch">
                    <label>
                    Off
                    <input type="checkbox"/>
                    <span className="lever"></span>
                    On
                    </label>
                </div>


                
            </div>
        )
    }
}
