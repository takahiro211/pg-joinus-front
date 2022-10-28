import * as React from "react";
import withRoot from "../withRoot";
import ProductCategories from "./modules/views/ProductCategories";

function Projects() {
  return (
    <React.Fragment>
      <ProductCategories />
    </React.Fragment>
  );
}

export default withRoot(Projects);
