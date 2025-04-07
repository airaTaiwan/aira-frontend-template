<script setup lang="ts" generic="T extends string">
import { CFormCheck, CFormLabel, CListGroup, CListGroupItem } from '@coreui/vue-pro'

interface CheckBoxGroupOptions<T = string> {
  value: T
  label?: string
  children?: CheckBoxGroupOptions<T>[]
}

defineProps<{
  options?: CheckBoxGroupOptions<T>[]
}>()

const selected = defineModel<T[]>({ required: false, default: [] })

const childrenIdsCache = new Map<T, T[]>()

function getAllChildrenIds(item: CheckBoxGroupOptions<T>): T[] {
  const cached = childrenIdsCache.get(item.value)
  if (cached)
    return cached

  let ids: T[] = []
  if (item.children) {
    item.children.forEach((child) => {
      ids = [...ids, child.value, ...getAllChildrenIds(child)]
    })
  }

  childrenIdsCache.set(item.value, ids)
  return ids
}

const getChildrenState = computed(() => (item: CheckBoxGroupOptions<T>): boolean => {
  if (!item.children?.length)
    return selected.value.includes(item.value)

  const childrenIds = getAllChildrenIds(item)
  return childrenIds.length > 0 && childrenIds.every(id => selected.value.includes(id))
})

function onSelectedChange(id: T, children: CheckBoxGroupOptions<T>[] = []) {
  if (!children.length) {
    selected.value = selected.value.includes(id)
      ? selected.value.filter(v => v !== id)
      : [...selected.value, id]
    return
  }

  const childrenIds = children.reduce((acc, child) => {
    return [...acc, child.value, ...getAllChildrenIds(child)]
  }, [] as T[])

  const allSelected = childrenIds.every(id => selected.value.includes(id))
  selected.value = allSelected
    ? selected.value.filter(v => !childrenIds.includes(v) && v !== id)
    : [...new Set([...selected.value, id, ...childrenIds])]
}
</script>

<template>
  <CListGroup>
    <CListGroupItem v-for="item in options" :key="item.value">
      <div flex="~ items-center gap-x-2">
        <CFormCheck
          :id="item.value"
          :model-value="getChildrenState(item)"
          @change="onSelectedChange(item.value, item.children)"
        />
        <CFormLabel select-none :for="item.value">
          {{ item.label ?? item.value }}
        </CFormLabel>
      </div>
      <div v-if="item.children?.length" class="ms-2">
        <CheckBoxGroup
          v-model="selected"
          :options="item.children"
        />
      </div>
    </CListGroupItem>
  </CListGroup>
</template>

<style scoped>
* {
  --cui-list-group-bg: transparent;
  --cui-border-width: 0;
  --cui-list-group-item-padding-x: 0;
  --cui-list-group-item-padding-y: 0;
}
</style>
