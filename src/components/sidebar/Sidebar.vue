<template>
  <aside>
    <nav class="h-full">
      <el-menu
        class="el-menu-vertical-demo h-[90vh]"
        :collapse="isCollapse"
        active-text-color="#7ee787"
        background-color="#545c64"
        :default-active="activeDashboard()"
        text-color="#fff"
        router
      >
        <SidebarItem
          v-for="item in sidebarNav"
          :key="item.id"
          :title="item.name"
          :icon="item.icon"
          :link="item.link"
          :index="item.id"
        />
        <button
          @click="onCollapse"
          class="w-full p-4 flex justify-center absolute bottom-0"
        >
          <el-icon
            color="white"
            v-show="isCollapse"
            @mouseover="mouseOnElement = true"
            @mouseleave="mouseOnElement = false"
          >
            <p-icon
              size="xl"
              :mouseOnElement="mouseOnElement"
              icon="fa-solid fa-angles-right"
            />
          </el-icon>
          <el-icon
            v-show="!isCollapse"
            color="white"
            @mouseover="mouseOnElement = true"
            @mouseleave="mouseOnElement = false"
          >
            <p-icon
              size="xl"
              moveArrowLeft
              :mouseOnElement="mouseOnElement"
              icon="fa-solid fa-angles-left"
            />
          </el-icon>
        </button>
      </el-menu>
    </nav>
  </aside>
</template>

<script setup>
import SidebarItem from "@/components/sidebar/SidebarItem.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

const isCollapse = ref(true);
const mouseOnElement = ref(false);
const route = useRoute();

const sidebarNav = ref([
  {
    id: "1",
    name: "Dashboard",
    title: "Dashboard",
    link: "/",
    icon: "fa-solid fa-border-all",
  },
  {
    id: "2",
    name: "Income",
    title: "Income",
    link: "/income",
    icon: "fa-solid fa-money-bill-trend-up",
  },
  {
    id: "3",
    name: "Calendar",
    title: "Calendar",
    link: "/calendar",
    icon: "fa-regural fa-calendar-days",
  },
]);

const activeDashboard = () => {
  let id;
  sidebarNav.value.map((el) => {
    if (el.name === route.name) {
      id = el.id;
    }
  });
  return id;
};

const onCollapse = () => {
  return (isCollapse.value = !isCollapse.value);
};
</script>

<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 220px;
  min-height: 400px;
}
</style>
