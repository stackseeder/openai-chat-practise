import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userCheckTkn } from "../api/user.api"
import Loading from "./Loading";
import { Box, Typography, Container } from "@mui/material";
import Header from "./Header.jsx"


const AuthRoute = (props) => {
  const navigate = useNavigate();
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      setIsLoading(true);

      const { response, err } = await userCheckTkn();

      if(err){
        localStorage.removeItem("tkn");
        setIsLoading(false);
      }

      if(response) navigate("/")
    }

    const tkn = localStorage.getItem("tkn");

    if(tkn) checkToken();
    else setIsLoading(false);
  }, [navigate]);

  return (
    isLoading ? (
      <Loading />
    ): (
      <Container
        component="main"
        maxWidth="md"
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Header>
          <Typography variant="h5" fontWeight="600">
            AI Chat
          </Typography>
        </Header>

        <Box width="100%">
          {props.children}
        </Box>
        </Box>
      </Container>
    )
  )
}

export default AuthRoute