const validate = require("./validate");
const ValidationError = require("./ValidationError");

test("arguments are validated", () => {
  const array = [
    { name: "Bechbech", type: "Cat" },
    { name: "Spencer", type: "Dog" },
    { name: "Taxi", type: "Bird" },
  ];
  const categories = [{ name: "cats", filter: ({ type }) => type === "Cat" }];
  const validatedArgs = validate(array, categories);
  expect(validatedArgs).toBe(true);
});

test("array is required", () => {
  const categories = [{ name: "cats", filter: ({ type }) => type === "Cat" }];
  expect(() => {
    validate(undefined, categories);
  }).toThrow(new ValidationError("array is required"));
});

test("array must be an array", () => {
  const array = "categorize";
  const categories = [{ name: "cats", filter: ({ type }) => type === "Cat" }];
  expect(() => {
    validate(array, categories);
  }).toThrow(new ValidationError("array must be an array"));
});

test("categories are required", () => {
  const array = [
    { name: "Bechbech", type: "Cat" },
    { name: "Spencer", type: "Dog" },
    { name: "Taxi", type: "Bird" },
  ];
  expect(() => {
    validate(array);
  }).toThrow(new ValidationError("categories are required"));
});

test("categories must be an array", () => {
  const array = [
    { name: "Bechbech", type: "Cat" },
    { name: "Spencer", type: "Dog" },
    { name: "Taxi", type: "Bird" },
  ];
  const categories = "cats";
  expect(() => {
    validate(array, categories);
  }).toThrow(new ValidationError("categories must be an array"));
});

test("each category must contain a name field", () => {
  const array = [
    { name: "Bechbech", type: "Cat" },
    { name: "Spencer", type: "Dog" },
    { name: "Taxi", type: "Bird" },
  ];
  const categories = [{ filter: ({ type }) => type === "Cat" }];
  expect(() => {
    validate(array, categories);
  }).toThrow(new ValidationError("categories[0].name is a required field"));
});

test("a category name can't be empty", () => {
  const array = [
    { name: "Bechbech", type: "Cat" },
    { name: "Spencer", type: "Dog" },
    { name: "Taxi", type: "Bird" },
  ];
  const categories = [{ name: "", filter: ({ type }) => type === "Cat" }];
  expect(() => {
    validate(array, categories);
  }).toThrow(
    new ValidationError("categories[0].name must be at least 1 characters")
  );
});

test("each category must be contain a filter field", () => {
  const array = [
    { name: "Bechbech", type: "Cat" },
    { name: "Spencer", type: "Dog" },
    { name: "Taxi", type: "Bird" },
  ];
  const categories = [{ name: "cats" }];
  expect(() => {
    validate(array, categories);
  }).toThrow(new ValidationError("categories[0].filter is a required field"));
});

test("a category filter must be a function", () => {
  const array = [
    { name: "Bechbech", type: "Cat" },
    { name: "Spencer", type: "Dog" },
    { name: "Taxi", type: "Bird" },
  ];
  const categories = [{ name: "cats", filter: "Cat" }];
  expect(() => {
    validate(array, categories);
  }).toThrow(new ValidationError("categories[0].filter must be a function"));
});

test("categories must have unique names", () => {
  const array = [
    { name: "Bechbech", type: "Cat" },
    { name: "Spencer", type: "Dog" },
    { name: "Taxi", type: "Bird" },
  ];
  const categories = [
    { name: "cats", filter: ({ type }) => type === "Cat" },
    { name: "cats", filter: ({ type }) => type === "Dog" },
  ];
  expect(() => {
    validate(array, categories);
  }).toThrow(new ValidationError("categories must have unique names"));
});
