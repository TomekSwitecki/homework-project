import React from "react";
import flexContainer from "../FlexContainer/FlexContainer.module.css"


function FlexContainer({ props,children }) {
  return (
      
    <div className={`${flexContainer.flex_container} ${flexContainer[`align_${props.align}`]} ${flexContainer[`height_${props.height}`]} ${flexContainer[`direction_${props.direction}`]} ${flexContainer[`gap_${props.gap}`]}  ${flexContainer[`margin_${props.margin}`]}`}>
        {children}
    </div>
  );
}

export default FlexContainer;






