import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export const useGetData = (  ) => {
  //const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_PATH_BASE_URL}/user/userdata`
      , {
        method:'get',
        headers:{
          //Authorization: authorization,
          "Content-Type":"applacation/json"
        }
      } );
      console.log('get-data')
      return data;
    },
    
  });
};
