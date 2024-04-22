import { Box } from "@chakra-ui/react"
import { useEffect } from "react"



function FullPage({children}){

    useEffect(()=>{
    //const navHeight =  document.querySelector('nav').clientHeight
    //console.log(navHeight)
},[])

    return(<Box display='flex' justifyContent='center' alignItems='center'>
        {children}
        </Box>)
}

export default FullPage