import { useState } from 'react'
import { Button , Heading , Container , useColorMode , useColorModeValue , Box , theme } from '@chakra-ui/react'
import { Nav } from '../components/Nav'



function Homepage() {

  return (
    <>
    <Nav/>
    <Container maxW={{base:theme.sizes.container.lg, xl:theme.sizes.container.xl}} py={theme.sizes[48]}>
      <Heading size='2xl' as='h2' mb={4}>蒐集資訊</Heading>
      <Heading size='2xl' as='h1'>必備的新聞動態牆</Heading>
    </Container>

    </> 
  )
}

export default Homepage
