import React from "react";
import styles from "../FlexContainer/FlexContainer.module.css"


function FlexContainer({ props,children }) {
  return (
      
    <div className={`${styles.flex_container} ${styles[`align_${props.align}`]} ${styles[`height_${props.height}`]} ${styles[`direction_${props.direction}`]} ${styles[`gap_${props.gap}`]}  ${styles[`margin_${props.margin}`]}`}>
        {children}
    </div>
  );
}

export default FlexContainer;






