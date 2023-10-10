import type { SnakeCase } from "type-fest";

export type Serialized<Value> = Value extends Date
  ? string /** dates are strings in the JSON */
  : Value extends (infer U)[]
  ? Serialized<U>[]
  : {
      [K in keyof Value as SnakeCase<K>]: Serialized<
        Value[K]
      > /** keys are snake_case in the JSON */;
    };
