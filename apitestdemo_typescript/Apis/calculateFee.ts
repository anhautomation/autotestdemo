import axios from "axios";
import { envconfig } from "../variables/envconfig";

const header = {
    "content-type": "application/json",
}

export const calculateFeeQuery = async (sourceId: string) => {
    return await axios({
        url: envconfig.bizziPayUrl.toString(),
        method: 'post',
        headers: header,
        data: {
            query: `{
              calculateFee(
                request: {
                  sourceId: "` + sourceId + `"
                  transactionDestinations: [
                    { amount: 50000, bankCode: "DOB", refId: "1" }
                    { amount: 30000, bankCode: "SHBVN", refId: "2" }
                    { amount: 600000000, bankCode: "ACB", refId: "3"}
                  ]
                }
              ) {
                data {
                  fee
                  refId
                }
                totalFee
              }
            }`
        }
    })
}