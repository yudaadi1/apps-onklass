// store/guru.js
import axios from 'axios';

const state = {
    guru: [],
    opsiperanan: [],
    opsiperanan1: null
};

const mutations = {
    setGuru(state, guru) {
        state.guru = guru;
    },
    setOpsiPeranan(state, opsiperanan) {
        state.opsiperanan = opsiperanan;
    },
    setOpsiP(state, opsiperanan) {
        state.opsiperanan = opsiperanan;
    },
    updateGuruStatus(state, { id, status }) {
        const guruToUpdate = state.guru.find(g => g.id === id);
        if (guruToUpdate) {
            guruToUpdate.status = status;
        }
    },
};

const actions = {
    async fetchGuru({ commit }) {
        try {
            const response = await axios.get('http://localhost:3000/guru');
            const guru = response.data;
            commit('setGuru', guru);
        } catch (error) {
            console.error('Error fetching guru:', error);
        }
    },
    async fetchPeran({ commit }) {
        try {
            const response = await axios.get('http://localhost:3000/opsiperanan');
            const prn = response.data;
            commit('setOpsiPeranan', prn);
        } catch (error) {
            console.error('Error fetching peran:', error);
        }
    },
    async updateGuruStatus({ commit }, { id, status }) {
        try {
            await axios.patch(`http://localhost:3000/guru/${id}`, { status });
            commit('updateGuruStatus', { id, status });
        } catch (error) {
            console.error('Error updating guru status:', error);
        }
    },
};

const getters = {
    guru: state => state.guru,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
