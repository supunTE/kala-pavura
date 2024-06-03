import { average } from 'color.js';

import {
  ExtractedImageColors,
  HslColor,
  HslColorInstance,
} from '@kala-pavura/models';

export async function extractImageColors(
  image: string,
): Promise<ExtractedImageColors> {
  const rgbValues = await average(image, { sample: 100 });

  const colorHSL = convertRGBToHSL(
    parseInt(rgbValues[0].toString()),
    parseInt(rgbValues[1].toString()),
    parseInt(rgbValues[2].toString()),
  );

  return {
    lightVariant: getLightVariant(colorHSL.getDeepCopy()),
    defaultVariant: getDefaultVariant(colorHSL.getDeepCopy()),
    darkVariant: getDarkVariant(colorHSL.getDeepCopy()),
  };
}

const getLightVariant = (colorHSL: HslColorInstance): HslColorInstance => {
  if (colorHSL.luminance > 80) {
    colorHSL.luminance = 80;
  } else if (colorHSL.luminance < 55) {
    colorHSL.luminance = 55;
  }
  return colorHSL;
};

const getDefaultVariant = (colorHSL: HslColorInstance): HslColorInstance => {
  if (colorHSL.luminance < 40) {
    colorHSL.luminance = 40;
  } else {
    colorHSL.luminance = 25;
  }
  return colorHSL;
};

const getDarkVariant = (colorHSL: HslColorInstance): HslColorInstance => {
  if (colorHSL.luminance > 30) {
    colorHSL.luminance = 30;
  }
  return colorHSL;
};

const convertRGBToHSL = (
  rC: number,
  gC: number,
  bC: number,
): HslColorInstance => {
  const r = rC / 255;
  const g = gC / 255;
  const b = bC / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
        break;
      case g:
        h = ((b - r) / d + 2) * 60;
        break;
      case b:
        h = ((r - g) / d + 4) * 60;
        break;
    }
  }

  return new HslColor(Math.round(h), Math.round(s * 100), Math.round(l * 100));
};
