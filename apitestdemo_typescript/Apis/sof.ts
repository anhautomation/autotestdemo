import axios from "axios";
import { envconfig } from "../variables/envconfig";

const header = {
    "content-type": "application/json",
}

export const sofQuery = async () => {
    return await axios({
        url: envconfig.bizziPayUrl.toString(),
        method: 'post',
        headers: header,
        data: {
            query: `{
                        sof {
                            data {
                                code
                                logo
                            }
                        }
                    }`
        }
    })
}