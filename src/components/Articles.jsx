import { Box , Wrap , WrapItem , Card , CardBody, Button ,Tooltip, Link as ChakraLink , Accordion ,AccordionItem , AccordionButton , AccordionIcon ,AccordionPanel, Heading , Skeleton , useDisclosure , useToast , Text, Container , theme } from "@chakra-ui/react"
import { useGetLtn } from "../hooks/useGetLtn"
import { useGetCna } from "../hooks/useGetCna"
import { useGetCts } from "../hooks/useGetCts"
import Modal from "./Modal"
import { toastError, toastSuccess } from "./ToastMsg"
import IsLoadingSpinner from "./IsLoadingSpinner"
import { useState , useContext } from "react"
import { SearchContext } from "./searchQueryStore.js"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import collapseType from "../components/collapseType.js"
import { Analysis } from "./Analysis.jsx"

export default function Articles() {
  const { search } = useContext(SearchContext);
  return (
    <Box overflow="auto" width="100%">
      <Box display={search === "" ? "block" : "none"}>
        <ArticleBox name={"關鍵字分析"}>
          <Analysis />
        </ArticleBox>
      </Box>
      <ArticleBox name={"自由時報"}>
        <Item hook={useGetLtn} />
      </ArticleBox>
      <ArticleBox name={"中央社"}>
        <Item hook={useGetCna} />
      </ArticleBox>
      <ArticleBox name={"華視"}>
        <Item hook={useGetCts} />
      </ArticleBox>
    </Box>
  );
}

function ArticleBox({ name , children  }) {

  //console.log(collapseType(name) === undefined ? 0 : collapseType(name) )

  return (
    <Container maxW={{base:theme.sizes.container.lg, xl:'1440px'}}>
    <Box overflow="auto" width="100%">
      <Accordion defaultIndex={[Number(collapseType(name) === undefined ? 0 : collapseType(name)) ]} allowMultiple>
        <AccordionItem border="0">
          <AccordionButton pt="6" pb="4">
            <Heading as="h3" size="md">
              {name}
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb='4'>
            {children}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
   </Container> 
  );
}

function Skeletons () {

    return Array.from({ length: 4 }, (_, index) => (
        <WrapItem key={index} position='relative' width={{base:'100%' , md:'fit-content'}}>
          <Card width={{base:'100%' , md: '280px'}} height='fit-content'>
            <Skeleton height='136px' />
          </Card>
        </WrapItem>
      ));

}

function Item ({hook}) {
    const status = useDisclosure()
    const queryClient = useQueryClient()
    const [loading , setLoading] = useState([])
    const toast = useToast()
    const loadingArrController = function( index , boolean ) {
      const loadingArr = loading
      loadingArr[index] = boolean
      setLoading(loadingArr)
    }
    const {mutateAsync} = useMutation({
      mutationFn: async ( args )=>{
        const { data , index } = args
        loadingArrController( index , true )
        const res = await axios.post( import.meta.env.VITE_PATH_BASE_URL + '/user/userdata/favList' , {
          data:data
        } ) 
        return [ res , index ]
      },
      onSuccess: ()=> {queryClient.invalidateQueries({ queryKey: ['todos'] })},
      onError: (error)=> { toast( toastError( '新增失敗' ) ) ; console.log(error) },
      onSettled: (data)=>{
        console.log( data )
        loadingArrController( data[1] , false )
        toast(toastSuccess('新增標記清單成功'))
      }
    })
    const clickText = ( e , item )=>{
      e.preventDefault();
      setSelect( { listType:'editList' , reqType:'post', defaultIndex:0 , data:{ title:item.title , url:item.url , note:'' }});
      status.onOpen();
   }

    const addFav = ( item , index )=>{ mutateAsync({ data:{ title:item.title , url: item.url , note:'' } , index:index } )}
    const addEdit = ( item  )=>{
      setSelect( { listType:'editList' , defaultIndex:1 , reqType:'post' , data:{ title:item.title , url:item.url , note:'' }})
      status.onOpen()
   }

    const validation = document.cookie.split(';').find((row) => row.startsWith('info='))?.split('=')[1];
    const { data , isPending , error } = hook(validation)
    const [ select , setSelect ] = useState({  reqType:'' , listType:'' , defaultIndex:0 , data : {title:'' , url: '' , note:'' } })

    if( error ) {
      console.log(error)
      toast( toastError('取得資料發生錯誤' , '原因：' + error.message ) )
      return <Box> 取得資料發生錯誤 </Box>
    }
    
    if (isPending) {
        return <Wrap>
                <Skeletons/>
               </Wrap>
    }

    return(<>
        <Wrap justify={ {base:'center' , lg: 'left'} }>
        { data[0] === undefined ? <Box> 無資料 </Box> : data.map( (item , index ) => {
        return <WrapItem key={ index } position='relative' width={{base:'100%' , md:'fit-content'}} >
                    <Card width={{base:'100%' , md: '300px'}} height='136px' >
                        <CardBody display='flex' flexDirection='column' justifyContent='space-between'>
                            <Tooltip label={item.title}>
                                <ChakraLink onClick={(e)=>{ clickText( e , item ) }} fontWeight='bold' style={{display:"-webkit-box" , WebkitBoxOrient:'vertical' , WebkitLineClamp:2 , overflow:'hidden' , textOverflow:"ellipsis" }}>{item.title}</ChakraLink>
                            </Tooltip>
                            <Box display='flex' alignItems='end' justifyContent='space-between' mt='4'>
                              <Box>
                                {/* add favbtn */}
                                <Button onClick={()=>{ addFav( item , index ) }} minWidth='0' height='0' py='4' px='2'><Box as='span' className="material-icons" verticalAlign='bottom' fontSize='md'>star</Box></Button>
                                {/* add editbtn */}
                                <Button onClick={()=>{ addEdit( item , index ) }} minWidth='0' height='0' py='4' px='2' ms='4'><Box as='span' className="material-icons" verticalAlign='bottom' fontSize='md'>edit</Box></Button>                            
                              </Box>
                                  <Text color='gray' fontSize='xs'>{item.date}</Text>  
                            </Box>
                        </CardBody>
                    </Card>
                    { loading[index] === true && <IsLoadingSpinner/> }
        </WrapItem>
        } ) }
      </Wrap>
      <Modal status={status} select={select}/>
      </>)
}


