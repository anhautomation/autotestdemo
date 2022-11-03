export const accountNumber = "";
export const bankCode = ""

export const checkAccountQuery = `
    query{
        checkAccount(request: {
            accountNumber: "${accountNumber}",
            bankCode: "${bankCode}"
        }) {
            accountHolder
        }
    }
`

export const checkAccountHeaders = {
    "Content-Type":"application/json"
}