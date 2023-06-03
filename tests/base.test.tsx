import { run } from "./util/test-util";

test("replaceName", async () => {
  const input = `<div onclick={() => {}} />`;
  const expectedOutput = `<div onClick={() => {}} />;`;
  let result = await run(input, {
    config: false,
    elms: [
      {
        attrs: [
          {
            matchName: /onclick/i,
            replaceName: "onClick",
          },
        ],
      },
    ],
  });
  expect(result).toBe(expectedOutput);
});

test("replaceValuw", async () => {
  const input = `<div f="1" />`;
  const expectedOutput = `<div f="2" />;`;
  let result = await run(input, {
    config: false,
    elms: [
      {
        attrs: [
          {
            matchName: "f",
            replaceValue: "2",
          },
        ],
      },
    ],
  });
  expect(result).toBe(expectedOutput);
});

test("transform to tw basic", async () => {
  const input = `<div p1 />`;
  const expectedOutput = `<div tw="p-1" />;`;

  let result = await run(input, {
    config: false,
    elms: [
      {
        attrs: [
          {
            matchName: /p([1-9])/,
            value: ({ match }) => `p-${match![1]}`,
            collect: true,
            remove: true,
          },
        ],
        actions: [
          {
            createAttribute: "tw",
            condition: ({ collectedAttributes }) => collectedAttributes.length > 0,
            value: ({ collectedAttributes }) => collectedAttributes.map((attr) => attr.value).join(" "),
          },
        ],
      },
    ],
  });

  expect(result).toBe(expectedOutput);
});
