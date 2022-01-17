const axios = require("axios");
const config = require("../../config/bizzi_config");
describe("Login API Suite", () => {
    let loginApi = config.webapi.url + "/prod/users/login"
    test("status code 200", async() => {
        const response = await axios.post(loginApi,
            {
                "username": config.webapp.user,
                "password": config.webapp.password
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        ).then(res => res );
        expect(response.status).toEqual(200);
    }),
    test("status code 400", async() => {
        const response = await axios.post(loginApi,
            {
                "username": "",
                "password": ""
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        ).then(res => res ).catch(err => err.response);
        expect(response.status).toEqual(400);
    })
})
