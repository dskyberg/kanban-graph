import React from 'react';

/**
 * A simple React hook for differentiating single and double clicks on the same component.
 *
 * @param {node} ref Dom node to watch for double clicks
 * @param {number} [latency=300] The amount of time (in milliseconds) to wait before differentiating a single from a double click
 * @param {function} onSingleClick A callback function for single click events
 * @param {function} onDoubleClick A callback function for double click events
 */

type useDoubleClickProps<T extends HTMLElement> = {
   ref: React.RefObject<T>;
   latency: number;
   onSingleClick?: () => void;
   onDoubleClick?: () => void;
};

const useDoubleClick = <T extends HTMLElement>({
   ref,
   latency = 300,
   onSingleClick = (): void => {
      return;
   },
   onDoubleClick = (): void => {
      return;
   },
}: useDoubleClickProps<T>): void => {
   React.useEffect(() => {
      const clickRef = ref?.current;
      let clickCount = 0;
      const handleClick = (): void => {
         clickCount += 1;

         setTimeout(() => {
            if (clickCount === 1) onSingleClick();
            else if (clickCount === 2) onDoubleClick && onDoubleClick();

            clickCount = 0;
         }, latency);
      };

      // Add event listener for click events
      if (clickRef !== undefined && clickRef !== null) {
         clickRef.addEventListener('click', handleClick);
      }

      // Remove event listener
      return (): void => {
         if (clickRef !== undefined && clickRef !== null) {
            clickRef.removeEventListener('click', handleClick);
         }
      };
   });
};

export default useDoubleClick;
