import React, { Component } from 'react'

export default class tripToggle extends Component {
    constructor(props){
        super(props)
        this.state = {
            
        }
    }

    

    render() {
        const {past, future, changePast, changeFuture} = this.props
        return (
            <div>
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
                <p>


                </p>
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
        )
    }
}
