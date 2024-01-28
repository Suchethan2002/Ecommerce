import React from "react";
import styles from "../../../styles/styles";

const BackGround = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage:
          //   "url(https://images.lifestyleasia.com/wp-content/uploads/2019/04/10184146/shutterstock_1067675774.jpeg)",
          "url('https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg')",
        backgroundSize: "cover", // Set background size to cover
        backgroundPosition: "center", // Center the background image
        zIndex: -1, // Place it behind other elements
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}
        >
          Best Collection for <br /> home Decoration
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
          assumenda? Quisquam itaque <br /> exercitationem labore vel, dolore
          quidem asperiores, laudantium temporibus soluta optio consequatur{" "}
          <br /> aliquam deserunt officia. Dolorum saepe nulla provident.
        </p>
        <button className={`${styles.button} text-white pl-2`}>
          shop now
        </button>
      </div>
    </div>
  );
};
export default BackGround;
