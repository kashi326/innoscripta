import api from '../axios'
import axios from 'axios'
import {create} from 'zustand'
import useUsersStore from "./users";

const useArticleStore = create((set, get) => ({
    articles: [],
    cancelToken: null,
    loading: true,
    getToken: useUsersStore.getState().getToken(),
    fetchAllArticles: async (queryParams={}) => {
        set({loading: true})
        const state = get();
        if (state.cancelToken && state.cancelToken?.cancel) {
            state.cancelToken?.cancel('Request cancelled');
        }
        // Create a new cancel token for the current request
        const cancelToken = axios.CancelToken.source();
        set({cancelToken});


        const params =  Object.fromEntries(
            Object.entries(queryParams).filter(([key, value]) => value !== '')
        );
        const token = state.getToken
        try {
            const response = await api.get('/api/articles', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params,
                cancelToken: cancelToken.token
            });
            const articles = response.data;
            set({
                articles: articles
            });
        } catch (error) {
            // Handle error
        } finally {
            set({loading: false})
        }
    },

    updateCurrentPage: (currentPage) => {
        set({
            pagination: {
                ...get().pagination,
                currentPage
            }
        });
    },
}));

export default useArticleStore;
