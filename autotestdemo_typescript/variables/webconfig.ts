export const testRunConfig = {
    "testRunTimeout": 99999,
    "loadingTimeout": 20000,
}

export const loadExpenseConfig = () =>{
    let expenseVariables = {
        "url": "",
        "modUsername": "",
        "modPassword": "",
        "companyId": "",
        "companyName": "",
        "taxCode": "",
        "companyAddress": "",
        "invoiceEmail":""
    }

    if (typeof process.env.EXPENSE_WEB_URL !== 'undefined' && (process.env.EXPENSE_WEB_URL !== null || process.env.EXPENSE_WEB_URL !== '' || process.env.EXPENSE_WEB_URL !== ' ')) {
        expenseVariables.url = String(process.env.EXPENSE_WEB_URL);
    }

    if (typeof process.env.EXPENSE_MOD_USERNAME !== 'undefined' && (process.env.EXPENSE_MOD_USERNAME !== null || process.env.EXPENSE_MOD_USERNAME !== '' || process.env.EXPENSE_MOD_USERNAME !== ' ')) {
        expenseVariables.modUsername = String(process.env.EXPENSE_MOD_USERNAME);
    }

    if (typeof process.env.EXPENSE_MOD_PASSWORD !== 'undefined' && (process.env.EXPENSE_MOD_PASSWORD !== null || process.env.EXPENSE_MOD_PASSWORD !== '' || process.env.EXPENSE_MOD_PASSWORD !== ' ')) {
        expenseVariables.modUsername = String(process.env.EXPENSE_MOD_PASSWORD);
    }

    if (typeof process.env.EXPENSE_COMPANY_ID !== 'undefined' && (process.env.EXPENSE_COMPANY_ID !== null || process.env.EXPENSE_COMPANY_ID !== '' || process.env.EXPENSE_COMPANY_ID !== ' ')) {
        expenseVariables.companyId = String(process.env.EXPENSE_COMPANY_ID)
    }

    if (typeof process.env.EXPENSE_COMPANY_NAME !== 'undefined' && (process.env.EXPENSE_COMPANY_NAME !== null || process.env.EXPENSE_COMPANY_NAME !== '' || process.env.EXPENSE_COMPANY_NAME !== ' ')) {
        expenseVariables.companyName = String(process.env.EXPENSE_COMPANY_NAME)
    }

    if (typeof process.env.EXPENSE_TAX_CODE !== 'undefined' && (process.env.EXPENSE_TAX_CODE !== null || process.env.EXPENSE_TAX_CODE !== '' || process.env.EXPENSE_TAX_CODE !== ' ')) {
        expenseVariables.taxCode = String(process.env.EXPENSE_TAX_CODE)
    }

    if (typeof process.env.EXPENSE_COMPANY_ADDRESS !== 'undefined' && (process.env.EXPENSE_COMPANY_ADDRESS !== null || process.env.EXPENSE_COMPANY_ADDRESS !== '' || process.env.EXPENSE_COMPANY_ADDRESS !== ' ')) {
        expenseVariables.companyAddress = String(process.env.EXPENSE_COMPANY_ADDRESS)
    }

    if (typeof process.env.EXPENSE_INVOICE_EMAIL !== 'undefined' && (process.env.EXPENSE_INVOICE_EMAIL !== null || process.env.EXPENSE_INVOICE_EMAIL !== '' || process.env.EXPENSE_INVOICE_EMAIL !== ' ')) {
        expenseVariables.invoiceEmail = String(process.env.EXPENSE_COMPANY_ADDRESS)
    }

    return expenseVariables;
}

export const loadTalentnetConfig = () => {
    let talentnetVariables = {
        "url": "",
        "modUsername": "",
        "modPassword": "",
        "companyId": "",
        "companyName": "",
        "taxCode": "",
        "companyAddress": "",
        "invoiceEmail":""
    }

    if (typeof process.env.TALENTNET_WEB_URL !== 'undefined' && (process.env.TALENTNET_WEB_URL !== null || process.env.TALENTNET_WEB_URL !== '' || process.env.TALENTNET_WEB_URL !== ' ')) {
        talentnetVariables.url = String(process.env.TALENTNET_WEB_URL);
    }

    if (typeof process.env.TALENTNET_MOD_USERNAME !== 'undefined' && (process.env.TALENTNET_MOD_USERNAME !== null || process.env.TALENTNET_MOD_USERNAME !== '' || process.env.TALENTNET_MOD_USERNAME !== ' ')) {
        talentnetVariables.modUsername = String(process.env.TALENTNET_MOD_USERNAME);
    }

    if (typeof process.env.TALENT_MOD_PASSWORD !== 'undefined' && (process.env.TALENT_MOD_PASSWORD !== null || process.env.TALENT_MOD_PASSWORD !== '' || process.env.TALENT_MOD_PASSWORD !== ' ')) {
        talentnetVariables.modUsername = String(process.env.TALENT_MOD_PASSWORD);
    }

    if (typeof process.env.TALENTNET_COMPANY_ID !== 'undefined' && (process.env.TALENTNET_COMPANY_ID !== null || process.env.TALENTNET_COMPANY_ID !== '' || process.env.TALENTNET_COMPANY_ID !== ' ')) {
        talentnetVariables.companyId = String(process.env.TALENTNET_COMPANY_ID)
    }

    if (typeof process.env.TALENTNET_COMPANY_NAME !== 'undefined' && (process.env.TALENTNET_COMPANY_NAME !== null || process.env.TALENTNET_COMPANY_NAME !== '' || process.env.TALENTNET_COMPANY_NAME !== ' ')) {
        talentnetVariables.companyName = String(process.env.TALENTNET_COMPANY_NAME)
    }

    if (typeof process.env.TALENTNET_TAX_CODE !== 'undefined' && (process.env.TALENTNET_TAX_CODE !== null || process.env.TALENTNET_TAX_CODE !== '' || process.env.TALENTNET_TAX_CODE !== ' ')) {
        talentnetVariables.taxCode = String(process.env.EXPENSE_TAX_CODE)
    }

    if (typeof process.env.TALENTNET_ADDRESS !== 'undefined' && (process.env.TALENTNET_ADDRESS !== null || process.env.TALENTNET_ADDRESS !== '' || process.env.TALENTNET_ADDRESS !== ' ')) {
        talentnetVariables.companyAddress = String(process.env.EXPENSE_COMPANY_ADDRESS)
    }

    if (typeof process.env.TALENTNET_INVOICE_EMAIL !== 'undefined' && (process.env.TALENTNET_INVOICE_EMAIL !== null || process.env.TALENTNET_INVOICE_EMAIL !== '' || process.env.TALENTNET_INVOICE_EMAIL !== ' ')) {
        talentnetVariables.invoiceEmail = String(process.env.EXPENSE_COMPANY_ADDRESS)
    }

    return talentnetVariables;
}

export const loadMondelezConfig = () => {
    let mondelezVariables = {
        "url": "",
        "modUsername": "",
        "modPassword": "",
        "companyId": "",
        "companyName": "",
        "taxCode": "",
        "companyAddress": "",
        "invoiceEmail":""
    }

    if (typeof process.env.MONDELEZ_WEB_URL !== 'undefined' && (process.env.MONDELEZ_WEB_URL !== null || process.env.MONDELEZ_WEB_URL !== '' || process.env.MONDELEZ_WEB_URL !== ' ')) {
        mondelezVariables.url = String(process.env.MONDELEZ_WEB_URL);
    }

    if (typeof process.env.MONDELEZ_MOD_USERNAME !== 'undefined' && (process.env.MONDELEZ_MOD_USERNAME !== null || process.env.MONDELEZ_MOD_USERNAME !== '' || process.env.MONDELEZ_MOD_USERNAME !== ' ')) {
        mondelezVariables.modUsername = String(process.env.MONDELEZ_MOD_USERNAME);
    }

    if (typeof process.env.MONDELEZ_MOD_PASSWORD !== 'undefined' && (process.env.MONDELEZ_MOD_PASSWORD !== null || process.env.MONDELEZ_MOD_PASSWORD !== '' || process.env.MONDELEZ_MOD_PASSWORD !== ' ')) {
        mondelezVariables.modUsername = String(process.env.TALENT_MOD_PASSWORD);
    }

    if (typeof process.env.MONDELEZ_COMPANY_ID !== 'undefined' && (process.env.MONDELEZ_COMPANY_ID !== null || process.env.MONDELEZ_COMPANY_ID !== '' || process.env.MONDELEZ_COMPANY_ID !== ' ')) {
        mondelezVariables.companyId = String(process.env.MONDELEZ_COMPANY_ID)
    }

    if (typeof process.env.MONDELEZ_COMPANY_NAME !== 'undefined' && (process.env.MONDELEZ_COMPANY_NAME !== null || process.env.MONDELEZ_COMPANY_NAME !== '' || process.env.TALENTNET_COMPANY_NAME !== ' ')) {
        mondelezVariables.companyName = String(process.env.MONDELEZ_COMPANY_NAME)
    }

    if (typeof process.env.MONDELEZ_TAX_CODE !== 'undefined' && (process.env.MONDELEZ_TAX_CODE !== null || process.env.MONDELEZ_TAX_CODE !== '' || process.env.MONDELEZ_TAX_CODE !== ' ')) {
        mondelezVariables.taxCode = String(process.env.MONDELEZ_TAX_CODE)
    }

    if (typeof process.env.MONDELEZ_ADDRESS !== 'undefined' && (process.env.MONDELEZ_ADDRESS !== null || process.env.MONDELEZ_ADDRESS !== '' || process.env.MONDELEZ_ADDRESS !== ' ')) {
        mondelezVariables.companyAddress = String(process.env.EXPENSE_COMPANY_ADDRESS)
    }

    if (typeof process.env.MONDELEZ_INVOICE_EMAIL !== 'undefined' && (process.env.MONDELEZ_INVOICE_EMAIL !== null || process.env.MONDELEZ_INVOICE_EMAIL !== '' || process.env.MONDELEZ_INVOICE_EMAIL !== ' ')) {
        mondelezVariables.invoiceEmail = String(process.env.MONDELEZ_INVOICE_EMAIL)
    }

    return mondelezVariables;
}