import {
    Textarea,
    Text,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    Button,
    useToast,
    Link as ChakraLink,
  } from '@chakra-ui/react'
  import { useMutation , useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toastSuccess ,toastError } from './ToastMsg'

  export default function Modal({status , select }) {
    const queryClient = useQueryClient()
    const [ note , setNote ] = useState({title:'' , url:'' , note:select.data.note })
    const { isOpen, onClose } = status
    const toast = useToast()
    const formSub = async()=>{
      try{
        if ( select.reqType === 'post' ) { return axios.post( import.meta.env.VITE_PATH_BASE_URL + '/user/userdata/' + select.listType  , {"data":note}) }
        if ( select.reqType === 'put' ) { return axios.put( import.meta.env.VITE_PATH_BASE_URL + '/user/userdata/' + select.listType  , {"data":{...note , id:select.data.id}})  }
        
      }catch(error){
        console.log(error)
      }
      
    }
    const { mutateAsync } = useMutation({
      mutationFn: formSub ,
      onSuccess: ()=>{ queryClient.invalidateQueries({queryKey:["todos"]}) },
      onError:()=>{ toast( toastError( '新增編輯清單失敗' ) ) },
      onSettled: ()=>{ toast( toastSuccess( '新增編輯清單成功' ) ) }
    })

    useEffect(()=>{
      setNote({note:select.data.note , title:select.data.title , url: select.data.url })
    },[select])

    return (
      <>
        <Drawer
          isOpen={isOpen}
          placement='right'
          size='sm'
        >
          <DrawerOverlay />
          <DrawerContent>
          <DrawerHeader>{select.data.title}</DrawerHeader>
            <DrawerBody>
              <Text mb='6'>新聞連結：<ChakraLink href={select.data.url} target='_blank'>{select.data.url} </ChakraLink></Text>
              <Textarea value={note.note} onChange={(e)=>setNote({...note , note:e.target.value })} size='lg' rows='15'/>
            </DrawerBody>
  
            <DrawerFooter>
              <Button variant='outline' mr={3} onClick={onClose}>
                取消
              </Button>
              <Button onClick={()=>{mutateAsync() ; onClose() }} colorScheme='blue'>保存</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }