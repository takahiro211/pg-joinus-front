import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Container,
  Divider,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import * as React from "react";
import { RepositoryFactory } from "../../../../api/RepositoryFactory";
import withRoot from "../../../../withRoot";
import TableSkeleton from "../../skeleton/TableSkeleton";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Labels } from "../../../../utils/Consts";
import { DateFormat } from "../../../../utils/Util";
import { UsersEntity } from "../../../../api/entities/response/UsersEntity";
import FaceIcon from "@mui/icons-material/Face";

function Follower() {
  const [users, setUsers] = React.useState<UsersEntity[]>([]);
  const [page, setPage] = React.useState(1);
  const [totalPageCount, setTotalPageCount] = React.useState(0);
  const [searchParams] = useSearchParams();
  const paramPageNum: number = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 0;
  const navigate = useNavigate();

  React.useEffect(() => {
    userResponse(paramPageNum);
  }, []);

  // API
  const userRepository = RepositoryFactory.get("follower");
  const userResponse = async (argPageNum: number) => {
    try {
      const { data } = await userRepository.users(argPageNum);
      setUsers(data.data);
      setTotalPageCount(data.last_page);
      setPage(data.current_page);
    } catch (e) {
      console.log("ユーザーの一覧を取得できませんでした。");
    }
  };

  const handlePageCange = (page: number) => {
    navigate("/users/following?page=" + page);
    userResponse(page);
    window.scrollTo(0, 0);
  };

  return (
    <React.Fragment>
      <Box
        component={Paper}
        elevation={0}
        sx={{
          p: 1,
          m: 1,
          backgroundColor: "#FCFCFC",
        }}
      >
        <Typography sx={{ ml: 1, mt: 1 }}>フォロワーリスト</Typography>
        <Container sx={{ mt: 4 }}>
          {users.length > 0 ? (
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                {users.map((user, index) => (
                  <>
                    <Card
                      sx={{ minWidth: 10, mt: 2, mb: 2 }}
                      style={{ marginRight: 12, marginLeft: 12 }}
                      elevation={0}
                    >
                      <CardActionArea
                        component={Link}
                        to={"/user-posts/" + user.id}
                      >
                        <CardContent>
                          <Stack
                            justifyContent="center"
                            alignItems="center"
                            spacing={1}
                          >
                            <Chip
                              label={
                                DateFormat(user.created_at) + " にフォロー"
                              }
                            />
                          </Stack>
                          <Stack
                            justifyContent="center"
                            alignItems="center"
                            direction="row"
                            spacing={2}
                            sx={{ mt: 2 }}
                          >
                            <FaceIcon sx={{ mr: 1 }} />
                            {user.name}
                          </Stack>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                    {users.length - 1 > index ? <Divider sx={{ m: 1 }} /> : ""}
                  </>
                ))}
              </Table>
            </TableContainer>
          ) : (
            <>
              <TableSkeleton />
              <TableSkeleton />
              <TableSkeleton />
              <TableSkeleton />
              <TableSkeleton />
            </>
          )}
        </Container>
        <Box
          textAlign="center"
          sx={{
            mt: 4,
            mb: 4,
          }}
        >
          <Stack alignItems="center">
            <Pagination
              count={totalPageCount}
              color="secondary"
              onChange={(e, page) => handlePageCange(page)}
              page={page}
            />
          </Stack>
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default withRoot(Follower);
