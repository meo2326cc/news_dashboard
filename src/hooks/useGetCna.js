import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export const useGetCna = (  ) => {
  //const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["cna"],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_PATH_BASE_URL}/news/cna`
      , {
        method:'get',
        headers:{
          //Authorization: authorization,
          "Content-Type":"applacation/json"
        }
      } );
      console.log('get-cna-data')
      return data.map( item => ({ ...item , url:'https://www.cna.com.tw' + item.url }) );
    },
    staleTime:Infinity
  });
};
