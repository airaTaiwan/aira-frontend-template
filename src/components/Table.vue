<script setup lang="ts" generic="T extends { uuid: string }">
import type {
  VxeGridProps,
  VxeGridPropTypes,
  VxePagerDefines,
  VxePagerEvents,
  VxeTableInstance,
  VxeTablePropTypes,
} from 'vxe-table'

const {
  tableConfig = {},
  tableData = [],
  tableToolbarConfig = {},
  pagerConfig = {
    currentPage: 1,
    pageSize: 10,
  },
  columns = [],
  actionBtn = true,
  pagerAble = false,
} = defineProps<{
  tableConfig?: VxeGridProps
  tableData?: T[]
  tableToolbarConfig?: VxeGridPropTypes.ToolbarConfig
  pagerConfig?: VxeGridPropTypes.PagerConfig
  columns?: VxeGridPropTypes.Columns
  actionBtn?:
    | boolean
    | {
      edit?: boolean
      copy?: boolean
      remove?: boolean
    }
  pagerAble?: boolean
}>()

const emit = defineEmits<{
  onEdit: [row: T]
  onCopy: [row: T]
  onRemove: [row: T]
  checkboxAll: [records: T[]]
  checkboxChange: [records: T[]]
  radioChange: [row: T]
  pageChange: [Pick<VxePagerDefines.PageChangeEventParams, 'currentPage' | 'pageSize'>]
}>()

const defaultGridTableConfig: VxeGridProps = {
  round: true,
  border: true,
  autoResize: true,
  align: 'center',
  height: 'auto',
  showOverflow: 'tooltip',
  scrollY: {
    enabled: false,
  },
  columnConfig: {
    useKey: true,
  },
  rowConfig: {
    useKey: true,
    keyField: 'uuid',
    isHover: true,
  },
}

const defaultPagerConfig: VxeGridPropTypes.PagerConfig = {
  enabled: true,
  autoHidden: false,
}

const tableRef = shallowRef<VxeTableInstance<T>>()
const selectedIds = ref<string[]>([])

const isLoading = defineModel('isLoading', { default: false })

// PERF: computed 觸發太多次
const mergedTableConfig = computed<VxeGridProps>(() => {
  const newRowConfig: VxeTablePropTypes.RowConfig = {
    ...defaultGridTableConfig.rowConfig,
    ...tableConfig?.rowConfig,
  }

  const _pagerConfig: VxeGridPropTypes.PagerConfig | undefined = pagerAble
    ? {
        ...defaultPagerConfig,
        ...pagerConfig,
      }
    : undefined

  return {
    ...defaultGridTableConfig,
    ...tableConfig,
    data: tableData,
    pagerConfig: _pagerConfig,
    loading: isLoading.value,
    rowConfig: newRowConfig,
    toolbarConfig: Object.keys(tableToolbarConfig).length > 0 ? tableToolbarConfig : undefined,
  }
})

const slots = computed(() => {
  const newSlots = []

  for (const column of columns) {
    if (!column.slots)
      continue

    for (const [key, value] of Object.entries(column.slots)) {
      newSlots.push({
        key,
        value,
      })
    }
  }

  return newSlots as { key: string, value: string }[]
})

function selectAllChangeEvent() {
  if (tableRef.value) {
    const records = tableRef.value.getCheckboxRecords()
    selectedIds.value = records.map(item => item._id)
    emit('checkboxAll', records)
  }
}

function selectChangeEvent() {
  if (tableRef.value) {
    const records = tableRef.value.getCheckboxRecords()
    selectedIds.value = records.map(item => item._id)
    emit('checkboxChange', records)
  }
}

function radioChangeEvent() {
  if (tableRef.value) {
    const records = tableRef.value.getRadioRecord()
    if (records !== null)
      emit('radioChange', records)
  }
}

function setRadioRow(data: T) {
  if (tableRef.value) {
    tableRef.value.setRadioRow(data)
  }
}

function setSelectRow(rows: T[], checked: boolean) {
  if (tableRef.value) {
    tableRef.value.setCheckboxRow(rows, checked)
  }
}

function toggleCheckboxRow(row: T) {
  if (tableRef.value) {
    tableRef.value.toggleCheckboxRow(row)
  }
}

const handlePageChange: VxePagerEvents.PageChange = ({ currentPage, pageSize }) => {
  emit('pageChange', { currentPage, pageSize })
}

defineExpose({
  isLoading,
  setRadioRow,
  setSelectRow,
  toggleCheckboxRow,
  selectedIds,
})
</script>

<template>
  <VxeGrid
    ref="tableRef"
    class="vxe-table"
    :data="tableData"
    :columns
    v-bind="mergedTableConfig"
    @checkbox-change="selectChangeEvent"
    @checkbox-all="selectAllChangeEvent"
    @radio-change="radioChangeEvent"
    @page-change="handlePageChange"
  >
    <template
      v-for="(value, key) in tableToolbarConfig?.slots"
      :key="key"
      #[value!.toString()]="props"
    >
      <slot :name="value" :props />
    </template>

    <template v-for="slot in slots" :key="slot.value" #[slot.value]="props">
      <slot :name="slot.value" :props />
    </template>

    <template v-if="typeof actionBtn === 'boolean' && actionBtn" #action="{ row }">
      <VxeButton type="text" icon="vxe-custom-icon-settings" @click="$emit('onEdit', row)" />
      <VxeButton type="text" icon="vxe-custom-icon-copy" @click="$emit('onCopy', row)" />
      <VxeButton type="text" icon="vxe-custom-icon-trash" @click="$emit('onRemove', row)" />
    </template>

    <template v-else #action="{ row }">
      <slot name="custom-action" :props="row" />

      <VxeButton
        v-if="typeof actionBtn === 'object' && actionBtn.edit"
        type="text"
        icon="vxe-custom-icon-settings"
        @click="$emit('onEdit', row)"
      />
      <VxeButton
        v-if="typeof actionBtn === 'object' && actionBtn.copy"
        type="text"
        icon="vxe-custom-icon-copy"
        @click="$emit('onCopy', row)"
      />
      <VxeButton
        v-if="typeof actionBtn === 'object' && actionBtn.remove"
        type="text"
        icon="vxe-custom-icon-trash"
        @click="$emit('onRemove', row)"
      />
    </template>
  </VxeGrid>
</template>

<style scoped>
.vxe-table {
  width: 100%;
}

.vxe-table:has(.vxe-grid--pager-wrapper) :deep(.vxe-table--body-wrapper) {
  background-color: #ffffff;
}

:deep(.vxe-toolbar) {
  background-color: transparent;
}
</style>
