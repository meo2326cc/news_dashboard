import {
  Box,
  Heading,
  Button,
  useColorMode,
  useColorModeValue,
  Container,
  theme
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function UserNav() {
  const btnBg = useColorModeValue("white", "#1a202c");
  return (
    <nav>
    <Box
      borderWidth="1px"
      display="flex"
      alignItems="center"
      justifyContent="space-between "
      p="4"
    >
      <Box display='flex' alignItems='center'>
        <Box display={{base: 'block' , md:'none' }}>
          <Button bg={btnBg}>
            <span className="material-icons-outlined">menu</span>
          </Button>
        </Box>
        <Box>
          <Heading as="h2" size="md" ms='4'>
            news-dashboard
          </Heading>
        </Box>
      </Box>

      <Box>
        <ChangeColor />
      </Box>
    </Box>      
    </nav>

  );
}


export function Nav() {
  return (
    <nav>
    <Box
      borderWidth="1px"py="4">
      <Container display="flex"alignItems="center"justifyContent="space-between "  maxW={{base:theme.sizes.container.lg, xl:theme.sizes.container.xl}}>
      <Box display='flex' alignItems='center'>
        <Box>
          <Link to='/'>
          <Heading as="h2" size="md">
            news-dashboard
          </Heading>
          </Link>
          
        </Box>
      </Box>

      <Box>
        <ChangeColor />
        <LoginBtn/>
      </Box>
      </Container>

    </Box>      
    </nav>

  );
}


function ChangeColor() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button onClick={toggleColorMode} me='4'>
      {colorMode === "light" ? (
        <span className="material-icons">dark_mode</span>
      ) : (
        <span className="material-icons">light_mode</span>
      )}
    </Button>
  );
}

function LoginBtn(){
  return ( 
  <Link to={'/login'}>
    <Button colorScheme="yellow"> 登入 / 註冊</Button>
  </Link>
  )
}

