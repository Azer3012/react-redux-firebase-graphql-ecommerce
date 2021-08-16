import React from "react";
import './styles.scss'
import ShopMen from "../../assets/men.jpg";
import ShopWomen from "../../assets/women.jpg";
function Directory() {
  return (
    <div className="directory">
      <div className="wrap">
        <div className="item" style={{ backgroundImage: `url(${ShopWomen})` }}>
            <a>Shop Women</a>
        </div>
        <div className="item" style={{ backgroundImage: `url(${ShopMen})` }}>
            <a>Shop Men</a>
        </div>
      </div>
    </div>
  );
}

export default Directory;
