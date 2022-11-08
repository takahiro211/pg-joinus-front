import { Paper, Skeleton } from "@mui/material";

function TableSkeleton() {
  return (
    <>
      <Skeleton
        component={Paper}
        animation="wave"
        variant="rectangular"
        sx={{ minWidth: 10, mt: 1 }}
        height={82}
      />
    </>
  );
}

export default TableSkeleton;
