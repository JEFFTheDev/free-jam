import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import TsChord from '../definitions/chord'

export function Chord({ frets, fingers, barres, capo }: any) {

    const svgContainerRef = useRef<HTMLDivElement>(null);
    const [postProcessingDone, setPostProcessingDone] = useState<boolean>(false);

    useEffect(() => {
        if (postProcessingDone) {
            return;
        }

        // unfortunately the react-chords library does not offer any option for setting the initial color.
        // therefore some post processing needs to be done to set the desired color.
        const updateSvgColors = () => {
            if (svgContainerRef.current) {
                const svgElements = svgContainerRef.current.querySelectorAll('svg');
                svgElements.forEach(svgElement => {
                    recursivelyUpdateColors(svgElement);
                });
            }
        };

        // The svg is layered with more svgs for the frets, barres etc. over each needs to be looped
        const recursivelyUpdateColors = (element: any) => {
            if (element.nodeType === 1) {
                const fill = element.getAttribute('fill');
                const stroke = element.getAttribute('stroke');

                if (fill && fill !== 'none') {
                    element.setAttribute('fill', colorReplacement(fill));
                }

                if (stroke && stroke !== 'none') {
                    element.setAttribute('stroke', colorReplacement(stroke));
                }

                const childNodes = element.childNodes;
                for (let i = 0; i < childNodes.length; i++) {
                    recursivelyUpdateColors(childNodes[i]);
                }
            }
        };

        // Essentially converts the chord from a dark theme to a light theme
        const colorReplacement = (color: string) => {
            switch (color) {
                case "#444":
                    return "#D2D4D6";
                case "white":
                    return "#000000";
                default:
                    return color;
            }
        }

        updateSvgColors();
        setPostProcessingDone(true);
    }, [])

    return (
        <div ref={svgContainerRef}>
            <TsChord
                frets={frets}
                fingers={fingers}
                barres={barres}
                capo={capo}
            />
        </div>
    )
}