import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export const useGetAnalysis = (  ) => {
  //const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["analysis"],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_PATH_BASE_URL}/news/keywords`
      , {
        method:'get',
        headers:{
          //Authorization: authorization,
          "Content-Type":"applacation/json"
        }
      } );
      return data
    },
    staleTime:Infinity
  });
};
