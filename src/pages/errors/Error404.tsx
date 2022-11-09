import { Stack } from "@mui/system";
import React from "react";

/**
 * 404
 */
function Error404() {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      textAlign={"center"}
      sx={{ mt: 4, mb: 18 }}
    >
      <div>
        <h2 style={{ fontSize: 100, fontWeight: "bold" }}>404</h2>
        <p style={{ fontSize: 28, fontWeight: "bold" }}>
          ページが見つかりません。
        </p>
      </div>
    </Stack>
  );
}

export default Error404;
