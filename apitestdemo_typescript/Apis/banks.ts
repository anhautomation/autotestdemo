import axios from "axios";
import { envconfig } from "../variables/envconfig";

const header = {
    "content-type": "application/json",
}

export const banksQuery = async () => {
    return await axios({
        url: envconfig.bizziPayUrl.toString(),
        method: 'post',
        headers: header,
        data: {
            query: `{
                        banks {
                            data {
                                code
                                logo
                            }
                        }
                    }`
        }
    })
}