import { useState } from 'react'
import { Button , Heading , Container , useColorMode , useColorModeValue , Box , theme } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { Nav } from '../components/Nav'



function Homepage() {

  return (
    <>
    <Nav/>
    <Container maxW={{base:theme.sizes.container.lg, xl:theme.sizes.container.xl}} py={theme.sizes[48]}>
      <Heading size='2xl' as='h2' mb={4}>蒐集資訊</Heading>
      <Heading mb='8' size='2xl' as='h1'>必備的新聞動態牆</Heading>
      <Link to='/login'><Button colorScheme='yellow'>馬上開始</Button></Link>
    </Container>

    </> 
  )
}

export default Homepage
