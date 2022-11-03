import { envconfig } from "../variables/envconfig"
import { checkAccountQuery } from "../Apis/checkAccount"
import { sofQuery } from "../Apis/sof"
import { banksQuery } from "../Apis/banks"
import { createTransactionSourceMutation } from "../Apis/createTransactionSource"

import { v4 as uuid } from "uuid"

describe("api test ", ()=> {

    beforeAll(async ()=> {
    })

    afterAll(async ()=> {
    })

    test("checkAccount api - success", async() => {
        let accountNumber = "700071022152";
        let bankCode = "SHBVN";
        let res = await (await checkAccountQuery(accountNumber, bankCode)).data;
        console.log(res);
        expect(res).toHaveProperty("data");
        expect(res.data).toHaveProperty("checkAccount");
        expect(res.data.checkAccount).toHaveProperty("accountHolder");
    }, envconfig.testTimeout)

    test("checkAccount api - 5002 - bank code not found", async() => {
        let accountNumber = "700071022152";
        let bankCode = "";
        let res = await (await checkAccountQuery(accountNumber, bankCode)).data;
        console.log(res);
        expect(res).toHaveProperty("data");
        expect(res.data).toHaveProperty("checkAccount");
        expect(res.data.checkAccount).toEqual(null);
        expect(res).toHaveProperty("errors");
        expect(res.errors[0]).toHaveProperty("extensions");
        expect(res.errors[0].extensions).toHaveProperty("code");
        expect(res.errors[0].extensions.code).toEqual("5002");
        expect(res.errors[0].message).toEqual("Bank code not found");
    }, envconfig.testTimeout)

    test("checkAccount api - 1019 - bank account not found", async() => {
        let accountNumber = "700071022159";
        let bankCode = "SHBVN";
        let res = await (await checkAccountQuery(accountNumber, bankCode)).data;
        console.log(res);
        expect(res).toHaveProperty("data");
        expect(res.data).toHaveProperty("checkAccount");
        expect(res.data.checkAccount).toEqual(null);
        expect(res).toHaveProperty("errors");
        expect(res.errors[0]).toHaveProperty("extensions");
        expect(res.errors[0].extensions).toHaveProperty("code");
        expect(res.errors[0].extensions.code).toEqual("1019");
    }, envconfig.testTimeout)

    test("sof api - 200 - success", async() => {
        let res = await (await sofQuery()).data;
        console.log(res);
        expect(res).toHaveProperty("data");
        expect(res.data).toHaveProperty("sof");
        expect(res.data.sof).toHaveProperty("data");
        expect(res.data.sof.data.length).toBeGreaterThanOrEqual(1);
    }, envconfig.testTimeout)

    test("bank api - 200 - success",async () => {
        let res = await (await banksQuery()).data;
        console.log(res);
        expect(res).toHaveProperty("data");
        expect(res.data).toHaveProperty("banks");
        expect(res.data.banks).toHaveProperty("data");
        expect(res.data.banks.data.length).toBeGreaterThanOrEqual(1);
    }, envconfig.testTimeout)

    test("create transaction source - 200 - success",async () => {
        let bankAccount = "700071022152";
        let bankCode = "SHBVN";
        let bankName = "Ngân hàng TNHH MTV Shinhan Việt Nam";
        let companyId = "05abccfd-8416-4d07-860c-27cab43e5274";
        let merchantId = "05abccfd-8416-4d07-860c-27cab43e5274";
        let res = await (await createTransactionSourceMutation(bankAccount, bankCode, bankName, companyId, merchantId)).data;
        console.log(res);
        expect(res).toHaveProperty("data");
        expect(res.data).toHaveProperty("createTransactionSource");
        expect(res.data.createTransactionSource).toHaveProperty("sourceId");
        expect(res.data.createTransactionSource.sourceId).not.toBeNull();
    }, envconfig.testTimeout)

    test("create transaction source - 5015 - parameter is invalid or null - bank name wrong",async () => {
        let bankAccount = "700071022152";
        let bankCode = "SHBVN";
        let bankName = "TNHH MTV Shinhan Viet Nam";
        let companyId = "05abccfd-8416-4d07-860c-27cab43e5274";
        let merchantId = "05abccfd-8416-4d07-860c-27cab43e5274";
        let res = await (await createTransactionSourceMutation(bankAccount, bankCode, bankName, companyId, merchantId)).data;
        console.log(res);
        expect(res).toHaveProperty("data");
        expect(res.data).toHaveProperty("createTransactionSource");
        expect(res.data.createTransactionSource).toBeNull();
        expect(res).toHaveProperty("errors");
        expect(res.errors.length).toBeGreaterThanOrEqual(1);
        expect(res.errors[0]).toHaveProperty("extensions");
        expect(res.errors[0].extensions).toHaveProperty("code");
        expect(res.errors[0].extensions.code).toEqual("5015");
        expect(res.errors[0].message).toHaveProperty("parameter is invalid or null");
    }, envconfig.testTimeout)

    test("create transaction source - 5015 - parameter is invalid or null - bank code empty",async () => {
        let bankAccount = "700071022152";
        let bankCode = "";
        let bankName = "Ngân hàng TNHH MTV Shinhan Việt Nam";
        let companyId = "05abccfd-8416-4d07-860c-27cab43e5274";
        let merchantId = "05abccfd-8416-4d07-860c-27cab43e5274";
        let res = await (await createTransactionSourceMutation(bankAccount, bankCode, bankName, companyId, merchantId)).data;
        console.log(res);
        expect(res).toHaveProperty("data");
        expect(res.data).toHaveProperty("createTransactionSource");
        expect(res.data.createTransactionSource).toBeNull();
        expect(res).toHaveProperty("errors");
        expect(res.errors.length).toBeGreaterThanOrEqual(1);
        expect(res.errors[0]).toHaveProperty("extensions");
        expect(res.errors[0].extensions).toHaveProperty("code");
        expect(res.errors[0].extensions.code).toEqual("5015");
        expect(res.errors[0].message).toHaveProperty("parameter is invalid or null");
    }, envconfig.testTimeout)

    test("create transaction source - 5015 - parameter is invalid or null - companyId empty",async () => {
        let bankAccount = "700071022152";
        let bankCode = "SHBVN";
        let bankName = "Ngân hàng TNHH MTV Shinhan Việt Nam";
        let companyId = "";
        let merchantId = "05abccfd-8416-4d07-860c-27cab43e5274";
        let res = await (await createTransactionSourceMutation(bankAccount, bankCode, bankName, companyId, merchantId)).data;
        console.log(res);
        expect(res).toHaveProperty("data");
        expect(res.data).toHaveProperty("createTransactionSource");
        expect(res.data.createTransactionSource).toBeNull();
        expect(res).toHaveProperty("errors");
        expect(res.errors.length).toBeGreaterThanOrEqual(1);
        expect(res.errors[0]).toHaveProperty("extensions");
        expect(res.errors[0].extensions).toHaveProperty("code");
        expect(res.errors[0].extensions.code).toEqual("5015");
        expect(res.errors[0].message).toHaveProperty("parameter is invalid or null");
    }, envconfig.testTimeout)

    test("create transaction source - 5015 - parameter is invalid or null - merchantId empty",async () => {
        let bankAccount = "700071022152";
        let bankCode = "SHBVN";
        let bankName = "Ngân hàng TNHH MTV Shinhan Việt Nam";
        let companyId = "05abccfd-8416-4d07-860c-27cab43e5274";
        let merchantId = "";
        let res = await (await createTransactionSourceMutation(bankAccount, bankCode, bankName, companyId, merchantId)).data;
        console.log(res);
        expect(res).toHaveProperty("data");
        expect(res.data).toHaveProperty("createTransactionSource");
        expect(res.data.createTransactionSource).toBeNull();
        expect(res).toHaveProperty("errors");
        expect(res.errors.length).toBeGreaterThanOrEqual(1);
        expect(res.errors[0]).toHaveProperty("extensions");
        expect(res.errors[0].extensions).toHaveProperty("code");
        expect(res.errors[0].extensions.code).toEqual("5015");
        expect(res.errors[0].message).toHaveProperty("parameter is invalid or null");
    }, envconfig.testTimeout)

    test("create transaction source - 1037 - account invalid",async () => {
        let bankAccount = "700071022150";
        let bankCode = "SHBVN";
        let bankName = "Ngân hàng TNHH MTV Shinhan Việt Nam";
        let companyId = "05abccfd-8416-4d07-860c-27cab43e5274";
        let merchantId = "05abccfd-8416-4d07-860c-27cab43e5274";
        let res = await (await createTransactionSourceMutation(bankAccount, bankCode, bankName, companyId, merchantId)).data;
        console.log(res);
        expect(res).toHaveProperty("data");
        expect(res.data).toHaveProperty("createTransactionSource");
        expect(res.data.createTransactionSource).toBeNull();
        expect(res).toHaveProperty("errors");
        expect(res.errors.length).toBeGreaterThanOrEqual(1);
        expect(res.errors[0]).toHaveProperty("extensions");
        expect(res.errors[0].extensions).toHaveProperty("code");
        expect(res.errors[0].extensions.code).toEqual("1037");
        expect(res.errors[0].message).toHaveProperty("account invalid");
    }, envconfig.testTimeout)

    test("create transaction source - 5005 - Partner not found",async () => {
        let bankAccount = "700071022152";
        let bankCode = "SHBV";
        let bankName = "Ngân hàng TNHH MTV Shinhan Việt Nam";
        let companyId = "05abccfd-8416-4d07-860c-27cab43e5274";
        let merchantId = "05abccfd-8416-4d07-860c-27cab43e5274";
        let res = await (await createTransactionSourceMutation(bankAccount, bankCode, bankName, companyId, merchantId)).data;
        console.log(res);
        expect(res).toHaveProperty("data");
        expect(res.data).toHaveProperty("createTransactionSource");
        expect(res.data.createTransactionSource).toBeNull();
        expect(res).toHaveProperty("errors");
        expect(res.errors.length).toBeGreaterThanOrEqual(1);
        expect(res.errors[0]).toHaveProperty("extensions");
        expect(res.errors[0].extensions).toHaveProperty("code");
        expect(res.errors[0].extensions.code).toEqual("5005");
        expect(res.errors[0].message).toHaveProperty("Partner not found");
    }, envconfig.testTimeout)

})
