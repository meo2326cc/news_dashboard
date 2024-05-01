import {useState } from 'react'
import { Button , Heading , Container ,  useColorModeValue , Box , theme , Text , Image , Card, Tag , Tab , Tabs , TabList , TabPanels , TabPanel , Tooltip as CharkaTooltip } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { Nav } from '../components/Nav'
import '../../node_modules/aos/dist/aos.css'
import bgWhite from "../images/hero_white.jpg"
import bgBlack from "../images/hero_black.jpg"
import dashboardBlack from "../images/dashboard_black.png"
import dashboardWhite from "../images/dashboard_white.png"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  resizeTo,
);


function Homegage () {
  

  return(<>
    <Nav/>  
    <Hero/>
    <Intro/>
    <Keywords/>
    <Feature/>
    <Register/>
    <Footer/>
  </>)
}

function Hero() {
  
  const linearGradient = { normal: 'linear-gradient(90deg, rgba(255,255,255,1) 30%, rgba(255,255,255,0.5) 65%, rgba(255,255,255,0) 100%)' ,
  dark: 'linear-gradient(90deg, rgba(26,32,44,1) 30%, rgba(26,32,44,0.5) 65%, rgba(26,32,44,0) 100%)'  }
  const colorMode = useColorModeValue( linearGradient.normal , linearGradient.dark )
  const switchPic = useColorModeValue( bgWhite , bgBlack )
  const switchDashPic = useColorModeValue(dashboardWhite ,dashboardBlack )
  const boxShadow = useColorModeValue( '4px 4px 12px #b5b5b5' , '4px 4px 12px #141414' )

  return (
    <>
    <Box overflow='hidden' borderBottomWidth='1px' position='relative' > 
    <Container display='flex' alignItems='center' maxW={{base:theme.sizes.container.lg, xl:theme.sizes.container.xl}} py={theme.sizes[32]}>     
      <Box width={{base:'100%', md:'60%'}}>
      <Heading size='2xl' as='h2' mb={4}>蒐集資訊</Heading>
      <Heading mb='8' size='2xl' as='h1'>必備的新聞動態牆</Heading>
      <Link to='/login'><Button colorScheme='yellow' letterSpacing='2px' px='8'>馬上開始</Button></Link>    
      </Box>
      <Card transform='perspective(1300px) rotateY(-10deg) scaleX(1.05)' left='-50px' display={{base:'none', md:'block'}} width='40%' boxShadow={boxShadow} overflow='hidden'><Image alt='新聞動態牆' src={switchDashPic}/></Card>     
    </Container>

    <Box zIndex='-1' opacity='0.6' position='absolute' top='0' bottom='0' left='0' right='0' backgroundPosition='center' backgroundSize='cover' backgroundImage={`url(${switchPic})`}>
      <Box height='100%' background={colorMode}> </Box>
    </Box>
    </Box>
    </> 
  )
}

function Intro() {
  const switchPic = useColorModeValue( bgWhite , bgBlack )
  return(<Box borderBottomWidth='1px'>
        <Container maxW={{base:theme.sizes.container.lg, xl:theme.sizes.container.xl}} py='32'>
          <Heading textAlign='center' as='h2'mb='4' >瀏覽各家媒體政治版面，這一站就夠了</Heading>
          <Text textAlign='center' mb='6'>匯集各家新聞政治版面，翻找新聞不必每次都手忙腳亂，這邊幫您都整理好，圖卡式排版無論電腦還是手機都沒問題！</Text>
          <Image alt='瀏覽新聞動態' m='auto' src={switchPic} />
    </Container>
  </Box>)
}

function Feature () {
  const switchDashPic = useColorModeValue(dashboardWhite ,dashboardBlack )
  const boxShadow = useColorModeValue( '3px 3px 8px #b5b5b5' , '3px 3px 8px #141414' )
  const [tabIndex, setTabIndex] = useState(0)
  const dataSet = [ {name:'關鍵字搜尋', text:'使用搜尋功能即可一次從各大新聞版面尋找具有特定關鍵字的新聞，哪家新聞報導最多次，馬上就知道，輿情分析的好幫手。'} , {name:'儲存 / 備忘', text:'將有意思的新聞報導存在標記清單，要記備忘也沒問題！'} , {name:'關鍵字分析', text:'整理出各家媒體關鍵字出現的佔比，掌握熱門趨勢，快速關鍵字標籤讓您馬上連結到各家媒體相關新聞！'} , {name:'個人化面板', text:'各家媒體的動態牆，可通過設定功能自行切換顯示與折疊。'}]

  return(<Box borderBottomWidth='1px'>
        <Container maxW={{base:theme.sizes.container.lg, xl:theme.sizes.container.xl}} pt='32' pb='16' >
          <Heading textAlign='center' as='h2'mb='20' >專為個人打造的特色功能</Heading>

          <Card position='relative' margin='auto' maxW='660px' boxShadow={boxShadow} overflow='hidden'>
            <Image alt='儀表板功能' src={switchDashPic}/>
            <CharkaTooltip label={dataSet[0].text}>
            <Tag boxShadow={boxShadow} colorScheme={tabIndex === 0 ? 'yellow' : 'gray' } position='absolute' right='25%' top='1.5%' size={{base:'sm' , md:'md'}} variant='solid'>{dataSet[0].name}</Tag>              
            </CharkaTooltip>
            <CharkaTooltip label={dataSet[1].text}>
            <Tag boxShadow={boxShadow} colorScheme={tabIndex === 1 ? 'yellow' : 'gray' } position='absolute' left='10%' top='5%' size={{base:'sm' , md:'md'}} variant='solid'>{dataSet[1].name}</Tag>
            </CharkaTooltip>
            <CharkaTooltip label={dataSet[2].text}>
            <Tag boxShadow={boxShadow} colorScheme={tabIndex === 2 ? 'yellow' : 'gray' } position='absolute' right='10%' top='19%' size={{base:'sm' , md:'md'}} variant='solid'>{dataSet[2].name}</Tag>              
            </CharkaTooltip>
            <CharkaTooltip label={dataSet[3].text}>
            <Tag boxShadow={boxShadow} colorScheme={tabIndex === 3 ? 'yellow' : 'gray' } position='absolute' left='40%' bottom='30%' size={{base:'sm' , md:'md'}} variant='solid'>{dataSet[3].name}</Tag>              
            </CharkaTooltip>

          </Card>
  <Tabs onChange={(index) => setTabIndex(index)} margin='auto' maxW='800px' mt='10' colorScheme='yellow' isFitted>
    <TabList>
      {dataSet.map( ( item , index )=> <Tab key={index}>{item.name}</Tab> ) }
    </TabList>

    <TabPanels my='10'>
      {dataSet.map( ( item , index )=> { return <TabPanel key={index} height='80px'>
        <Text>{item.text}</Text>
      </TabPanel>} )}
    </TabPanels>
</Tabs>
    </Container>
  </Box>)
}

function Register () {
return(
<>
  <Box borderBottomWidth='1px' position='relative'>
  <Container textAlign='center' maxW={{base:theme.sizes.container.lg, xl:theme.sizes.container.xl}} py={theme.sizes[32]}>
    <Heading mb='4' as='h2'>開始使用，完全免費</Heading>
    <Text mb='4'>僅需填寫帳號密碼註冊即可開始！</Text>
  <Link to='/login'><Button colorScheme='yellow' letterSpacing='2px' px='8'>馬上開始</Button></Link>  
  </Container>
  </Box>
  </>  )

}

function Keywords () {

  const chartFonts = useColorModeValue( '#000' , 'white' )
  ChartJS.defaults.color = chartFonts;
  const options = {
      plugins: {
      title: {
          display: false,
          text: '關鍵字分析 TOP 10',
      },
      },
      responsive: true,
      maintainAspectRatio:false,
      scales: {
      x: {
          stacked: true,
      },
      y: {
          stacked: true,
      },
      },
  };
  const chartData = {
    labels:['柯文哲', '缺電' ,'賴清德' , '中國' , '傅崐萁' , '開放' , '烏克蘭' ,'不起訴' ,'馬祖' ,'福建'] ,
    datasets: [
      {
        label: '自由時報',
        data: [3,2,1,2,2,1,2,1,0,1]  ,
        backgroundColor: theme.colors.pink[500],
      },
      {
        label: '中央社',
        data: [3,2,1,1,0,1,1,1,1,0] ,
        backgroundColor: theme.colors.cyan[300],
      },
      {
        label: '華視',
        data: [2,2,3,1,2,1,0,1,1,1] ,
        backgroundColor: theme.colors.blue[400],
      },
    ],
  };

  return(<Box borderBottomWidth='1px'>
      <Container maxW={{base:theme.sizes.container.lg, xl:theme.sizes.container.xl}} py={theme.sizes[48]}>
          <Heading  as='h2'mb='4' >關鍵字分析，熱門焦點一目瞭然</Heading>
          <Text  mb='20'>除此之外，我們還將各大新聞標題分析出重複關鍵字，並整理出各家媒體關鍵字出現的佔比，讓您馬上掌握最新的熱門話題，並且可以直接找到關鍵字對應的新聞，助您分析媒體風向。</Text>
          <Box ><Bar options={options} data={chartData} height='300px' /></Box>
    </Container>

  </Box>)
}

function Footer() {
  const bg = useColorModeValue( theme.colors.yellow[400] , theme.colors.yellow[200] )
  return (<Box borderTop='2px' borderColor={bg}>
  <Container maxW={{base:theme.sizes.container.lg, xl:theme.sizes.container.xl}} py={theme.sizes[8]}>
  <Text textAlign='center' >2024 © news-dashboard</Text>
</Container>

</Box>)
}

export default Homegage
