/** @format */

export interface OptionsTypes {
  url: string;
  type: string;
  body: string;
}

export interface MockParams {
  url: string;
  type: string;
  response(options: OptionsTypes): Record<string, unknown>;
}
