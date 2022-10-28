import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "./modules/components/Typography";
import withRoot from "../withRoot";
import { Labels } from "../utils/Consts";
import ProductCategories from "./modules/views/ProductCategories";

function MyPage() {
  const terms = "terms";
  return (
    <React.Fragment>
      <Container>
        <Box sx={{ mt: 7, mb: 12 }}>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            {Labels.MY_PAGE}
          </Typography>
          こんにちは。logged in.
        </Box>
      </Container>
      <ProductCategories />
    </React.Fragment>
  );
}

export default withRoot(MyPage);
