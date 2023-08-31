<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Guru & tenaga didik</h5>
            <el-form class="form-inline" :model="formInline" label-position="top">
                <el-row>
                    <el-col :span="4">
                        <el-form-item>
                            <el-input v-model="alamat" placeholder="Cari NIP / NIS"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item>
                            <el-select v-model="opsiperanan1" placeholder="Peranan">
                                <el-option v-for="opsiperanan in opsiperanan" :value="opsiperanan.id"
                                    :label="opsiperanan.nm" :key="opsiperanan.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item>
                            <el-select v-model="opsikelas" placeholder="Pilih Kelas">
                                <el-option v-for="kelas in kelas" :value="kelas.id" :label="kelas.nama"
                                    :key="kelas.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item>
                            <el-button type="primary" class="large-button">Tambah</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item>
                            <el-button type="primary" class="large-button">Import
                                Excel</el-button>
                        </el-form-item>

                    </el-col>
                    <el-col :span="3">
                        <el-form-item>
                            <el-button style="margin-left: 25px;" type="primary" class="large-button">Data
                                Arsip</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div class="tab-content">
                <el-table :header-cell-style="{ background: '#c6e2ff' }" border :data="guru" style="width: 100%">
                    <el-table-column label="NIP / NUPTK" width="150">
                        <template #default="{ row }">
                            {{ row.nip }} / {{ row.nuptk }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="nama" label="Nama"></el-table-column>
                    <el-table-column prop="peranan" label="Peran"></el-table-column>
                    <el-table-column label="Status" width="140">
                        <template #default="{ row }">
                            <el-switch v-model="row.status" active-value="aktif" inactive-value="nonaktif"></el-switch>
                            <span>{{ getStatusLabel(row.status) }}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
  
<script>
import { mapState, mapActions } from 'vuex';
import axios from 'axios';

export default {
    name: "Guru",
    data() {
        return {
            opsiperanann1: null,

        }
    },
    computed: {
        ...mapState('guru', ['guru', 'opsiperanan', 'opsikelas']),
    },
    methods: {
        ...mapActions('guru', ['fetchGuru', 'fetchPeran', 'fetchKelas', 'updateGuruStatus']),
        getStatusLabel(status) {
            return status === "aktif" ? "Aktif" : "Nonaktif";
        },
        updateStatus(guru) {
            this.updateGuruStatus({
                id: guru.id,
                status: guru.status,
            });
        },
    },
    mounted() {
        this.fetchGuru();
        this.fetchPeran();
    },
};
</script>
<style scoped>
.card {
    width: 100%;
    margin-top: 50px;
}

.form-inline .el-form-item {
    margin-right: 10px;
}

.large-button {
    font-size: 15px;
    padding: 10px 20px;
    width: 180px;
}

.tab-content {
    padding: 20px;
}

/* Additional styling for table */
.el-table {
    width: 100%;
}

/* Styling for switch and status label */
.el-switch {
    margin-right: 10px;
}
</style>