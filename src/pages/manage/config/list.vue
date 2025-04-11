<script setup lang="ts">
import type { ComponentExposed } from 'vue-component-type-helpers'
import type { VxeColumnProps } from 'vxe-table'
import type DeleteModal from '~/components/modal/DeleteModal.vue'
import type Table from '~/components/Table.vue'
import { CButton } from '@coreui/vue-pro'

const router = useRouter()

const { t } = useI18n()

const searchTxt = ref('')

const tableRef = useTemplateRef<ComponentExposed<typeof Table>>('tableRef')
const modalRef = useTemplateRef<ComponentExposed<typeof DeleteModal>>('modalRef')

// 表格欄位
const columns = computed<VxeColumnProps[]>(() => [
  {
    type: 'checkbox',
    width: 60,
  },
  {
    title: t('table.operate'),
    width: '120px',
    slots: {
      default: 'action',
    },
  },
])

// 表格資料
const tableData = computed(() => [])

function onAdd() {
  // selectInit()
  router.push('/manage/config/editor')
}

async function onCopy() {
  // createConfig({
  //   ...data,
  //   name: `${data.name}__${t('common.copy')}`,
  // })
}

async function onEdit() {
  // selectData(data)
  router.push('/manage/config/editor')
}

async function onRemove() {
  // const { _id } = data
  // tableRef.value?.selectedIds.push(_id)
  // modalRef.value?.open()
}

async function removeSelectItem() {
  // const ids = tableRef.value?.selectedIds ?? []

  // if (ids.length === 0)
  //   return

  // deleteConfigs(ids)

  // modalRef.value?.close()
}
</script>

<template>
  <Table
    ref="tableRef"
    :table-toolbar-config="{
      slots: {
        tools: 'toolbar_tools',
        buttons: 'toolbar_buttons',
      },
    }"
    :columns
    :table-data
    @on-copy="onCopy"
    @on-edit="onEdit"
    @on-remove="onRemove"
  >
    <template #toolbar_buttons>
      <div mr-4 flex="~ col">
        <SearchInput v-model="searchTxt" />
      </div>
    </template>

    <template #toolbar_tools>
      <div flex="~ inline items-center" gap-x-3>
        <CButton color="info" @click="onAdd">
          {{ t('common.add') }}
        </CButton>
        <CButton
          color="danger"
          :disabled="tableRef?.selectedIds.length === 0"
          @click="() => modalRef?.open()"
        >
          {{ t('common.delete') }}
        </CButton>
      </div>
    </template>
  </Table>

  <DeleteModal ref="modalRef" @on-confirm="removeSelectItem">
    <template #body>
      {{ t('modal.delete.confirm') }}
    </template>
  </DeleteModal>
</template>

<route lang="yaml">
  meta:
    layout: manage
</route>
