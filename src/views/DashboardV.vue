<template>
    <div class="dashboard">
        <div class="container">
            <div class="row">
                <div class="col-md-3">
                    <SideBar style="z-index: 2;" />
                </div>
                <div class="col-md-9">
                    <header class="content-header">
                        <nav class="navbar fixed-top navbar-expand-lg bg-light" style="z-index: 1;">
                            <div class="container-md">
                                <a class="navbar-brand" href="#">Navbar</a>
                            </div>
                        </nav>
                    </header>
                    <div class="container-fluid  pl-3 pr-3 ">
                        <el-tabs v-model="activeTab">
                            <el-tab-pane label="Peserta Didik" name="tab1">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title"></h5>
                                        <el-form class="form-inline" :model="formInline" label-position="top">
                                            <el-row>
                                                <el-col :span="5">
                                                    <el-form-item>
                                                        <el-input v-model="alamat" placeholder="Cari Nisn / Nis"></el-input>
                                                    </el-form-item>
                                                    <el-form-item>
                                                        <el-select v-model="alamat" placeholder="Pilih Status">
                                                            <el-option label="Aktif" value="Aktif"></el-option>
                                                            <el-option label="Non Aktif" value="Non Aktif"></el-option>
                                                            <!-- Tambahkan pilihan lainnya sesuai kebutuhan -->
                                                        </el-select>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="5">
                                                    <el-form-item>
                                                        <el-select v-model="opsijurusan" placeholder="Pilih jurusan">
                                                            <el-option v-for="jurusan in jurusan" :value="jurusan.id"
                                                                :label="jurusan.nama" :key="jurusan.id"></el-option>
                                                        </el-select>
                                                    </el-form-item>
                                                    <el-form-item>
                                                        <el-select v-model="opsikelas" placeholder="Pilih Kelas">
                                                            <el-option v-for="kelas in kelas" :value="kelas.id"
                                                                :label="kelas.nama" :key="kelas.id"></el-option>
                                                        </el-select>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="2.8">
                                                    <el-form-item>
                                                        <el-button type="primary" class="large-button">Import
                                                            Excel</el-button>
                                                    </el-form-item>
                                                    <el-form-item>
                                                        <el-button type="primary" class="large-button">Lihat
                                                            Dokumen</el-button>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="2.8">
                                                    <el-form-item>
                                                        <el-button type="primary" class="large-button">Tambah</el-button>
                                                    </el-form-item>
                                                    <el-form-item>
                                                        <el-button type="primary" class="large-button">Data
                                                            Arsip</el-button>
                                                    </el-form-item>
                                                </el-col>
                                            </el-row>
                                        </el-form>
                                        <div class="tab-content">
                                            <p class="total-data">Total {{ totalSiswa }} ditampilkan dari {{ totalData }}
                                                data</p>
                                            <el-table :header-cell-style="{ background: '#c6e2ff' }" border :data="siswa"
                                                style="width: 100%">
                                                <el-table-column label="NIS / NIK" width="150">
                                                    <template #default="{ row }">
                                                        {{ row.nis }} / {{ row.nik }}
                                                    </template>
                                                </el-table-column>
                                                <el-table-column prop="nama" label="Nama"></el-table-column>
                                                <el-table-column prop="jurusan" label="Jurusan"></el-table-column>
                                                <el-table-column prop="kelas" label="Kelas"></el-table-column>
                                                <el-table-column label="Status" width="140">
                                                    <template #default="{ row }">
                                                        <el-switch v-model="row.status" active-value="aktif"
                                                            inactive-value="nonaktif"
                                                            @change="updateStatus(row)"></el-switch>
                                                        <span style="margin-left: 20px;">{{ getStatusLabel(row.status)
                                                        }}</span>
                                                    </template>

                                                </el-table-column>
                                            </el-table>
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="Guru & Tendik" name="tab2">
                                <Guru />
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { mapState, mapActions } from "vuex";
import SideBar from "@/components/SideBar.vue";
import Guru from "@/components/Guru.vue";

export default {
    name: "DashboardV",
    components: {
        SideBar,
        Guru,
    },
    data() {
        return {
            activeTab: 'tab1',
            activeTab: "tab2",
            opsijurusan: null,
            opsikelas: null,
        };
    },
    computed: {
        ...mapState(["siswa", "jurusan", "kelas", "opsistatus", "totalSiswa"]),
        totalData() {
            return this.siswa.length;
        },
    },
    methods: {
        ...mapActions(["fetchSiswa", "fetchJurusan", "fetchKelas", "updateSiswaStatus"]),
        getStatusLabel(status) {
            return status === "aktif" ? "Aktif" : "Nonaktif";
        },
        updateStatus(siswa) {
            this.updateSiswaStatus({
                id: siswa.id,
                status: siswa.status,
            });
        },
    },
    mounted() {
        this.fetchSiswa();
        this.fetchJurusan();
        this.fetchKelas();
    },
};
</script>
  
<style scoped>
.dashboard {
    padding: 20px;
}

.card {
    width: 100%;

    margin-top: 50px;
}

.content-header {
    margin-bottom: 20px;
}

.tab-content {
    padding: 20px;
}

.large-button {
    font-size: 15px;
    padding: 10px 20px;
    width: 180px;
}

.el-tabs {
    margin-top: 20px;
    margin-left: 10px;
    margin-top: 90px;
}

.el-form-item {
    margin-right: 10px;
}

.status-column {
    display: flex;
    align-items: center;
}

.status-label {
    margin-left: 10px;
}

.total-data {
    margin-bottom: 15px;
    font-size: 14px;
    color: #777;
}
</style>