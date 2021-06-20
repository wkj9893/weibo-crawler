export default function kmp(text: string, pattern: string) {
    let i = 0
    let j = 0
    const result = []
    const m = text.length
    const n = pattern.length
    const table = buildPatternTable(pattern)

    while (i < m) {
        if (text[i] === pattern[j]) {
            i++
            j++
            if (j === n) {
                console.log(`字符串${text}出现在${i - pattern.length}到${i - 1}`)
                result.push(i - n)
            }
        } else if (j > 0) {
            j = table[j - 1]
        } else {
            i++
        }
    }
    return result
}

function buildPatternTable(pattern: string) {
    const table = [0]
    let prefix = 0
    let suffix = 1
    while (suffix < pattern.length) {
        if (pattern[prefix] === pattern[suffix]) {
            table[suffix] = prefix + 1
            prefix++
            suffix++
        } else if (prefix > 0) {
            prefix = table[prefix - 1]
        } else {
            table[suffix] = 0
            suffix++
        }
    }
    return table
}
