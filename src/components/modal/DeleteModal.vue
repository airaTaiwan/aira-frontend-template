<script setup lang="ts">
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/vue-pro'

defineEmits<{
  onConfirm: []
}>()

const { t } = useI18n()

const visible = ref(false)

function open() {
  visible.value = true
}

function close() {
  visible.value = false
}

defineExpose({
  open,
  close,
})
</script>

<template>
  <CModal alignment="center" :visible @close="close">
    <CModalHeader>
      <CModalTitle>
        <slot name="title">
          {{ t('modal.delete.prompt') }}
        </slot>
      </CModalTitle>
    </CModalHeader>
    <CModalBody>
      <slot name="body">
        {{ t('modal.delete.confirm') }}
      </slot>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="close">
        <slot name="cancel">
          {{ t('common.cancel') }}
        </slot>
      </CButton>
      <CButton color="danger" @click="$emit('onConfirm')">
        <slot name="confirm">
          {{ t('common.delete') }}
        </slot>
      </CButton>
    </CModalFooter>
  </CModal>
</template>
