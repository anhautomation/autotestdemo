export const getListBankQuery = `
    query {
        {
            banks {
                data {
                    benId
                    code
                    logo
                    partnerCode
                    title
                }
            }
        }
    }
`

export const getListBankHeaders = {
    "Content-Type":"application/json"
};