import { ref, readonly } from "vue";

export interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  duration?: number;
}

const notifications = ref<Notification[]>([]);
let counter = 0;

function generateId(): string {
  return `notif-${++counter}-${Date.now()}`;
}

function addNotification(notification: Omit<Notification, "id">) {
  const id = generateId();
  const item: Notification = { ...notification, id };
  notifications.value.push(item);

  const duration = notification.duration ?? 5000;
  if (duration > 0) {
    setTimeout(() => removeNotification(id), duration);
  }

  return id;
}

function removeNotification(id: string) {
  const index = notifications.value.findIndex((n) => n.id === id);
  if (index > -1) {
    notifications.value.splice(index, 1);
  }
}

function clearAll() {
  notifications.value = [];
}

export function useNotification() {
  function success(title: string, message?: string) {
    return addNotification({ type: "success", title, message });
  }

  function error(title: string, message?: string) {
    return addNotification({ type: "error", title, message, duration: 8000 });
  }

  function warning(title: string, message?: string) {
    return addNotification({ type: "warning", title, message });
  }

  function info(title: string, message?: string) {
    return addNotification({ type: "info", title, message });
  }

  return {
    notifications: readonly(notifications),
    success,
    error,
    warning,
    info,
    remove: removeNotification,
    clearAll,
  };
}