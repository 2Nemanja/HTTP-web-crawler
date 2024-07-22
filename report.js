function printReport(pages) {
    console.log("==========")
    console.log("REPORT")
    console.log("==========")
    const sortedPages = sortPages(pages)
    for (const sortedPage of sortedPages) {
        const url = sortedPage[0]
        const hits = sortedPage[1]
        console.log(`Found ${hits} links to page: ${url}`)
    }
    console.log("==========")
    console.log("END REPORT")
    console.log("==========")
}

function sortPages(pages) {
    const pagesArr = Object.entries(pages)
        pagesArr.sort((a,b) => {
            aHits = a[1]
            bHits = b[1] // 1 zato sto je na nuli url, a mi zelimo da sortiramo po vrednosti za keca
            return b[1] - a[1]
            // posto ova funkcija za poredjenje vraca broj, 
            // a mi zelimo da sortiramo po opadajucem poretku, 
            // od b oduzimamo a
        })
        return pagesArr
}


module.exports = {
    sortPages, 
    printReport
}