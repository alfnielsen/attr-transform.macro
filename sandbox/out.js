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

// https://www.typescriptlang.org/docs/handbook/jsx.html

const DD = props => {
  return <div data-prop="t" {...props} tw="p-2 flex items-center justify-start" />;
};
const d1 = <DD tw="p-1 bg-black/25  " data-prop="more" />;
const d2 = <DD />;
const d3 = <DD />;
const d4 = <DD tw="bg-gray-100" />;
