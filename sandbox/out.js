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

import React from 'react';

// Inline tw

/** p1 - p9 only one is allowed */

// generic:
/** p1 - p9 only one is allowed */
// https://www.typescriptlang.org/docs/handbook/jsx.html
const DD = props => {
  return <div data-prop="t" {...props} tw="p-2 flex items-center justify-start" />;
};
const d1 = <DD1 tw="p-1 bg-black/25 flex items-center justify-start" data-prop="more" float />;
const d2 = <DD2 tw="p-1 flex items-center justify-start" />;
const d3 = <DD3 />;
const d4 = <DD4 tw="p-1 bg-gray-100" />;
const d5 = <DD5 placeholder="search" />;
