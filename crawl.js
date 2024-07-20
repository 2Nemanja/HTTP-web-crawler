const {JSDOM} = require('jsdom')


async function crawlPage(baseURL, currentURL, pages) {
    
    const baseURL_obj = new URL(baseURL)
    const currentURL_obj = new URL(currentURL)
    // check made for ignoring external sites to prevent crawling whole internet
    if(baseURL_obj.hostname !== currentURL_obj.hostname) {
        return pages // keeping track of the pages weve already crawled
    }
    // checking if the pages has been already crawled
    const normalizedCurrentURL = normalizeURL(currentURL)
    if (pages[normalizedCurrentURL] > 0) {
        pages[normalizedCurrentURL]++ // keeping the count of the number of times weve seen same page
        return pages
    }
    
    pages[normalizedCurrentURL] = 1
    console.log(`actively crawling: ${currentURL}`)
    
    try {
        const resp = await fetch(currentURL)

        if(resp.status > 399) {

            console.log(`\nERR: ---error in fetch with status code: ${resp.status} on page: ${currentURL}---\n`)
            return pages
        }

        const contentType = resp.headers.get("content-type")
        if(!contentType.includes("text/html")) {
            console.log(`\nERR: ---non html response, content type: ${contentType}, on page: ${currentURL}---\n`)
            return pages
        }
        
        
        const html_Body = await resp.text() // reason why we say .text() instead of .json() is because we want HTML to be returnet or to be precise text because we use HTML type text in getURLsFromHTML function

        const nextURLs = getURLsFromHTML(html_Body, baseURL)
        // recursively calling the function so when the crawling on one page is finished, we jump to the next page and so on
        for(const nextURL of nextURLs) {
            pages = await crawlPage(baseURL, nextURL, pages)
        }
    } catch (error) {
        console.log(`\nERR: ---error in fetch: ${error.message} caused by bad URL at: ${currentURL}---\n`)
    }
    return pages
}

function getURLsFromHTML(htmlBody, baseURL) {
    const  urls = []
    const epmty = ""
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for(const linkElement of linkElements) {
        if(linkElement.href){ // checking if <a> isnt ""
            if (linkElement.href.slice(0,1) === '/'){ // is the first caracter in the string a "/"
                //relative
               try {
                    // using URL constructor to validate URL tha we got as input
                    const urlObj = new URL(`${baseURL}${linkElement.href}`)
                    urls.push(urlObj.href) 
               } catch (err) {
                    console.log(`\nERR: ---error with relative url: ${err.message}---\n`)
               }
            } else {
                //absolute
                try {
                    const urlObj = new URL(linkElement.href)
                    urls.push(urlObj.href)
                } catch (err) {
                    console.log(`\nERR: ---error with absolute url: ${err.message}---\n`)
                }
            }
        }
    }
    
    return urls
}

function normalizeURL(urlString) {
    const urlObj   = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if(hostPath.length > 0 && hostPath.slice(-1) === '/') { //.slice(-1) uzima poslednji karakter stringa
        return hostPath.slice(0,-1) //vraca sve sem poslednjeg karaktera
    }
    return hostPath
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}