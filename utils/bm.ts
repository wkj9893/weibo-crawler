//  Boyer Moore Algorithm
export default function bm(text: string, pattern: string) {
    let i = 0
    let j = 0
    const result = []
    const m = text.length
    const n = pattern.length
    const table = buildPatternTable(pattern)

    while (i < m - n + 1) {
        j = n - 1
        while (j >= 0 && pattern[j] === text[i + j]) {
            j--
        }
        if (j < 0) {
            result.push(i)
            i += n - get(text[i + m])
        } else {
            i += Math.max(1, j - get(text[i + j]))
        }
    }

    return result

    function get(s: string | undefined): number {
        if (!s) {
            return -1
        }
        if (table.has(s)) {
            return table.get(s) as number
        }
        return -1
    }
}

function buildPatternTable(pattern: string) {
    const map: Map<string, number> = new Map()
    for (let i = 0; i < pattern.length; i++) {
        map.set(pattern[i], i)
    }
    return map
}
