declare module "lerp" {
  /**
   * Linear interpolation between two values
   * @param start - Start value
   * @param end - End value
   * @param t - Interpolation factor (0-1)
   * @returns Interpolated value
   */
  function lerp(start: number, end: number, t: number): number;
  export = lerp;
}
