
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const PROD = true;

export const jsreport = 'http://jsreport-server:5488'

