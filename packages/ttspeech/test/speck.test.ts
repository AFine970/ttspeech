import { describe, expect, test, vi } from "vitest";
import { speck } from "../src/index";

class mockSpeechSynthesisUtterance {
  params = {};
  onend = null;
  onerror = null;
  constructor(params: any) {
    this.params = params;
  }
}

const mockSpeechSynthesis = {
  getVoices() {
    return [];
  },
  speak(uttr: any) {
    uttr.onend?.();
  },
};

vi.stubGlobal("SpeechSynthesisUtterance", mockSpeechSynthesisUtterance);

vi.stubGlobal("speechSynthesis", mockSpeechSynthesis);

describe("speck", () => {
  test("应该输入一个字符串，或一个对象", () => {
    expect(() => speck(["123"])).toThrowError(
      new Error("please input valid value")
    );
    expect(() => speck(123)).toThrowError(
      new Error("please input valid value")
    );
    expect(() => speck(null)).toThrowError(
      new Error("please input valid value")
    );
    expect(() => speck(false)).toThrowError(
      new Error("please input valid value")
    );
    expect(() => speck(undefined)).toThrowError(
      new Error("please input valid value")
    );
  });

  test("应该返回一个promise", async () => {
    await expect(speck("123")).resolves.toBe(true);
  });

  test("输入一个对象，可以正常执行", async () => {
    await expect(
      speck({
        text: "hello world",
      })
    ).resolves.toBe(true);
  });
});
