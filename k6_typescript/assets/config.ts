import { Options } from "k6/options";

export let variables = {
    'uri': '',
    'timeSleepMin': 0,
    'timeSleepMax': 1
}

export let healthcheckOptions:Options = {
    vus: 1,
    // duration: '10s',
    // thresholds:{
    //     checks:['rate>0.95']
    // }
};

// export let rampup = {
//     stages:[
//         {target: 20, duration: "30s"},
//         {target: 40, duration: "30s"},
//         {target: 0, duration: "1m"}
//     ]
// }