const { sortPages } = require('./report.js')
const { test, expect } = require('@jest/globals')

//Ova fja sluzi kako bismo za vise razlicitih URL-ova koji pokazuju na isti sajt napravili normalizaciju 
//npr da za unose https://google.com i https://Google.com mi svakako odemo na google...

test('Sort Pages, 2 pages', () => {
    const input = {
        "https://wagslane.dev/path": 1,
        "https://wagslane.dev": 3
    }
    const actual = sortPages(input)
    const expected = [
        ["https://wagslane.dev", 3],
        ["https://wagslane.dev/path", 1]
    ]
    expect(actual).toEqual(expected)
})

test('Sort Pages, 5 pages', () => {
    const input = {
        "https://wagslane.dev/path": 1,
        "https://wagslane.dev": 3,
        "https://wagslane.dev/path1": 4,
        "https://wagslane.dev/path2": 7,
        "https://wagslane.dev/path3": 5,
        "https://wagslane.dev/path4": 8,
    }
    const actual = sortPages(input)
    const expected = [
        ["https://wagslane.dev/path4", 8],
        ["https://wagslane.dev/path2", 7],
        ["https://wagslane.dev/path3", 5],
        ["https://wagslane.dev/path1", 4],
        ["https://wagslane.dev", 3],
        ["https://wagslane.dev/path", 1]
    ]
    expect(actual).toEqual(expected)
})