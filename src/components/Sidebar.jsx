import { useColorModeValue , Box , List , ListItem , Accordion , AccordionItem , AccordionIcon , AccordionPanel , AccordionButton , Stack , Skeleton , Text, Button, theme, Tooltip , useDisclosure ,useToast, Center } from "@chakra-ui/react"
import { useMutation , useQueryClient } from "@tanstack/react-query";
import { useGetData } from "../hooks/useGetData";
import { toastError, toastSuccess } from "./ToastMsg";
import Modal from "./Modal";
import IsLoadingSpinner from "../components/IsLoadingSpinner"
import { useContext  , createContext , useState } from "react";
import axios from "axios";

const SelectContext = createContext();

function Sidebar({displayOnMobile}){
    const sidebarBg = useColorModeValue( 'gray.50' , 'gray.900' )
    const status = useDisclosure()
    const [loading , setLoading] = useState(false)
    const [select , setSelect] = useState({  reqType:'' , listType:'' , data :{title:'' , url: '' , note:''} })
    return (<SelectContext.Provider value={{select , setSelect , status , setLoading }}>
    <Box position='relative' alignSelf='stretch' width='380px' overflow='auto' pe='4'  bg={sidebarBg} display={{base: displayOnMobile , md:'block' }}>
        <Folder/>
        { loading && <IsLoadingSpinner/>}
    </Box>
    <Modal select={select} status={status}/>
    </SelectContext.Provider>


    )
}


function Folder () {

  const { data, isPending , error } = useGetData()
  const toast = useToast()

    if (error){
      toast( toastError('載入個人資料失敗') )
      return <Center position='relative' top='50%' transform='translateY(-50%)'>連接伺服器失敗，請稍後再試</Center>
    }

    return(<Accordion defaultIndex={[0,1]} allowMultiple width='100%'>
        <AccordionItem border='0'>
          <Box>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left' py='4'>
                <Box as='span' className="material-icons" verticalAlign='bottom'>star</Box> 標記清單
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Box>
          <AccordionPanel pb={4}>
                { isPending ? <IsLoading/> : <FolderList data={data.favList} listType={'favList'}/> }
          </AccordionPanel>
        </AccordionItem >
        <AccordionItem border='0'>
          <Box>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left' py='4'>
                <Box as='span' className="material-icons" verticalAlign='bottom'>edit</Box> 編輯清單
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Box>
          <AccordionPanel pb={4}>
                { isPending ? <IsLoading/> : <FolderList data={data.editList} listType={'editList'}/> }
          </AccordionPanel>
        </AccordionItem>
      </Accordion>)
}

function FolderList({data , listType}) {
  const  { setSelect , status , setLoading }= useContext(SelectContext)
  const queryClient = useQueryClient()
  const delToast = useToast()
  const { mutateAsync } = useMutation({
    mutationFn: async (str)=>{
      setLoading(true)
      if( listType === 'favList' ){ return await axios.delete( import.meta.env.VITE_PATH_BASE_URL + '/user/userdata/favList' ,{ data:{ data: {id: str}} } ) }
      if( listType === 'editList' ){ return await axios.delete( import.meta.env.VITE_PATH_BASE_URL + '/user/userdata/editList' ,{ data:{ data: {id: str}} } ) } 
    },
    onSuccess:()=>{ 
      queryClient.invalidateQueries({queryKey:["todos"]})
      delToast(toastSuccess( '刪除成功' ) )
     },
     onError:()=>{ delToast( toastError('刪除失敗') ) },
     onSettled:()=>{
      setLoading(false)
     }
     
  })

  if( data[0] === undefined ) {
  return <Text ms='8' color='gray'> 還沒有資料 </Text>
  }
  return(
<List spacing={3}>
  {
    data.map( (item)=>{
      return(<ListItem  ms='8' key={item.id} display='flex' justifyContent='space-between' alignItems='center' >
      <Box onClick={ ()=>{setSelect({ listType:listType , reqType:'put' ,data:item }) ; status.onOpen()  } } cursor='pointer' display='flex' overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap' >
          <span className="material-icons">article</span><Tooltip label={item.title}><Text textOverflow='ellipsis' whiteSpace='nowrap' overflow='hidden'  ms='1'>{item.title }</Text>     
        </Tooltip>
      </Box>
      <Button onClick={()=> mutateAsync(item.id ) } minWidth='0' height='0' padding='0'><Box as='span' color={theme.colors.red[500]} className="material-icons"  fontSize='lg'>delete</Box></Button>
      </ListItem>)
    } )
  }

</List> 
  )
}

function IsLoading(){
    return(<Stack ps='8'>
        {Array.from( {length:3} , (_,index)=>{
          return <Skeleton key={index} height='24px'mb='1' />
        } )}
      </Stack>)
}

export default Sidebar