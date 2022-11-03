import axios from "axios";
import { envconfig } from "../variables/envconfig";

const header = {
    "content-type": "application/json",
}

export const createTransactionSourceMutation = async (bankAccount: string, bankCode: string, bankName: string, companyId: string, merchantId: string) => {
    return await axios({
        url: envconfig.bizziPayUrl.toString(),
        method: 'post',
        headers: header,
        data: {
            query: `mutation {
              createTransactionSource(
                request: {
                  bankAccount: "` + bankAccount + `"
                  bankCode: "` + bankCode + `"
                  bankName: "` + bankName + `"
                  companyId: "` + companyId + `"
                  merchantId: "` + merchantId + `"
                }
              ) {
                sourceId
              }
            }`
        }
    })
}