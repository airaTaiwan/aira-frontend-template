<script setup lang="ts">
import { CCard, CCardBody, CFormInput } from '@coreui/vue-pro'

const { data } = defineProps<{
  data: any
}>()

const emit = defineEmits<{
  valid: [valid: boolean]
}>()

const passList = ref<Record<string, boolean>>({})
watchEffect(() => {
  emit('valid', Object.values(passList.value).every(Boolean))
})
</script>

<template>
  <CCard h-0 min-h-160>
    <CCardBody h-full>
      <table
        v-if="data != null"
        w-full border="separate spacing-x-5"
        class="table-layout"
      >
        <tbody>
          <tr>
            <th w="1/4">
              測試
            </th>
          </tr>
          <tr>
            <td>
              <CFormInput
                placeholder="測試"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </CCardBody>
  </CCard>
</template>
