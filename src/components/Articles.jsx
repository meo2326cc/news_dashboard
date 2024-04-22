import { Box , Wrap , WrapItem , Card , CardBody, Button ,Tooltip, Link as ChakraLink , Accordion ,AccordionItem , AccordionButton , AccordionIcon ,AccordionPanel, Heading , Skeleton , useDisclosure , useToast } from "@chakra-ui/react"
import { useGetLtn } from "../hooks/useGetLtn"
import { useGetCna } from "../hooks/useGetCna"
import { useGetCts } from "../hooks/useGetCts"
import Modal from "./Modal"
import { toastSuccess } from "./ToastMsg"
import IsLoadingSpinner from "./IsLoadingSpinner"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
export default function Articles() {

    return(<Box overflow="auto" width='100%'>
    <ArticleBox name={'自由時報'} />
    <ArticleBox name={'中央社'} />
    <ArticleBox name={'華視'} />

    </Box>)
}

function ArticleBox({ name }) {

let component = undefined;

  switch(name){
    case '自由時報' : component = <Item hook={useGetLtn}/>
    break
    case '中央社' : component = <Item hook={useGetCna}/>
    break
    case '華視' : component = <Item hook={useGetCts}/>
    break
  }

  return (
    <Box overflow="auto" width="100%">
      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem border="0">
          <AccordionButton pt="6" pb="4">
            <Heading as="h3" size="md">
              {name}
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb='4'>
            {component}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}

function Skeletons () {

    return Array.from({ length: 4 }, (_, index) => (
        <WrapItem key={index}>
          <Card width='280px' height='fit-content'>
            <Skeleton height='128px' />
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
      onSettled: (data)=>{ 
        loadingArrController( data[1] , false )
        toast(toastSuccess('新增標記清單成功'))
      }
    })
    const validation = document.cookie.split(';').find((row) => row.startsWith('info='))?.split('=')[1];
    const { data , isPending } = hook(validation)
    const [ select , setSelect ] = useState({  reqType:'' , listType:'' , data : {title:'' , url: '' , note:'' } })

    
    if (isPending) {
        return <Wrap>
                <Skeletons/>
               </Wrap>
    }

    return(<>
        <Wrap>
        { data.map( (item , index ) => {
        return <WrapItem key={ index } position='relative'>
                    <Card width='280px' height='fit-content' >
                        <CardBody>
                            <Tooltip label={item.title}>
                                <ChakraLink fontWeight='bold' href={item.url} target="_blank">{item.title.length > 26 ?  item.title.slice(0 , 26)+'...' : item.title  }</ChakraLink>
                            </Tooltip>
                            <Box mt='4'>
                                <Button onClick={()=>{ mutateAsync({ data:{ title:item.title , url: item.url , note:'' } , index:index } )}} minWidth='0' height='0' py='0' px='0'><Box as='span' className="material-icons" verticalAlign='bottom' fontSize='md'>star</Box></Button>
                                <Button onClick={()=>{
                                    setSelect( { listType:'editList' , reqType:'post' , data:{ title:item.title , url:item.url , note:'' }})
                                    status.onOpen()
                                 }} minWidth='0' height='0' padding='0'><Box as='span' className="material-icons" verticalAlign='bottom' fontSize='md' ms='4'>edit</Box></Button>
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

