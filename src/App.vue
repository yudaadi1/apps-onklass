<template>
  <div class="wrapper">
    <div id="content">
      <div>
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>

import SideBar from "@/components/SideBar";
export default {
  name: 'App', components: { SideBar },

}
</script>

<style>
.body {
  margin: 0;
  font-family: Rubik;
  font-size: .875rem;
  font-weight: 400;
  line-height: 1.5;
  color: #323f4b;
  text-align: left;
  background-color: #d9d4d4;
}

#app .body {
  font-family: Rubik;
  font-size: .875rem;
  line-height: 1.5rem;
  background-color: #959dae;
}

.wrapper {
  width: 100%;
  align-items: stretch;
}
</style>
