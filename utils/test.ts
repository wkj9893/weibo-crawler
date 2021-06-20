import bf from './bf'
import bm from './bm'
import kmp from './kmp'
import ac from './ac'

const text = `赵谦我孙俪企鹅舞`
const pattern = '孙俪'

console.time('bf')
console.log(bf(text, pattern))
console.timeEnd('bf')

console.time('bm')
console.log(bm(text, pattern))
console.timeEnd('bm')

console.time('kmp')
console.log(kmp(text, pattern))
console.timeEnd('kmp')

const words = ['美', '原住民']
console.time('ac')
const match = ac(words)
match(text)
console.timeEnd('ac')
