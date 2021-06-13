//  Brute-Force Algorithm
export default function bf(text: string, pattern: string) {
    const result = []
    const m = text.length
    const n = pattern.length
    for (let i = 0; i < m - n + 1; i++) {
        let j = 0
        for (; j < n; j++) {
            if (text[i + j] !== pattern[j]) {
                break
            }
        }
        if (j === n) {
            result.push(i)
        }
    }
    return result
}
