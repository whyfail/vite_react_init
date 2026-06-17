const API_BASE_NAME = '/API_BASE';

const ResponseCode = {
  successCode: 200,
  outTimeCode: 504,
  InvalidTokenCode: 401,
  OtherLoading: 403,
} as const;

const BASE_FONT_SIZE = 16 as const;

const BASE_MIN_VW_VH: Readonly<{ VW: number, VH: number }> = { VW: 1660, VH: 900 };

export {
  API_BASE_NAME,
  BASE_FONT_SIZE,
  BASE_MIN_VW_VH,
  ResponseCode,
};
