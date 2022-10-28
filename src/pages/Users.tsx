import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Markdown from "./modules/components/Markdown";
import Typography from "./modules/components/Typography";
import withRoot from "../withRoot";
import { RepositoryFactory } from "../api/RepositoryFactory";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { UsersEntity } from "../api/entities/UsersEntity";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Labels } from "../utils/Consts";
import { motion } from "framer-motion";
import { DateFormat } from "../utils/Util";

function Users() {
  const [users, setUsers] = React.useState<UsersEntity[]>([]);

  React.useEffect(() => {
    userResponse();
  }, []);

  // API
  const userRepository = RepositoryFactory.get("users");
  const navigate = useNavigate();
  const { setIsAuth } = useAuth();
  const userResponse = async () => {
    try {
      const { data } = await userRepository.users();
      setUsers(data);
      setIsAuth(true);
    } catch (e) {
      setIsAuth(false);
    }
  };

  return (
    <React.Fragment>
      <Container>
        <Box sx={{ mt: 7, mb: 12 }}>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            新着ユーザー
          </Typography>
          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>{Labels.USERS_TABEL_HEAD_USER_NAME}</TableCell>
                  <TableCell>{Labels.USERS_TABEL_HEAD_USER_EST}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {user.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {DateFormat(user.created_at)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default withRoot(Users);
