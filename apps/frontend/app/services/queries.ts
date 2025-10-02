import { useQuery } from "@tanstack/react-query";
import { getQuizMetaData } from "./api";



export function useGetQuizMetaData(){
   return useQuery({
    queryKey:["quiz-meta-data"],
    queryFn:getQuizMetaData,
    refetchOnWindowFocus:false,
   })
}