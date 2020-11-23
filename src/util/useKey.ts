import React from 'react';

/**
 * Act on key press, such as an escape key. Example:
 *    useKey('Escape', (): void => alert('Escape clicked'));
 *
 * @param {React.RefObject} ref - ref of the element to capture key presses from
 */
const useKey = (key: string, action: () => void): void => {
   React.useEffect(() => {
      const onKeyup = (e: KeyboardEvent): void => {
         if (e.key === key) action();
      };
      window.addEventListener('keyup', onKeyup);
      return (): void => window.removeEventListener('keyup', onKeyup);
   }, []);
};
export default useKey;
