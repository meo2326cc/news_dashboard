import {
  Box,
  Heading,
  Button,
  useColorMode,
  useColorModeValue,
  Container,
  theme,
  useDisclosure,
  Input,
  Popover,
  PopoverTrigger,
  PopoverBody,
  PopoverHeader,
  PopoverContent,
  Portal,
  List,
  ListItem,
  Switch,
  useToast
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import SidebarMobile from "./SidebarMobile";
import { useContext, useEffect, useRef, useState } from "react";
import { SearchContext } from "./searchQueryStore";
import { useMutation , useQueryClient } from "@tanstack/react-query";
import collapseType from "./collapseType";
import { useNavigate } from "react-router-dom";
import { toastSuccess } from "./ToastMsg";

export function UserNav() {
  const btnBg = useColorModeValue("white", "#1a202c");
  const { isOpen , onOpen , onClose } = useDisclosure()

  return (
    <nav>
    <Box
      borderBottomWidth='1px'
      display="flex"
      alignItems="center"
      justifyContent="space-between "
      p="4"
    >
      <Box display='flex' alignItems='center'>
        <Box display={{base: 'block' , md:'none' }}>
          <Button onClick={onOpen} bg={btnBg} >
            <span className="material-icons-outlined">menu</span>
          </Button>
        </Box>
        <Box>
          <Heading as="h2" size='md' display={{base:'none' , md:'block'}} ms='4'>
            news-dashboard
          </Heading>
        </Box>
      </Box>

      <Box display='flex'>
        <Search/>
        <Setting />
      </Box>
    </Box>   
    <SidebarMobile isOpen={isOpen} onClose={onClose} />   
    </nav>

  );
}


export function Nav() {
  const btnBg = useColorModeValue("white", "#1a202c");
  return (
    <nav style={{position:'sticky', width:'100%',top:0 , backgroundColor:btnBg }}>
    <Box
      borderBottomWidth='1px' py="4">
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
        <ChangeColorHp />
        <LoginBtn/>
      </Box>
      </Container>

    </Box>      
    </nav>

  );
}

function CollapseTypeBtn({name}) {

const [ Ischecked , setIschecked ] = useState( handleCollapseStatus( collapseType , name ) )
  
function handleCollapseStatus ( fn , newsName ) {
  const value = fn(newsName)
  if( value === undefined ){ return true }
  if( value === "0" ){return  true }
  if( value === "1" ){return  false }
 
}

const handleCollapseAction = ( e ) => { 
  const action = e.target.checked ; 
  document.cookie = `${name}=${action===false?1:0}`
  setIschecked( action )
}
  return (<Switch colorScheme="green" isChecked={ Ischecked } onChange={ handleCollapseAction } /> )
}


function ChangeColor() {
  const { colorMode ,toggleColorMode } = useColorMode();

  return (<Switch colorScheme="green" isChecked={ colorMode === 'dark' ? true : false }  onChange={()=> toggleColorMode() } /> )
      
    // <Button onClick={toggleColorMode} me='4'>
    //   {colorMode === "light" ? (
    //     <span className="material-icons">dark_mode</span>
    //   ) : (
    //     <span className="material-icons">light_mode</span>
    //   )}
    // </Button>
}

function ChangeColorHp() {
  const { colorMode ,toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode} me='4'>
      {colorMode === "light" ? (
        <span className="material-icons">dark_mode</span>
      ) : (
        <span className="material-icons">light_mode</span>
      )}
    </Button>    
  )
      

}


function Setting () {
  return (
    <Popover placement='bottom-end' size='sm'>
  <PopoverTrigger>
    <Button><Box verticalAlign='bottom' as="span"  className="material-icons">settings</Box></Button>
  </PopoverTrigger>
  <Portal>
    <PopoverContent w='280px' mt='2' bg={useColorModeValue( 'gray.50' , 'gray.900' )}>
      <PopoverHeader>設定</PopoverHeader>
      <PopoverBody>
        <List>
          <ListItem  py='3' display='flex' alignItems='center' justifyContent='space-between'>
            <Box>深色模式：</Box><ChangeColor/>
          </ListItem>
          <ListItem  py='3' display='flex' alignItems='center' justifyContent='space-between'>
            <Box>預設顯示版面：</Box>
          </ListItem>
          <ListItem borderLeftWidth='1px' ps='4' ms='2' py='3' display='flex' alignItems='center' justifyContent='space-between'>
            <Box >自由時報</Box> <CollapseTypeBtn name={'ltn'} />
          </ListItem>
          <ListItem borderLeftWidth='1px' ps='4' ms='2' py='3' display='flex' alignItems='center' justifyContent='space-between'>
            <Box >中央社</Box> <CollapseTypeBtn name={'cna'} />
          </ListItem>
          <ListItem borderLeftWidth='1px' ps='4' ms='2' py='3' display='flex' alignItems='center' justifyContent='space-between'>
            <Box >華視</Box> <CollapseTypeBtn name={'cts'} />
          </ListItem>
          <ListItem  py='3' display='flex' alignItems='center' justifyContent='space-between'>
            <LogoutBtn/>
          </ListItem>
        </List>
      </PopoverBody>
    </PopoverContent>
  </Portal>
</Popover>
  )}

function Search () {

  const { searchQuery , setSearchQuery } = useContext(SearchContext)
  const queryClient = useQueryClient()
  const originQueryData = useRef()
  const data = {}
  data.ltnData  = queryClient.getQueryData(['ltn'])
  data.ctsData  = queryClient.getQueryData(['cts'])
  data.cnaData  = queryClient.getQueryData(['cna'])
  

  useEffect(()=>{
    if( JSON.stringify(data) !== '{}' && originQueryData.current === undefined ){
      originQueryData.current = data
    }
  },[data])

  const { mutate } = useMutation({ 
      mutationFn: ()=> { 

        const res = {}
        
        res.ltnData = originQueryData.current.ltnData.filter( item => item.title.includes(searchQuery) )
        res.ctsData = originQueryData.current.ctsData.filter( item => item.title.includes(searchQuery) )
        res.cnaData = originQueryData.current.cnaData.filter( item => item.title.includes(searchQuery) )

        return res
      }, 
      onSuccess : (res) => { 
      queryClient.setQueryData( ["ltn"] , res.ltnData ) ;
      queryClient.setQueryData( ["cts"] , res.ctsData ) ;
      queryClient.setQueryData( ["cna"] , res.cnaData ) ;
    }

  })

  return( <Box me='4'>
    <Input placeholder='搜尋' onChange={ (e)=>{ setSearchQuery( e.target.value ) ; mutate() } } />
  </Box> )
}

function LoginBtn(){
  return ( 
  <Link to={'/login'}>
    <Button colorScheme="yellow"> 登入 / 註冊</Button>
  </Link>
  )
}

function LogoutBtn(){
  const logout = useNavigate()
  const toast = useToast()
  const logoutProcess =()=>{ document.cookie = 'info=' ; logout('/') ; toast( toastSuccess('成功登出') ) }
  return ( 
  <Button onClick={logoutProcess} width='100%' colorScheme="red" variant='outline'> 登出 </Button>
  )
}