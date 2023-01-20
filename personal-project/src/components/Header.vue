<template>
  <header
    class="flex w-full justify-between shadow-[10px_2px_8px_-3px_#000000] items-center px-[20px] py-[15px] h-[70px]"
  >
    <div>Logo</div>
    <div class="flex items-center gap-[50px]">
      <PSwitch
        v-model="modeTheme"
        size="large"
        :inActiveIcon="Moon"
        :activeIcon="Sunny"
      />
      <div>
        <PDropdown>
          <template v-slot:content>
            <PAvatar shape="circle" :size="50" :src="avatarImage" />
          </template>
        </PDropdown>
      </div>
    </div>
  </header>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { avatarImage } from "@/constans/index";
import { Moon, Sunny } from "@element-plus/icons-vue";
import { useThemeConfigStore } from "@/store/theme/useThemeConfigStore";

const { setTheme } = useThemeConfigStore();

const modeTheme = ref(false);

onMounted(() => {
  setTheme(modeTheme.value);
});

watch(
  () => modeTheme.value,
  () => {
    setTheme(modeTheme.value);
  }
);
</script>

<style scoped></style>
