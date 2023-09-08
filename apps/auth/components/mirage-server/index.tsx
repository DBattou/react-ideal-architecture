"use client";
import { makeServer } from "qonto-mirage";

makeServer({ environment: "development" });

export default function MirageServer(): null {
  return null;
}
