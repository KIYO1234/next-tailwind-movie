import React, { Fragment } from "react";
import { useMediaQuery } from "react-responsive";

export const mobileThreshold = 600;
export const desktopThreshold = 1000;

const ReactResponsive = () => {
  const isMobile = useMediaQuery({
    maxWidth: mobileThreshold - 1,
  });

  const isLaptop = useMediaQuery({
    maxWidth: desktopThreshold - 1,
  });

  //   if (isMobile) {
  //     return <h1>Mobile</h1>;
  //   } else if (isLaptop) {
  //     return <h1>Laptop</h1>;
  //   } else {
  //     return <h1>Nothing</h1>;
  //   }
  return (
    <Fragment>
      {/* <h1 className="sm:hidden">Mobile</h1>
      <h1 className="hidden sm:block md:hidden">Laptop</h1>
      <h1 className="hidden md:block">Nothing</h1> */}

      {/* カスタムブレークポイント */}
      <h1 className="mobile:hidden">Mobile</h1>
      <h1 className="hidden mobile:block desktop:hidden">Laptop</h1>
      <h1 className="hidden desktop:block">Nothing</h1>
    </Fragment>
  );
};

export default ReactResponsive;
