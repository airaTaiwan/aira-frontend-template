<script setup lang="ts">
import { CFormFeedback, CFormInput, CFormLabel } from '@coreui/vue-pro'
import { watchOnce } from '@vueuse/shared'
import {
  checkDomainName,
  checkEmail,
  checkIpAddr,
  checkPort,
  isNotEmptyValidator,
} from '~/utils/validation'

type ValidType = '' | 'number' | 'email' | 'emailEmpty' | 'ip' | 'port' | 'domain' | 'custom' | 'uri'

defineOptions({
  inheritAttrs: false,
})

const {
  type = 'text',
  initValid = false,
  validType = '',
  tooltip = false,
  disabled = false,
  customValidator,
} = defineProps<{
  title?: string
  placeholder?: string
  type?: string
  validType?: ValidType
  initValid?: boolean
  tooltip?: boolean
  disabled?: boolean
  customValidator?: (value: string | number) => string | undefined
}>()

const emit = defineEmits<{
  valid: [valid: boolean]
}>()

const id = useId()

const text = defineModel<string | number>({ required: false, default: '' })

const init = ref(!initValid)

const shouldNotValidate = computed(() => {
  return init.value && (text.value == null || String(text.value).length === 0)
})

const valid = computed(() => {
  if (shouldNotValidate.value) {
    emit('valid', false)
    return undefined
  }

  let result
  switch (validType) {
    case 'custom':
      result = customValidator ? customValidator(text.value) === '' : false
      break
    case 'email':
      result = checkEmail(String(text.value)) === ''
      break
    case 'emailEmpty':
      result = text.value === '' ? undefined : checkEmail(String(text.value)) === ''
      break
    case 'ip':
      result = checkIpAddr(String(text.value)) === ''
      break
    case 'port':
      result = checkPort(+text.value) === ''
      break
    case 'domain':
      result = checkDomainName(String(text.value)) === ''
      break
    case 'uri':
      result = checkUri(String(text.value)) === ''
      break
    case 'number':
      result = checkNumber(text.value) === ''
      break
    default:
      result = isNotEmptyValidator(String(text.value)) === ''
      break
  }
  if (result !== undefined)
    emit('valid', result)
  return result
})

const invalid = computed(() => {
  if (shouldNotValidate.value)
    return undefined

  switch (validType) {
    case 'custom':
      return customValidator ? customValidator(text.value) !== '' : false
    case 'email':
      return checkEmail(String(text.value)) !== ''
    case 'emailEmpty':
      return text.value === '' ? undefined : checkEmail(String(text.value)) !== ''
    case 'ip':
      return checkIpAddr(String(text.value)) !== ''
    case 'port':
      return checkPort(+text.value) !== ''
    case 'domain':
      return checkDomainName(String(text.value)) !== ''
    case 'uri':
      return checkUri(String(text.value)) !== ''
    case 'number':
      return checkNumber(text.value) !== ''
    default:
      return isNotEmptyValidator(String(text.value)) !== ''
  }
})

const feedbackVisible = computed(() => invalid.value != null && invalid.value)

const feedbackInvalid = computed(() => {
  switch (validType) {
    case 'custom':
      return customValidator ? customValidator(text.value) : ''
    case 'email':
      return checkEmail(String(text.value))
    case 'emailEmpty':
      return text.value === '' ? '' : checkEmail(String(text.value))
    case 'ip':
      return checkIpAddr(String(text.value))
    case 'port':
      return checkPort(+text.value)
    case 'domain':
      return checkDomainName(String(text.value))
    case 'uri':
      return checkUri(String(text.value))
    case 'number':
      return checkNumber(text.value)
    default:
      return isNotEmptyValidator(String(text.value))
  }
})

watchOnce(text, () => {
  if (!init.value)
    return
  init.value = false
})

onMounted(() => {
  init.value = true
})
</script>

<template>
  <CFormLabel v-if="title" :for="id" class="text-nowrap">
    {{ title }}
  </CFormLabel>
  <CFormInput
    :id
    v-model="text"
    v-bind="$attrs"
    :type
    :valid
    :invalid
    :disabled
    :placeholder
  />
  <CFormFeedback v-if="feedbackVisible" class="order-1" :valid :invalid :tooltip>
    {{ feedbackInvalid }}
  </CFormFeedback>
</template>
