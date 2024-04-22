import{ UserNav } from "../components/Nav"
import { Box } from "@chakra-ui/react"
import Sidebar from "../components/Sidebar.jsx"
import Articles from '../components/Articles.jsx'
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useGetData } from "../hooks/useGetData"
import axios from "axios"


function Dashboard(){

    const validation = document.cookie.split(';').find((row) => row.startsWith('info='))?.split('=')[1];
    axios.defaults.headers.common['Authorization'] = validation
    const navigate = useNavigate()
    const { data, isPending } = useGetData()
    // 路由保護
    useEffect(()=>{
        if(validation === undefined){
            navigate('/')
        }
    },[])

    return (<Box height='100vh'>
    <UserNav/>
    <Box display='flex' position='absolute' top='74px' bottom='0' left='0' right='0' >
        <Sidebar/>
        <Articles/>
    </Box> 
    </Box>
)
}


export default Dashboard