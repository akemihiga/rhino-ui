import React from 'react';
import classNames from 'classnames';
import { Toast, ToastPosition, ToastType } from './toast.types';
import { resolveValue } from '../../lib/resolve-value';
import { prefersReducedMotion } from '../../lib/prefers-reduced-motion';
import { Box } from '../box/box';
import { Icon } from '../icon/icon';
import { Spinner } from '../spinner/spinner';
import { IconName, FontColor } from '../../types';
import styles from './toast-notification.module.scss';

interface ToastNotificationProps {
  /**
   * Toast object
   */
  toast: Toast;
  /**
   * Custom position for toast (overrides global container toast position).
   */
  position?: ToastPosition;
  /**
   * Custom styles for toast.
   */
  style?: React.CSSProperties;
  /**
   * Render function to create custom toast notification.
   */
  children?: (components: {
    message: React.ReactNode;
  }) => React.ReactNode;
  /**
   * Handler for when the dismiss button is pressed.
   */
  onDismiss?: () => void;
}

const getAnimationClass = (position: ToastPosition, visible: boolean): React.CSSProperties => {
  const verticalPosition = position.includes('top') ? 'top' : 'bottom';
  const horizontalPosition = position.includes('left') ? 'left' : 'right';
  const isCentered = position.includes('center');

  const [enter, exit] = prefersReducedMotion()
    ? [styles['toast-notification-fade-in'], styles['toast-notification-fade-out']]
    : [
      styles[`toast-notification-enter-${verticalPosition}`],
      styles[`toast-notification-exit-${isCentered ? verticalPosition : horizontalPosition}`],
    ];

  return visible ? enter : exit;
};

const renderToastIcon = (toast: Toast) => {
  const { type } = toast;

  if (type === 'blank') return;

  let iconName: IconName = 'exclamation-mark';
  let iconColor: FontColor = 'dark';

  if (type === 'success') {
    iconName = 'c-check';
    iconColor = 'success-300';
  }

  if (type === 'error') {
    iconName = 'c-warning';
    iconColor = 'danger-300';
  }

  const icon = type !== 'loading' ? <Icon name={iconName} color={iconColor} /> : <Spinner variant="grey" />;

  // eslint-disable-next-line consistent-return
  return (
    <Box justifyContent="center" height="100">
      {icon}
    </Box>
  );
};

const toastTypesWithIcon: ToastType[] = ['error', 'success', 'loading'];

const renderDismissIcon = (toast: Toast, onDismiss: ToastNotificationProps['onDismiss']) => {
  if (!toast.canDismiss) return;

  // eslint-disable-next-line consistent-return
  return (
    <Box
      as="button"
      borderWidth="0 0 0 sm"
      className={styles['toast-dismiss']}
      margin="0 0 0 sm"
      padding="0 0 0 sm"
      cursor="pointer"
      background="transparent"
      height="100"
      onClick={onDismiss}
      aria-label="dismiss notification"
    >
      <Icon name="remove-light" />
    </Box>
  );
};

// eslint-disable-next-line import/prefer-default-export
export const ToastNotification: React.FC<ToastNotificationProps> = React.memo(
  ({
    toast, position = 'top-center', style, children, onDismiss,
  }) => {
    const message = (
      <Box
        direction="row"
        justifyContent="center"
        margin={toastTypesWithIcon.includes(toast.type) ? '0 0 0 sm' : undefined}
        style={{
          flex: '1 1 auto',
        }}
        {...toast.ariaProps}
      >
        {resolveValue(toast.message, toast)}
      </Box>
    );

    const animationClass = toast?.height ? getAnimationClass(toast.position || position, toast.visible) : undefined;

    const classes = classNames(
      toast.className,
      styles['toast-notification'],
      animationClass,
      {
        'toast-notification--not-visible': !toast.visible,
      },
    );

    return (
      <Box
        alignItems="center"
        maxWidth="300px"
        padding={toast.isCompact ? 'sm' : 'md'}
        direction="row"
        className={classes}
        style={{
          ...style,
          ...toast.style,
          ...!toast.height && { opacity: 0 },
        }}
      >
        {typeof children === 'function' ? (
          children({
            message,
          })
        ) : (
          <>
            {renderToastIcon(toast)}
            {message}
            {renderDismissIcon(toast, onDismiss)}
          </>
        )}
      </Box>
    );
  },
);
