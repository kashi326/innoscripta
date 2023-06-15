import {create} from 'zustand';
import api from "../axios";
import {persist} from "zustand/middleware";

const useUsersStore = create(
    persist(
        (set, get) => ({
            currentUser: null,
            loading: false,
            language: 'en',
            getToken: () => get().currentUser?.access_token || null,
            isAuthenticated: () => !!get().currentUser,
            login: async (credentials) => {
                set({loading: true});
                try {
                    const response = await api.post('/api/login', credentials);
                    const user = response.data;
                    set({currentUser: user, loading: false});
                } catch (error) {
                    set({loading: false});
                    throw error;
                }
            },
            signup: async (userData) => {
                set({loading: true});
                try {
                    const response = await api.post('/api/register', userData);
                    const user = response.data;
                    set({currentUser: user, loading: false});
                } catch (error) {
                    set({loading: false});
                    throw error;
                }
            },
            logout: async () => {
                set({loading: true});
                try {
                    await api.post('/api/logout', {}, {
                        headers: {
                            Authorization: `Bearer ${get().getToken()}`,
                        },
                    });
                    set({currentUser: null});
                } finally {
                    set({loading: false});
                }
            },
        }),
        {
            name: 'users'
        }
    ),
);

export default useUsersStore;
