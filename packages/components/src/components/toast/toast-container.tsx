import React from 'react';
import { prefersReducedMotion } from '../../lib/prefers-reduced-motion';
import { resolveValue } from '../../lib/resolve-value';
import { Box } from '../box/box';
import {
  Toast,
  ToastPosition,
  ExtendedToastOptions,
} from './toast.types';
import { ToastNotification } from './toast-notification';
import { useToasts } from './use-toasts';
import { toast } from './toast';

export const createRectRef = (onRect: (rect: DOMRect) => void) => (
  el: HTMLElement | null,
): void => {
  if (el) {
    const boundingRect = el.getBoundingClientRect();
    onRect(boundingRect);
  }
};

const getPositionStyle = (
  position: ToastPosition,
  offset: number,
): React.CSSProperties => {
  const top = position.includes('top');
  const verticalStyle: React.CSSProperties = top ? { top: 0 } : { bottom: 0 };
  const horizontalStyle = {
    ...position.includes('center') && { justifyContent: 'center' },
    ...(!position.includes('center') && position.includes('right')) && { justifyContent: 'flex-end' },
  };
  return {
    left: 0,
    right: 0,
    display: 'flex',
    position: 'absolute',
    transition: prefersReducedMotion()
      ? undefined
      : 'all 230ms cubic-bezier(.21,1.02,.73,1)',
    transform: `translateY(${offset * (top ? 1 : -1)}px)`,
    ...verticalStyle,
    ...horizontalStyle,
  };
};

export interface ToastContainerProps {
  /**
   * Render function for each individual toast.
   * This can be used to render custom toasts, although we recommend using the standard version,
   * unless absolutely necessary.
   */
  children?: (t: Toast) => JSX.Element;
  /**
   * Style object for the toast container if needed.
   */
  containerStyle?: React.CSSProperties;
  /**
   * Custom classname for toast container if needed.
   */
  containerClassName?: string;
  /**
   * The vertical gap between each toast notification when multiple toasts are on screen (in pixels).
   */
  gutter?: number;
  /**
   * Global position for all toasts in container.
   * NOTE: This can be overwritten by the position property of each individual toast.
   */
  position?: ToastPosition;
  /**
   * Display toasts in reverse order.
   * NOTE: Reverse order in this case means that older toasts remain close to the position origin.
   * and newer toasts appear further away from the origin.
   */
  reverseOrder?: boolean;
  /**
   * Global options for each toast. Can be overwritten for each individual toast as needed.
   */
  toastOptions?: ExtendedToastOptions;
  /**
   * Props spread into main container.
   */
  [x: string]: unknown; // eslint-disable-line
}

const DEFAULT_OFFSET = 16;

const renderNotification = (
  currentToast: Toast,
  children: ((
    (t: Toast) => JSX.Element)
    & (boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null)
    ) | undefined,
  containerPosition: ToastContainerProps['position'],
) => {
  const toastPosition = currentToast.position || containerPosition;

  if (currentToast.type === 'custom') {
    return resolveValue(currentToast.message, currentToast);
  }

  if (children) {
    return children(currentToast);
  }

  return (
    <ToastNotification
      toast={currentToast}
      position={toastPosition}
      onDismiss={() => toast.dismiss(currentToast.id)}
    />
  );
};

export const ToastContainer: React.FC<ToastContainerProps> = ({
  children = undefined,
  containerStyle = undefined,
  containerClassName = undefined,
  gutter = 8,
  position = 'top-center',
  reverseOrder = false,
  toastOptions,
  ...restProps
}) => {
  const { toasts, handlers } = useToasts(toastOptions);

  return (
    <Box
      style={{
        top: DEFAULT_OFFSET,
        left: DEFAULT_OFFSET,
        right: DEFAULT_OFFSET,
        bottom: DEFAULT_OFFSET,
        pointerEvents: 'none', // ensure background elements are clickable
        ...containerStyle,
      }}
      position="fixed"
      zIndex="popover"
      className={containerClassName}
      onMouseEnter={handlers.startPause}
      onMouseLeave={handlers.endPause}
      {...restProps}
    >
      {toasts.map(t => {
        const toastPosition = t.position || position;
        const offset = handlers.calculateOffset(t, {
          reverseOrder,
          gutter,
          defaultPosition: position,
        });
        const positionStyle = getPositionStyle(toastPosition, offset);

        const ref = t.height
          ? undefined
          : createRectRef(rect => { handlers.updateHeight(t.id, rect.height); });

        return (
          <Box
            ref={ref}
            zIndex={t.visible ? 'popover' : undefined}
            key={t.id}
            style={{
              ...positionStyle,
            }}
            display="block"
          >
            {renderNotification(t, children, position)}
          </Box>
        );
      })}
    </Box>
  );
};
