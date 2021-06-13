import { useEffect, useState } from 'react'
import bf from '../utils/bf'
import kmp from '../utils/kmp'
import bm from "../utils/bm"

export default function match() {
    const [text, setText] = useState('GCATCGCAGAGAGTATACAGTACG')
    const [pattern, setPattern] = useState('GCAGAGAG')
    const [result, setResult] = useState<Array<number>>([])

    useEffect(() => {
        console.log(result)
    }, [result])

    return (
        <>
            <h1> Pattern Match </h1>
            <textarea
                rows={15}
                cols={100}
                value={text}
                onChange={e => {
                    setText(e.target.value)
                }}
            />
            <textarea
                rows={15}
                cols={100}
                value={pattern}
                onChange={e => {
                    setPattern(e.target.value)
                }}
            />
            <button onClick={() => setResult(kmp(text, pattern))}>match</button>
        </>
    )
}
