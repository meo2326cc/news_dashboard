import { Box , Wrap ,WrapItem , Card , CardBody , Text , useColorModeValue, Button , Center , OrderedList, ListItem , Tag, CardHeader , theme , Skeleton} from "@chakra-ui/react"
import { useGetAnalysis } from "../hooks/useGetAnalysis"
import { SearchContext } from "./searchQueryStore";
import { useContext } from "react";
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


export function Analysis () {
 const { mutate , setSearch } = useContext(SearchContext)
 const chartFonts = useColorModeValue( '#000' , 'white' )
 const { data , isPending } = useGetAnalysis()
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


if(isPending){
  return <Card position='relative'>
    <Skeleton height='536px'/>
    <Center position='absolute' top='0' bottom='0' left='0' right='0'>資料載入中...</Center>
  </Card>
}

if(data) { 
    const labels = data.map( item => item.keyWord )
    const chartData = {
        labels:labels ,
        datasets: [
          {
            label: '自由時報',
            data: data.map( item => item.ltn )  ,
            backgroundColor: theme.colors.pink[500],
          },
          {
            label: '中央社',
            data: data.map( item => item.cna ) ,
            backgroundColor: theme.colors.cyan[300],
          },
          {
            label: '華視',
            data: data.map( item => item.cts ) ,
            backgroundColor: theme.colors.blue[400],
          },
        ],
      };
    return<>
    <Card width={{base:'100%'}} >
        {/* <CardHeader pb='0' fontSize='xl' fontWeight='bold'>各家新聞關鍵字分析</CardHeader> */}
                    <CardBody pt='0' >
                        <Box  p='4' mt='4'>
                        <Text fontWeight='bold' my='2'>各家新聞關鍵字分析</Text>
                        <Box><Bar options={options} data={chartData} height='300px' /></Box>
                        </Box>
                        <Box  p='4' mt='4'>
                            <Text fontWeight='bold' my='2'>關鍵字搜尋</Text>
                            <OrderedList display='flex' flexWrap='wrap' spacing='0'>
                                {data.map( (item , index )=>  <ListItem display='block'  key={index}><Button fontSize='xs' height='0' py='4' cursor='pointer' onClick={()=>{ setSearch(item.keyWord) ; mutate(item.keyWord) }} m='2' px='4'>{item.keyWord}</Button></ListItem> )}
                            </OrderedList>
                        </Box>
                    </CardBody>
                </Card>  
    </>  
}

}