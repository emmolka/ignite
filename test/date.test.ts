import dateFormat from "../src/utils/date";

describe("dateFormat test: ", () => {
  test("1 ) Date format should be yyyy-mm-dd", () => {
    const regexp = new RegExp(dateFormat);

    const returnedValue = regexp.test("1999-09-01");
    console.log(returnedValue);

    expect(returnedValue).toBe(true);
  });
  test("2 ) Passed incorrect format", () => {
    const regexp = new RegExp(dateFormat);

    const returnedValue = regexp.test("1999-99-01");
    console.log(returnedValue);

    expect(returnedValue).toBe(false);
  });
});
