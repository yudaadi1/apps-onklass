import { createStore } from 'vuex';
import usersData from '@/../data/user.json';
import sekolahData from '@/../data/sekolah.json';
import guruModule from './guru';
const store = createStore({
  modules: {
    guru: guruModule, // Register your guru module
  },
  state() {
    return {
      isSidebarVisible: false,
      sekolah: [],
      users: usersData, // Using the imported usersData
      selectedSekolah: null,
      loggedInUser: null,
      siswa: [],
      totalSiswa: 0,
      jurusan: [],
      opsijurusan: null,
      kelas: [],
      opsikelas: null,
      opsistatus: ["aktif", "nonaktif"],
    };
  },
  mutations: {
    setSidebarVisibility(state, isVisible) {
      state.isSidebarVisible = isVisible;
    },
    toggleSidebar(state) {
      state.isSidebarVisible = !state.isSidebarVisible;
    },
    setSekolah(state, sekolah) {
      state.sekolah = sekolah;
    },
    setUsers(state, users) {
      state.users = users;
    },
    setSelectedSekolah(state, sekolah) {
      state.selectedSekolah = sekolah;
    },
    setOpsiJurusan(state, jurusan) {
      state.opsijurusan = jurusan;
    },
    setLoggedInUser(state, user) {
      state.loggedInUser = user;
    },
    setSiswa(state, siswa) {
      state.siswa = siswa;
    },
    setTotalSiswa(state, total) {
      state.totalSiswa = total;
    },
    setJurusan(state, jurusan) {
      state.jurusan = jurusan
    },
    setKelas(state, kelas) {
      state.kelas = kelas
    },
    setOpsiKelas(state, kelas) {
      state.opsikelas = kelas
    },
    updateSiswaStatus(state, { id, status }) {
      const siswaToUpdate = state.siswa.find(siswa => siswa.id === id);
      if (siswaToUpdate) {
        siswaToUpdate.status = status;
      }
    },
  },
  actions: {
    toggleSidebar({ commit }) {
      commit('toggleSidebar');
    },
    fetchSekolah({ commit }) {
      commit('setSekolah', sekolahData);
    },
    fetchUsers({ commit }) {
      commit('setUsers', usersData);
    },
    async login({ state, commit }, { nis, password, selectedSekolah }) {
      if (selectedSekolah) {
        const user = state.users.find(
          user =>
            user.nis === nis &&
            user.password === password &&
            user.id_sekolah === selectedSekolah
        );
        if (user) {
          commit('setLoggedInUser', user);
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    async fetchSiswa({ commit }) {
      try {
        const response = await fetch('http://localhost:3000/siswa');
        const student = await response.json();
        commit('setTotalSiswa', student.length);
        commit('setSiswa', student);
      } catch (error) {
        console.error('Error fetching siswa:', error);
      }
    },
    async fetchJurusan({ commit }) {
      try {
        const response = await fetch('http://localhost:3000/jurusan');
        const jrs = await response.json();
        commit('setJurusan', jrs);
      } catch (error) {
        console.error('Error fetching siswa:', error);
      }
    },
    async fetchKelas({ commit }) {
      try {
        const response = await fetch('http://localhost:3000/kelas');
        const kls = await response.json();
        commit('setKelas', kls);
      } catch (error) {
        console.error('Error fetching kelas:', kls);
      }
    },
    async updateSiswaStatus({ commit }, { id, status }) {
      if (this.state.opsistatus.includes(status)) {
        try {
          // Kirim permintaan HTTP ke server untuk memperbarui status siswa
          await fetch(`http://localhost:3000/siswa/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
          });

          // Jika berhasil, komit mutasi untuk memperbarui status di state
          commit('updateSiswaStatus', { id, status });
        } catch (error) {
          console.error('Error updating siswa status:', error);
        }
      } else {
        console.error('Invalid status');
      }
    },
  },
  getters: {
    isSidebarVisible: state => {
      return state.isSidebarVisible;
    },
    loggedInUser: state => {
      return state.loggedInUser;
    },
  },
});
const loggedInUserFromLocalStorage = JSON.parse(localStorage.getItem('loggedInUser'));
if (loggedInUserFromLocalStorage) {
  store.commit('setLoggedInUser', loggedInUserFromLocalStorage);
}
export default store;
