# twin-attributes.macro

Pre-step berfore twin:

Enable mapping JSX attributes to "tw" 

twin-attributes.config.js
```js
module.exports = {
  attr: {
    p1: "p-1",
    red: "bg-red-600",
  },
}
```

ComponentX
```ts
const ComponentX = () => {
  return <div p1>padding</div>
}
// prestep converts it to:
const ComponentX = () => {
  return <div tw="p-1">padding</div>
}
```
