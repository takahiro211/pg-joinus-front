import { Hidden, Paper, Skeleton } from "@mui/material";

function ProjectDetailSkeleton() {
  return (
    <>
      <Hidden mdDown>
        <Skeleton
          component={Paper}
          animation="wave"
          variant="rectangular"
          sx={{ minWidth: 10, mt: 2, mb: 2 }}
          style={{ marginRight: 12, marginLeft: 12 }}
          height={82}
        />
      </Hidden>
      <Hidden mdUp>
        <Skeleton
          component={Paper}
          animation="wave"
          variant="rectangular"
          sx={{ minWidth: 10, mt: 2, mb: 2 }}
          style={{ marginRight: 12, marginLeft: 12 }}
          height={116}
        />
      </Hidden>
    </>
  );
}

export default ProjectDetailSkeleton;
