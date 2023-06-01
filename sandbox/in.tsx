/**
 * Twin Sandbox (twin-attributes)
 * A place to test the output twin creates.
 * Good for general testing or for developing new features.
 *
 * Getting started
 * 1. Run the script: `npm run dev`
 * 2. Make a change to this file or to a file in the `src` folder
 * 3. Check `sandbox/out.tsx` for the macro output
 */


import './../attr-transform.macro.js'
import React, { FC, JSX as RJSX } from 'react'

// Inline tw


interface PaddingPropList {
    p1?: boolean
    p2?: boolean
    p3?: boolean
    p4?: boolean
    p5?: boolean
    p6?: boolean
    p7?: boolean
    p8?: boolean
    p9?: boolean
}
/** p1 - p9 only one is allowed */
type PaddingProp = ZeroOrOneProp<PaddingPropList>

// generic:
type RequireOnlyOne<T, Keys extends keyof T = keyof T> =
    Pick<T, Exclude<keyof T, Keys>>
    & {
        [K in Keys]-?:
        Required<Pick<T, K>>
        & Partial<Record<Exclude<Keys, K>, undefined>>
    }[Keys]


type ZeroOrOneProp<T, Keys extends keyof T = keyof T> =
    T extends Partial<T> ? RequireOnlyOne<T, Keys> : T



// https://www.typescriptlang.org/docs/handbook/jsx.html
declare global {
    namespace JSX {

        interface IntrinsicElements {
            div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

            box: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
        }

        // interface ElementAttributesProperty {
        //     p1?: boolean
        //     flex?: boolean
        //     line?: boolean
        // }

        interface IntrinsicAttributes {
            /** tw: "flex" */
            flex?: boolean;
            /** tw: "flex items-center justify-start" */
            line?: boolean;
            /** tw: "p1" */
            p1?: boolean;
            /** tw: "p2" */
            p2?: boolean;
        }
    }
}


type DDProps = {
    children?: React.ReactNode
    className?: string
    tw?: string
}



const DD: FC<DDProps> = (props) => {
    return <div p2 line data-prop="t" {...props} />
}
const d1 = <DD p1 tw="bg-black/25" data-prop="more" flex fl />
const d2 = <DD p1 flex />
const d3 = <DD />
const d4 = <DD p2 tw="bg-gray-100" />

