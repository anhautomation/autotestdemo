import axios from "axios";
import { envconfig } from "../variables/envconfig";

const header = {
    "content-type": "application/json",
}

export const checkAccountQuery = async (accountNumber: string, bankCode: string) => {
    return await axios({
        url: envconfig.bizziPayUrl.toString(),
        method: 'post',
        headers: header,
        data: {
            query: `{
                checkAccount(request: {
                  accountNumber: "` + accountNumber + `"
                  bankCode: "` + bankCode + `"
                }) {
                  accountHolder
                }
              }`
        }
    })
}