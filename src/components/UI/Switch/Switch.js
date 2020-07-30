import React, { Component } from 'react';
import Switch from 'react-switch';

class CustomSwitch extends Component {

    render() {
        let ww = window.screen.width;
        let sizeHandle = 20;
        let widthSwitch = 40;

        if (ww < 500) {
            sizeHandle = 8;
            widthSwitch = 20;
        }

        return (

            <div>
                <label htmlFor="material-switch">
                    <Switch
                        checked={this.props.state}
                        onChange={this.props.handleChange}
                        onColor="#02A5BC"
                        onHandleColor="#fff"
                        handleDiameter={sizeHandle}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={15}
                        width={widthSwitch}
                        className="react-switch"
                        id="material-switch"
                    />
                </label>
            </div>

        );
    }
}

export default CustomSwitch;