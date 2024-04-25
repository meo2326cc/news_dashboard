import { Box } from "@chakra-ui/react"



function FullPage({children}){


    return(<Box display='flex' justifyContent='center' alignItems='center'>
        {children}
        </Box>)
}

export default FullPage