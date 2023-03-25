import React from 'react'
import ReactDOM from 'react-dom'
import TsChord from '../definitions/chord'

export const Chord = ({frets, fingers, barres, capo} : any) => {
    return (
        <TsChord
            frets={frets}
            fingers={fingers}
            barres={barres}
            capo={capo}
        />
    )
}