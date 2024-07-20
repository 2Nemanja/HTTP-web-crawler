const {JSDOM} = require('jsdom')

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
                    console.log(`error with relative url: ${err.message}`)
               }
            } else {
                //absolute
                try {
                    const urlObj = new URL(linkElement.href)
                    urls.push(urlObj.href)
                } catch (err) {
                    console.log(`error with absolute url: ${err.message}`)
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
    getURLsFromHTML
}