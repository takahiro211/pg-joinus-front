import { Paper, Skeleton } from "@mui/material";

function MyPageSkeleton() {
  return (
    <Skeleton
      component={Paper}
      animation="wave"
      variant="rectangular"
      sx={{ minWidth: 10, mt: 2, mb: 2 }}
      style={{ marginRight: 12, marginLeft: 12 }}
      height={116}
    />
  );
}

export default MyPageSkeleton;
