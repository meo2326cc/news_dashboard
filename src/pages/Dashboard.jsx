import{ UserNav } from "../components/Nav"
import { Box } from "@chakra-ui/react"
import Sidebar from "../components/Sidebar.jsx"
import Articles from '../components/Articles.jsx'
import { useState , useEffect , useRef } from "react"
import {SearchContext} from '../components/searchQueryStore.js'
import { useNavigate } from "react-router-dom"
import { useQueryClient , useMutation } from "@tanstack/react-query"
import { supportDvh } from "../components/layout/support.js"
import axios from "axios"



function Dashboard(){

    const validation = document.cookie.split(';').map( i => i.trim() ).find((row) => row.startsWith('info='))?.split('=')[1];
    axios.defaults.headers.common['Authorization'] = validation
    const navigate = useNavigate()
    const originQueryData = useRef()
    const [ search , setSearch ] = useState('')
    const queryClient = useQueryClient()
    
    const data = {}
    data.ltnData  = queryClient.getQueryData(['ltn'])
    data.ctsData  = queryClient.getQueryData(['cts'])
    data.cnaData  = queryClient.getQueryData(['cna'])

      const { mutate } = useMutation({ 
          mutationFn: (value)=> { 
            console.log('mutate')
            const res = {}
            res.ltnData = originQueryData.current.ltnData.filter( item => item.title.includes(value) )
            res.ctsData = originQueryData.current.ctsData.filter( item => item.title.includes(value) )
            res.cnaData = originQueryData.current.cnaData.filter( item => item.title.includes(value) )
            
            return res
          }, 
          onSuccess : (res) => { 
          queryClient.setQueryData( ["ltn"] , res.ltnData ) ;
          queryClient.setQueryData( ["cts"] , res.ctsData ) ;
          queryClient.setQueryData( ["cna"] , res.cnaData ) ;
        }
    
      })

    // 路由保護
    useEffect(()=>{
        if(validation === undefined  || validation === '' ){
            navigate('/')
        }

        if( JSON.stringify(data) !== '{}' && originQueryData.current === undefined ){
            originQueryData.current = data
          }


    },[validation , data])

    // useEffect(()=>{
    //     if( JSON.stringify(data) !== '{}' && originQueryData.current === undefined ){
    //       originQueryData.current = data
    //     }
    //   },[data])

    return (
    <SearchContext.Provider value={ {mutate , setSearch , search } }>
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