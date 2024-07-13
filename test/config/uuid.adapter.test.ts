import { regex, UuidAdapter } from "../../src/config";

describe("test config/uuid.adapter.ts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return a UUID", () => {
    const spyV4 = jest.spyOn(UuidAdapter, "v4");

    const uuid = UuidAdapter.v4();

    expect(spyV4).toHaveBeenCalledTimes(1);
    expect(typeof uuid).toEqual("string");
    expect(uuid.length).toEqual(36);
    expect(uuid).toMatch(regex.uuid);
  });
});
