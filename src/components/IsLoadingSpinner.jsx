import { useColorModeValue , Center , Spinner } from "@chakra-ui/react"

export default function IsLoadingSpinner(){
    const sidebarBg = useColorModeValue( 'gray.50' , 'gray.900' )
    return(<Center bg={sidebarBg} opacity='0.8' position='absolute' top='0' bottom='0' right='0' left='0'>
    <Spinner/>
    </Center>)
  }