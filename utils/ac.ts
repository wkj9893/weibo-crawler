export default function ac(words: string[]) {
    //  每个字符对应的index
    const map: Map<string, number> = new Map()
    //  每个状态对应的字符串
    const strMap: Map<number, string> = new Map()
    //  匹配成功的状态
    const matchSet: Set<number> = new Set()

    function goto() {
        let count = 0
        let states = 1
        strMap.set(0, '')
        const goto: number[][] = []

        for (const word of words) {
            let current_state = 0
            for (const char of word) {
                if (map.get(char) === undefined) {
                    map.set(char, count++)
                }
                if (!goto[current_state]) {
                    const str = strMap.get(current_state) + char
                    goto[current_state] = []
                    // @ts-ignore
                    goto[current_state][map.get(char)] = states++
                    current_state = states - 1
                    strMap.set(current_state, str)
                    continue
                }
                // @ts-ignore
                if (!goto[current_state][map.get(char)]) {
                    const str = strMap.get(current_state) + char
                    // @ts-ignore
                    goto[current_state][map.get(char)] = states++
                    current_state = states - 1
                    strMap.set(current_state, str)
                    continue
                }
                // @ts-ignore
                current_state = goto[current_state][map.get(char)]
            }
            matchSet.add(states - 1)
        }

        const fail = []
        for (let i = 0; i < strMap.size; i++) {
            fail.push(find(strMap.get(i) as string))
        }

        for (let i = 0; i < states; i++) {
            if (goto[i] === undefined) {
                goto[i] = new Array(count)
                for (let j = 0; j < count; j++) {
                    goto[i][j] = fail[i]
                }
            } else {
                for (let j = 0; j < count; j++) {
                    if (goto[i][j] === undefined) {
                        goto[i][j] = fail[i]
                    }
                }
            }
        }
        return goto
    }

    //  找到s的最长相同前后缀，从后往前匹配查找
    function find(s: string) {
        const length = s.length
        const last = s[length - 1]
        for (let i = length - 2; i >= 0; i--) {
            if (
                s[i] === last &&
                s.substring(0, i) === s.substring(length - i, length)
            ) {
                return i + 1
            }
        }
        return 0
    }

    const gotoArray = goto()

    function match(text: string) {
        const result = []
        let current_state = 0
        for (let i = 0; i < text.length; i++) {
            const t = text[i]
            if (map.get(t) === undefined) {
                current_state = 0
                continue
            }
            const prev_state = current_state
            // @ts-ignore
            current_state = gotoArray[current_state][map.get(t)]
            if (current_state < prev_state) {
                i--
                continue
            }
            if (matchSet.has(current_state)) {
                const s = strMap.get(current_state) as string
                result.push([i - s.length + 1, i])
                console.log(`字符串${s}出现在${i - s.length + 1}到${i}`)
            }
        }
        return result
    }
    return match
}
