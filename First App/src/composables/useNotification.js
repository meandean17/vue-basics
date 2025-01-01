import { ref, provide, inject } from 'vue'

const notificationKey = Symbol('notification');

export function provideNotification() {
    const notifications = ref([]);

    const addNotification = (message, type = 'info') => {
        const id = Date.now();
        notifications.value.push({ id, message, type });

        // Auto-remove after 3 seconds
        setTimeout(() => {
            removeNotification(id);
        }, 3000);
    };

    const removeNotification = (id) => {
        notifications.value = notifications.value.filter(n => n.id !== id);
    };

    provide(notificationKey, {
        notifications,
        addNotification,
        removeNotification
    });

    return {
        notifications,
        addNotification,
        removeNotification
    };
}

export function useNotification() {
    const notification = inject(notificationKey);
    if (!notification) {
        throw new Error('Notification system not provided');
    }
    return notification;
}