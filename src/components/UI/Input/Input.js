import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    switch (props.elementType) {
        case ('input'):
            inputElement = <input {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                className={classes.InputElement} />;
            break;

        case ('select'):
            inputElement = (<select className={classes.InputElement}
                value={props.value}
                onChange={props.changed}>

                {props.elementConfig.options.map(el => {
                    return <option value={el.value}
                        key={el.value}
                    >{el.displayValue}</option>
                }
                )}
            </select>);
            break;

        default:
            inputElement = <input {...props.elementConfig}
                className={classes.InputElement}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label} > {props.label} </label>
            {inputElement}
        </div>
    );
}

export default input; 