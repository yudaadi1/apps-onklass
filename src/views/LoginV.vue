<template>
  <div class="login">
    <div class="col-md-10 left-side">
      <img class="login-image" :src="require('@/assets/login.png')" alt="Login Image">
      <h2>Solusi Tepat Kemudahan Sistem dan Manajemen Sekolah</h2>
      <p>Layanan integrasi PPDB, PSB, pembelajaran daring, rekap absensi, sistem manajemen dan kebutuhan transaksi
        pembayaran non tunai di sekolah</p>
    </div>
    <div class="col-md-2 right-side">
      <div class="card smaller-card">
        <div class="card-body d-flex flex-column align-items-start justify-content-center">
          <h5 class="card-title mb-3 mt-n3">Login</h5>
          <form @submit.prevent="handleLogin" class="w-100">
            <div class="mb-3">
              <div class="input-icon">
                <i class="fa-solid fa-search"></i>
                <select v-model="selectedSekolah" class="form-control smaller-input">
                  <option v-for="sekolah in sekolah" :key="sekolah.id" :value="sekolah.id">
                    {{ sekolah.nama }}
                  </option>
                </select>
              </div>
            </div>
            <div class="mb-3">
              <div class="input-icon">
                <input v-model="nis" type="text" class="form-control smaller-input" placeholder="NIS / NIK">
              </div>
            </div>
            <div class="mb-3">
              <div class="input-icon">
                <i class="fas fa-lock"></i>
                <input v-model="password" type="password" class="form-control smaller-input"
                  placeholder="Masukkan Password">
              </div>
            </div>
            <button class="btn btn-primary btn-sm" type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'LoginV',
  data() {
    return {
      nis: '',
      password: '',
      selectedSekolah: null
    };
  },
  computed: {
    ...mapState(['sekolah']),
  },
  methods: {
    ...mapActions(['fetchSekolah', 'login']),
    async handleLogin() {
      if (this.nis && this.password && this.selectedSekolah) {
        const isLoggedIn = await this.login({ nis: this.nis, password: this.password, selectedSekolah: this.selectedSekolah });
        if (isLoggedIn) {
          this.$router.push('/dashboard'); // Redirect to dashboard after successful login
          const user = this.$store.state.loggedInUser;
          this.$store.commit('setLoggedInUser', user);
          localStorage.setItem('loggedInUser', JSON.stringify(user));
        } else {
          console.log('Login gagal');
        }
      } else {
        console.log('Isi semua kolom login');
      }
    },

  },
  mounted() {
    this.fetchSekolah();
  },
};
</script>


<style scoped>
.input-icon {
  position: relative;
}

.input-icon i {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  color: #ccc;
}

.login {
  display: flex;
  height: 100vh;
}

.loading-indicator {
  color: #007bff;
  margin-top: 5px;
}

.left-side {
  flex: 1.4;
  background-color: #007bff;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.card-title {

  align-self: flex-start;
  margin-left: 20px;
  margin-top: -15px;
}

.left-side h2,
.left-side p {
  text-align: center;
}

.text-password {
  justify-content: center;
  align-items: center;
}

.right-side {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: whitesmoke;

}

.card {
  width: 100%;
  max-width: 400px;
  border: 1px solid #ccc;
  border-radius: 20px;
  box-shadow: 0 10px 6px rgba(0, 0, 0, 0.1);
}


.smaller-card {
  max-width: 350px;
  margin: 0 auto;
  height: 350px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.smaller-input {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  font-size: 12px;
  margin-bottom: 10px;
  margin-top: 10px;
  /* Add margin-top to push inputs down */
}

.card-body {
  padding: 20px;
}

.btn-primary {
  width: 100%;
  padding: 10px;
}

@media (max-width: 767px) {
  .home {
    flex-direction: column;
  }

  .left-side {
    display: none;
  }

  .right-side {
    padding-top: 40px;
  }
}
</style>
