<!--<template>-->
<!--  <div class="w-full centered-item-center">-->
<!--    <el-table-->
<!--      border-->
<!--      stripe-->
<!--      :default-sort="sortColumns"-->
<!--      :data="filteredDate"-->
<!--      height="300"-->
<!--      class="w-[600px]"-->
<!--    >-->
<!--      <el-table-column prop="time" label="Date" width="140">-->
<!--        <template #default="scope">-->
<!--          <span>-->
<!--            {{ foramtterForTableColTime(scope.row.time) }}-->
<!--          </span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="description"-->
<!--        sortable-->
<!--        label="Description"-->
<!--        width="220"-->
<!--      />-->
<!--      <el-table-column prop="amount" sortable label="Amount" width="150">-->
<!--        <template #default="scope">-->
<!--          <span>-->
<!--            {{-->
<!--              scope.row.amount < 0 ? formatterBankBalance(scope.row.amount) : ""-->
<!--            }}-->
<!--          </span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column prop="currencyCode" label="Currency" width="90">-->
<!--        <template #default="scope">-->
<!--          <span>-->
<!--            {{ convertorISO4217(scope.row.currencyCode) }}-->
<!--          </span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--    </el-table>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import { defineProps, onMounted, ref, watch } from "vue";-->
<!--import { useUserBankAccountStore } from "@/store/useUserBankAccountStore";-->
<!--import dayjs from "dayjs";-->
<!--import { formatterBankBalance } from "@/helpers/formatterBankBalance";-->
<!--import { convertorISO4217 } from "@/helpers/convertorISO4217";-->

<!--const props = defineProps({-->
<!--  startDate: { type: [Number, String] },-->
<!--  endDate: { type: [String, Number] },-->
<!--});-->

<!--const sortColumns = ref(-->
<!--  { prop: "amount", order: "descending" },-->
<!--  { prop: "description", order: "descending" }-->
<!--);-->
<!--const { getUserBankStatement } = useUserBankAccountStore();-->

<!--const foramtterForTableColTime = (time) => {-->
<!--  let temp = new Date(time * 1000);-->
<!--  return dayjs(temp).format("YYYY-MM-DD");-->
<!--};-->

<!--const tableData = ref([]);-->
<!--const filteredDate = ref([]);-->
<!--onMounted(async () => {-->
<!--  tableData.value = await getUserBankStatement();-->
<!--  filteredDate.value = [...tableData.value];-->
<!--});-->

<!--watch(-->
<!--  () => [props.endDate, props.startDate],-->
<!--  () => {-->
<!--    if (props.endDate && props.startDate) {-->
<!--      filteredDate.value = tableData.value?.filter((el) => {-->
<!--        return props.startDate <= el.time && props.endDate >= el.time;-->
<!--      });-->
<!--    }-->
<!--  }-->
<!--);-->
<!--</script>-->
<template>
  <div class="w-full centered-item-center">
    <el-table
      border
      stripe
      :default-sort="sortColumns"
      :data="filteredDate"
      height="300"
      class="w-[600px]"
    >
      <el-table-column prop="time" label="Date" width="140">
        <template #default="scope">
          <span>
            {{ foramtterForTableColTime(scope.row.time) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="description"
        sortable
        label="Description"
        width="220"
      />
      <el-table-column prop="amount" sortable label="Amount" width="150">
        <template #default="scope">
          <span>
            {{
              scope.row.amount < 0 ? formatterBankBalance(scope.row.amount) : ""
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="currencyCode" label="Currency" width="90">
        <template #default="scope">
          <span>
            {{ convertorISO4217(scope.row.currencyCode) }}
          </span>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="No data" />
      </template>
    </el-table>
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref, watch } from "vue";
import { useUserBankAccountStore } from "@/store/bank-account/useUserBankAccountStore";
import dayjs from "dayjs";
import { formatterBankBalance } from "@/helpers/formatterBankBalance";
import { convertorISO4217 } from "@/helpers/convertorISO4217";

const props = defineProps({
  startDate: { type: [Number, String] },
  endDate: { type: [String, Number] },
});

const sortColumns = ref(
  { prop: "amount", order: "descending" },
  { prop: "description", order: "descending" }
);
const { getUserBankStatement } = useUserBankAccountStore();

const foramtterForTableColTime = (time) => {
  let temp = new Date(time * 1000);
  return dayjs(temp).format("YYYY-MM-DD");
};

const tableData = ref([]);
const filteredDate = ref([]);
onMounted(async () => {
  tableData.value = await getUserBankStatement();
  filteredDate.value = [...tableData.value];
});

// filter from - to
watch(
  () => [props.endDate, props.startDate],
  () => {
    if (props.endDate && props.startDate) {
      filteredDate.value = tableData.value?.filter((el) => {
        return props.startDate <= el.time && props.endDate >= el.time;
      });
    }
  }
);
</script>
