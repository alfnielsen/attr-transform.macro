///  Original file: has this on first line: /// <reference types="react-scripts" />

// Model React has deprecated "Globel" and uses the "React.JSX" namespace instead.

// If the project in includes a "react-app-env.d.ts" file, then add props like this:

declare namespace React {
  interface Attributes {
    /** tw: "p1" */
    p1?: boolean;
    /** tw: "p2" */
    p2?: boolean;
  }
}
