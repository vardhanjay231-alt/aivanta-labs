import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { calculateStats } from "../src/services/aiService.ts";

describe("calculateStats pure logic", () => {
  it("handles empty text gracefully", () => {
    const stats = calculateStats("");
    assert.equal(stats.words, 0);
    assert.equal(stats.characters, 0);
    assert.equal(stats.readingTimeMinutes, 0);
  });

  it("calculates words and characters correctly", () => {
    const stats = calculateStats("Aivanta Labs builds useful AI for everyone.");
    assert.equal(stats.words, 7);
    assert.equal(stats.characters, 43);
    assert.equal(stats.readingTimeMinutes, 1);
  });

  it("calculates reading time for larger passages", () => {
    const longText = Array(450).fill("word").join(" ");
    const stats = calculateStats(longText);
    assert.equal(stats.words, 450);
    assert.equal(stats.readingTimeMinutes, 3);
  });
});
