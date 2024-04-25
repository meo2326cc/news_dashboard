import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export const useGetCts = (   ) => {
  //const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["cts"],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_PATH_BASE_URL}/news/cts`
      , {
        method:'get',
        headers:{
          //Authorization: authorization,
          "Content-Type":"applacation/json"
        }
      } );
      console.log('get-cts-data')

      return data.slice(0,16)
    },
  });
};
