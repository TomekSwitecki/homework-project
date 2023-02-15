import React from "react";
import divider from "../Divider/Divider.module.css"


function Divider(props) {

    if (props.type == "normal") {
        return (
            <div className={`${[`expander__${props.size}`]}`}>
                <hr className={divider.divider}></hr>
            </div>
        );
    }
    else if (props.type == "text") {
        return (
            <div className={`${[`expander__${props.size}`]}`}>
                <div className={divider.divider_text_container}>
                    <hr className={divider.divider}></hr>
                    {props.text}
                    <hr className={divider.divider}></hr>
                </div>
            </div>
        );

    }

}

export default Divider;
