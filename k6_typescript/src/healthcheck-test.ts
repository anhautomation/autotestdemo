import { check, sleep, group } from 'k6';
import http from 'k6/http'; 
import { variables, healthcheckOptions } from '../assets/config';
/* @ts-ignore */
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';

import { checkAccountQuery, checkAccountHeaders } from '../assets/checkAccount';

export const options = healthcheckOptions

const run = (query: any, headers: any) => {
    let res = http.post(
        variables.uri, 
        JSON.stringify({ query: query }), 
        {
            headers: headers,
        }
    );
    check(res, {
        'is status 200': (r) => r.status === 200,
    });
    sleep(randomIntBetween(variables.timeSleepMin,variables.timeSleepMax));
}

export default function() {
    group("API check account", () => {
        run(checkAccountQuery, checkAccountHeaders);
    })
    
}
