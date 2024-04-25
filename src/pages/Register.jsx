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
    Text
  } from "@chakra-ui/react";
  import { useRef, useState } from "react";
  import axios from "axios";
  import { Link } from "react-router-dom";
  
  function Register() {
    return (
      <Box height="100vh">
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
          <LoginForm />
        </Container>
      </Box>
    );
  }
  
  function LoginForm() {
    const dataFormat = { username: "", password: "" };
    //const navigate = useNavigate();
    const [form, setForm] = useState(dataFormat);
    const [error, handleError] = useState();
    const [btnStatus, setBtnStatus] = useState(false);
    const [ success , handleSuccess ] = useState( false )
    const buttonStatus = useRef(null);

    const submitForm = async (e) => {
      e.preventDefault();
      setBtnStatus(true);
      try {
        const { data } = await axios.post( `${import.meta.env.VITE_PATH_BASE_URL}/user/register` ,
          form
        );
        document.cookie = `info=${data.token}`;
        //navigate("/dashboard");
        handleSuccess( true )
      } catch (error) {
        handleError(error?.response.data);
      } finally {
        setBtnStatus(false);
      }
    };
  
    if ( success ) {
        return<Card w="100%">
        <CardHeader>
          <Heading size="lg" textAlign='center' mt='4'>註冊成功</Heading>
            <Box margin='auto' width='fit-content' mt='4'>
                <Box as='span'  className="material-icons" fontSize='32px'>
                    check_circle
                </Box>
            </Box>          
        </CardHeader>
        <CardBody>
          <Text textAlign='center'> 您只需要接著登入就可以使用全部功能 </Text>
          <Text textAlign='center' mt='10' mb='4'><Link to='/login' ><Button colorScheme='yellow'>登入</Button></Link></Text>
        </CardBody>
        </Card>
    
    }

    return (
      <Card w="100%">
        <CardHeader>
          <Heading size="md">註冊</Heading>
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
              註冊帳號
            </Button>
     
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
  
  export default Register;
  