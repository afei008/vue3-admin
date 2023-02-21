/** @format */

const isOnePointZero = (n: unknown) => {
  return typeof n === 'string' && n.includes('.') && Number.parseFloat(n) === 1;
};

const isPercentage = (n: unknown) => {
  return typeof n === 'string' && n.includes('%');
};

const bound01 = (v: number | string, max: number | string) => {
  let value = v;
  if (isOnePointZero(v)) {
    value = '100%';
  }

  const processPercent = isPercentage(value);
  value = Math.min(max as number, Math.max(0, Number.parseFloat(`${value}`)));

  // Automatically convert percentage into number
  if (processPercent) {
    value = Number.parseInt(`${value * (max as number)}`, 10) / 100;
  }

  // Handle floating point rounding errors
  if (Math.abs(value - (max as number)) < 0.000001) {
    return 1;
  }

  // Convert into [0, 1] range if it isn't already
  return (value % (max as number)) / Number.parseFloat(max as string);
};

export const hsv2rgb = (hVal: number, sVal: number, vVal: number) => {
  const h = bound01(hVal, 360) * 6;
  const s = bound01(sVal, 100);
  const v = bound01(vVal, 100);

  const i = Math.floor(h);
  const f = h - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  const mod = i % 6;
  const r = [v, q, p, p, t, v][mod];
  const g = [t, v, v, q, p, p][mod];
  const b = [p, p, t, v, v, q][mod];

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
};

const hsl2hsv = (h: number, s: number, l: number) => {
  let sat = s / 100;
  let light = l / 100;
  let smin = sat;
  const lmin = Math.max(light, 0.01);

  light *= 2;
  sat *= light <= 1 ? light : 2 - light;
  smin *= lmin <= 1 ? lmin : 2 - lmin;
  const v = (light + sat) / 2;
  const sv =
    light === 0 ? (2 * smin) / (lmin + smin) : (2 * sat) / (light + sat);

  return {
    h,
    s: sv * 100,
    v: v * 100,
  };
};

const rgb2hsv = (rVal: number, gVal: number, bVal: number) => {
  const r = bound01(rVal, 255);
  const g = bound01(gVal, 255);
  const b = bound01(bVal, 255);

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  const v = max;

  const d = max - min;
  const s = max === 0 ? 0 : d / max;

  if (max === min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, v: v * 100 };
};

const INT_HEX_MAP: Record<string, string> = {
  10: 'A',
  11: 'B',
  12: 'C',
  13: 'D',
  14: 'E',
  15: 'F',
};

const HEX_INT_MAP: Record<string, number> = {
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15,
};

const parseHexChannel = (hex: string) => {
  if (hex.length === 2) {
    return (
      (HEX_INT_MAP[hex[0].toUpperCase()] || +hex[0]) * 16 +
      (HEX_INT_MAP[hex[1].toUpperCase()] || +hex[1])
    );
  }

  return HEX_INT_MAP[hex[1].toUpperCase()] || +hex[1];
};

const hexOne = (v: number) => {
  const value = Math.min(Math.round(v), 255);
  const high = Math.floor(value / 16);
  const low = value % 16;
  return `${INT_HEX_MAP[high] || high}${INT_HEX_MAP[low] || low}`;
};

export const toHex = ({ r, g, b }: { r: number; g: number; b: number }) => {
  if (Number.isNaN(+r) || Number.isNaN(+g) || Number.isNaN(+b)) return '';
  return `#${hexOne(r)}${hexOne(g)}${hexOne(b)}`;
};

export default class Color {
  private hueP = 0;

  private saturationP = 100;

  private valueP = 100;

  format = 'hex';

  value = '';

  constructor(options: { value?: string }) {
    if (options.value) {
      this.fromString(options.value);
    } else {
      this.changeColor();
    }
  }

  set(prop: { [key: string]: any } | any, value?: number) {
    if (arguments.length === 1 && typeof prop === 'object') {
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, val] of Object.entries(prop)) {
        this.set(key, val as number);
      }
      return;
    }
    (this as any)[`${prop}P`] = value;
    this.changeColor();
  }

  get(prop: string) {
    return (this as any)[`${prop}P`];
  }

  fromString(value: string) {
    if (!value) {
      this.hueP = 0;
      this.saturationP = 100;
      this.valueP = 100;

      this.changeColor();
      return;
    }
    const fromHSV = (h: number, s: number, v: number) => {
      this.hueP = Math.max(0, Math.min(360, h));
      this.saturationP = Math.max(0, Math.min(100, s));
      this.valueP = Math.max(0, Math.min(100, v));

      this.changeColor();
    };
    if (value.includes('#')) {
      const hex = value.replace('#', '').trim();
      if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$|^[0-9a-fA-F]{8}$/.test(hex)) {
        return;
      }
      let r = 0;
      let g = 0;
      let b = 0;
      if (hex.length === 3) {
        r = parseHexChannel(hex[0] + hex[0]);
        g = parseHexChannel(hex[1] + hex[1]);
        b = parseHexChannel(hex[2] + hex[2]);
      } else if (hex.length === 6) {
        r = parseHexChannel(hex.slice(0, 2));
        g = parseHexChannel(hex.slice(2, 4));
        b = parseHexChannel(hex.slice(4, 6));
      }
      const { h, s, v } = rgb2hsv(r, g, b);
      fromHSV(h, s, v);
    }
  }

  changeColor() {
    const { hueP, saturationP, valueP, format } = this;
    switch (format) {
      default:
        this.value = toHex(hsv2rgb(hueP, saturationP, valueP));
    }
  }
}
