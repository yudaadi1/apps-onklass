<template>
    <nav class="sidebar" :class="{ 'active': isSidebarVisible }" v-if="isSidebarVisible">
        <div class="sidebar-header">
            <div class="d-flex align-items-center">
                <h4 class="sidebar-title">Portal Statistik</h4>
            </div>
        </div>
        <ul class="list-unstyled components">
            <li class="menu-group">
                <h6 class="group-header">Data Induk</h6>
                <ul class="submenu-list">
                    <li>
                        <a href="#">
                            <i class="fas fa-home"></i>
                            <span class="menu-text" style="margin-left: 10px;">Beranda</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i class="fa-regular fa-user"></i>
                            <span class="menu-text" style="margin-left: 10px;">Buku Induk</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i class="fa-solid fa-school"></i>
                            <span class="menu-text" style="margin-left: 10px;">Sekolah</span>
                        </a>
                    </li>
                </ul>
            </li>
            <li class="menu-group">
                <h6 class="group-header">Layanan Akademik</h6>
                <ul class="submenu-list">
                    <li>
                        <a href="#">
                            <i class="fa-solid fa-school-flag"></i>
                            <span class="menu-text" style="margin-left: 10px;">Asesmen</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i class="fa-solid fa-graduation-cap"></i>
                            <span class="menu-text" style="margin-left: 10px;">Pembelajaran</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i class="fa-brands fa-discourse"></i>
                            <span class="menu-text" style="margin-left: 10px;">Konseling</span>
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
    </nav>
</template>
  
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    name: "Sidebar",
    computed: {
        ...mapGetters(['isSidebarVisible'])
    },
    methods: {
        ...mapMutations(['toggleSidebar']),
    },
};
</script>
  
<style scoped>
.sidebar-title {
    margin: 0;
    color: white;
    font-size: 1.25rem;
}

.sidebar.active {
    left: 0;
    /* Show the sidebar when active */
}

.sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    left: -250px;
    width: 250px;
    height: 100vh;
    background-color: white;
    color: #333;
    transition: margin-left 0.3s ease;
    z-index: 1000;
    overflow-y: auto;
    border-radius: 2px;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
}

.sidebar-header {
    padding: 20px;
    text-align: center;
    background-color: #343a40;
}


.sidebar-header h4 {
    margin: 0;
    color: white;
}

.menu-group {
    margin-top: 20px;
}

.group-header {
    margin: 0;
    padding: 8px 15px;
    font-size: 12px;
    font-weight: bold;
    color: #333;

}

.menu-item {
    padding: 10px 15px;
    text-align: left;
    text-decoration: none;
    color: black;
    display: flex;
    align-items: center;
    transition: background-color 0.3s;
}

.menu-item:hover {
    background-color: #5068cf;
}

.menu-item:hover .menu-icon,
.menu-item:hover .menu-text {
    color: white;
}

.menu-icon {
    margin-right: 10px;
    font-size: 16px;
}

.menu-text {
    font-size: 14px;
}

.submenu-list {
    list-style: none;
    padding-left: 0;
}

.submenu-list li a {
    padding: 10px 15px;
    text-align: left;
    text-decoration: none;
    color: black;
    display: flex;
    align-items: center;
}

.submenu-list li a:hover {
    background-color: #5068cf;
}
</style>