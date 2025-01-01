export const formatUserName = (firstName, lastName) => {
    return `${firstName} ${lastName}`;
}

export default class UserServer {
    constructor() {
        this.users = new Map();

        this.roles = new Set(['user', 'admin', 'guest']);
    }

    addUser({ id, firstName, lastName, roles = ['user'] }) {
        const userRoles = [...new Set([...roles, 'user'])];

        const user = {
            id,
            firstName,
            lastName,
            fullName: formatUserName(firstName, lastName),
            roles: userRoles,
            createdAt: new Date(),
        };

        this.users.set(id, user);
        return user;
    }

    getUser(id) {
        const user = this.users.get(id);
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }

        const { id: userId, ...userDetails } = user;
        return userDetails;
    }

    updateUser(id, updates) {
        if (!this.users.has(is)) {
            throw new Error(`User with id ${id} not found`);
        }

        const updatedUser = {
            ...this.users.get(id),
            ...updates,
            updatedAt: new Date(),
        };

        this.users.set(id, updatedUser);
        return updatedUser;
    }
}