/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isAnObject = (value: any): boolean => typeof value === 'object' && !Array.isArray(value) && value !== null;
export default isAnObject;
