import{ UserNav } from "../components/Nav"
import { Box } from "@chakra-ui/react"
import Sidebar from "../components/Sidebar.jsx"
import Articles from '../components/Articles.jsx'
import { useState , useEffect } from "react"
import {SearchContext} from '../components/searchQueryStore.js'
import { useNavigate } from "react-router-dom"
import { supportDvh } from "../components/layout/support.js"
import axios from "axios"



function Dashboard(){

    const validation = document.cookie.split(';').map( i => i.trim() ).find((row) => row.startsWith('info='))?.split('=')[1];
    axios.defaults.headers.common['Authorization'] = validation
    const navigate = useNavigate()
    const [ searchQuery , setSearchQuery ] = useState('')

    // 路由保護
    useEffect(()=>{
        if(validation === undefined  || validation === '' ){
            navigate('/')
        }
    },[validation])

    return (
    <SearchContext.Provider value={ {searchQuery , setSearchQuery} }>
    <Box style={supportDvh()}>
    <UserNav/>
    <Box display='flex' position='absolute' top='74px' bottom='0' left='0' right='0' >
        <Sidebar displayOnMobile={'none'}/>
        <Articles/>
    </Box> 
    </Box>
    </SearchContext.Provider>
)
}


export default Dashboard