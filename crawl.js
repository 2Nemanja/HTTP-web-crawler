function normalizeURL(urlString) {
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if(hostPath.length > 0 && hostPath.slice(-1) === '/') { //.slice(-1) uzima poslednji karakter stringa
        return hostPath.slice(0,-1) //vraca sve sem poslednjeg karaktera
    }
    return hostPath
}

module.exports = {
    normalizeURL
}