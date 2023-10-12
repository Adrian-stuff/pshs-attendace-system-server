import { Static, Type } from "@sinclair/typebox";

export const LRN = Type.Object({
  lrn: Type.Number(),
});

export type LRNType = Static<typeof LRN>;
