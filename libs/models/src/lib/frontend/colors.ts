export class HslColor {
  constructor(
    public hue: number,
    public saturation: number,
    public luminance: number,
    public alpha: number = 1,
  ) {}

  public getDeepCopy(): HslColorInstance {
    return new HslColor(this.hue, this.saturation, this.luminance, this.alpha);
  }

  public toString(): string {
    return `hsl(${this.hue}, ${this.saturation}%, ${this.luminance}%, ${this.alpha})`;
  }

  public setOpacity(opacity: number): HslColorInstance {
    // Opacity is a value between 0 and 1
    if (opacity < 0 || opacity > 1) {
      throw new Error('Opacity must be a value between 0 and 1');
    }
    this.alpha = opacity;
    return this;
  }

  public addDarkness(darkness: number): HslColorInstance {
    // Darkness is a value between 0 and 100
    if (darkness < 0 || darkness > 100) {
      throw new Error('Darkness must be a value between 0 and 100');
    }
    this.luminance -= darkness;
    return this;
  }
}

export type HslColorInstance = InstanceType<typeof HslColor>;

export type ExtractedImageColors = {
  lightVariant: HslColorInstance;
  defaultVariant: HslColorInstance;
  darkVariant: HslColorInstance;
};
