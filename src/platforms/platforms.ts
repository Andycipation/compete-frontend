import { PlatformName } from "../common/interfaces/platformName";
import { Platform } from "./Platform";

import boj from "./boj";
import cf from "./cf";

const PLATFORMS = [boj, cf] as const;

export const getPlatform = (name: PlatformName): Platform => {
  for (const platform of PLATFORMS) {
    if (platform.name == name) {
      return platform;
    }
  }
  throw new Error(`desired platform ${name} does not exist`);
};
