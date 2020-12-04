const isEmpty = (value: any): boolean => {
   if (value === undefined || value === null || (typeof value === 'string' && value === '')) return true;
   return false;
};
export default isEmpty;
