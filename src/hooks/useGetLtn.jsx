import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export const useGetLtn = () => {
  //const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["ltn"],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_PATH_BASE_URL}/news/ltn`
      , {
        method:'get',
        headers:{
          //Authorization: authorization,
          "Content-Type":"applacation/json"
        }
      } );
      console.log('get-ltn-data')
      return data;
    },
  });
};
