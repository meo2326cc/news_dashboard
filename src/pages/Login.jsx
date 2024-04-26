import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Container,
  theme,
  Alert,
  AlertIcon,
  Link as ChakraLink
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { supportDvh } from "../components/layout/support.js"

function Login() {

  const navigate = useNavigate();

  useEffect(()=>{
    const validation = document.cookie.split(';').map(i => i.trim() ).find((row) => row.startsWith('info='))?.split('=')[1];
    if(  typeof validation === 'string' && validation !== '' ){ navigate("/dashboard") }
  },[])

  return (
    <Box style={supportDvh()}>
      <Link to="/">
        <Heading as="h2" size="md" p="4">
          {" "}
          news-dashboard{" "}
        </Heading>
      </Link>
      <Container
        position="absolute"
        top="0"
        bottom="0"
        left="0"
        right="0"
        display="flex"
        alignItems="center"
        maxWidth={theme.sizes.md}
      >
        <LoginForm navigate={navigate} />
      </Container>
    </Box>
  );
}

function LoginForm({navigate}) {
  const dataFormat = { username: "", password: "" };
  
  const [form, setForm] = useState(dataFormat);
  const [error, handleError] = useState();
  const [btnStatus, setBtnStatus] = useState(false);
  const buttonStatus = useRef(null);

  const submitForm = async (e) => {
    e.preventDefault();
    setBtnStatus(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_PATH_BASE_URL}/user/login`,
        form
      );
      document.cookie = `info=${data.token}`;
      axios.defaults.headers.common['Authorization'] = data.token
      navigate("/dashboard");

    } catch (error) {
      handleError(error?.response.data);
    } finally {
      setBtnStatus(false);
    }
  };

  return (
    <Card w="100%">
      <CardHeader>
        <Heading size="md">登入</Heading>
      </CardHeader>
      <CardBody>
        {error ? <AlertBox msg={error} /> : null}

        <form onSubmit={submitForm}>
          <FormControl mb="4">
            <FormLabel>使用者帳號</FormLabel>
            <Input
              type="text"
              onChange={(e) => {
                setForm({ ...form, username: e.target.value });
              }}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>密碼</FormLabel>
            <Input
              type="password"
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
              }}
            />
          </FormControl>
          <Box display='flex' alignItems='center' mt="2">
          <Button
            isLoading={btnStatus}
            ref={buttonStatus}
            me='4'
            px="4"
            type="submit"
            colorScheme="yellow"
          >
            登入
          </Button>
          <Link to='/register'><ChakraLink >註冊帳號</ChakraLink></Link>            
          </Box>

        </form>
      </CardBody>
    </Card>
  );
}

function AlertBox({ msg }) {
  return (
    <Alert status="error" mb="4" borderRadius="8">
      <AlertIcon /> {msg}
    </Alert>
  );
}

export default Login;
