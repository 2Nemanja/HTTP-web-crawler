const { crawlPage } = require('./crawl.js')

function main() {
    if(process.argv.length < 3) { 
        /**
         * /home/nemanja/.nvm/versions/node/v18.7.0/bin/node
           /home/nemanja/Desktop/http_protocol/HTTP-web-crawler/main.js
           nemanja
           ---REASON WHY WE CHECK IF LENGHT IS = 3---
         */
        console.log("no website provided")
        process.exit(1)
    }

    if (process.argv.length >3) {
        console.log("to many command line arguments...")
        process.exit(1)
    }
    const baseURL = process.argv[2]

    console.log(`starting crawl of ${baseURL}`)

    crawlPage(baseURL)
}

main()