// get all quiz meta data
import axios from "axios";

export const baseUrl = "api/proxy/v1";

export const getQuizMetaData = async () => {
    const response= await axios ({
        method:"get",
        url:`/${baseUrl}/quiz/get-all-quiz-meta-data`,
    })
    return response.data;
}

