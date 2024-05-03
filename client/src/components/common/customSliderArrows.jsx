import { LiaAngleLeftSolid, LiaAngleRightSolid } from "react-icons/lia";

/*===========================================*/
/*===========================================*/
/*===========================================*/

export const RightArrow = ({ onClick, ...rest }) => {
  return (
    <div className="prev-slick-arrow" onClick={() => onClick()}>
      <LiaAngleLeftSolid />
    </div>
  );
};

export const LeftArrow = ({ onClick, ...rest }) => {
  return (
    <div className="next-slick-arrow" onClick={() => onClick()}>
      <LiaAngleRightSolid />
    </div>
  );
}; 