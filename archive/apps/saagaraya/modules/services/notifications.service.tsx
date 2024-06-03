import { notifications } from '@mantine/notifications';
import { Check, Warning, X } from '@phosphor-icons/react';

export class NotificationsService {
  static showErrorToast(title: string, message: string) {
    notifications.show({
      withCloseButton: true,
      title,
      message,
      color: 'red',
      icon: <X className="h-full w-full p-1" />,
      radius: 'md',
      withBorder: true,
    });
  }

  static showWarningToast(title: string, message: string) {
    notifications.show({
      withCloseButton: true,
      title,
      message,
      color: 'orange',
      icon: <Warning className="h-full w-full p-1" />,
      radius: 'md',
      withBorder: true,
    });
  }

  static showSuccessToast(title: string, message: string) {
    notifications.show({
      withCloseButton: true,
      title,
      message,
      color: 'green',
      icon: <Check className="h-full w-full p-1" />,
      radius: 'md',
      withBorder: true,
    });
  }
}
