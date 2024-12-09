<script setup lang="ts">
import { CFormCheck, CListGroup, CListGroupItem } from '@coreui/vue-pro'
import { computed } from 'vue'

interface CheckBoxGroupOptions {
  id: string
  label?: string
  children?: CheckBoxGroupOptions[]
}

defineProps<{
  options?: CheckBoxGroupOptions[]
}>()

const selected = defineModel<string[]>({ required: false, default: [] })

const childrenIdsCache = new Map<string, string[]>()

function getAllChildrenIds(item: CheckBoxGroupOptions): string[] {
  const cached = childrenIdsCache.get(item.id)
  if (cached)
    return cached

  let ids: string[] = []
  if (item.children) {
    item.children.forEach((child) => {
      ids = [...ids, child.id, ...getAllChildrenIds(child)]
    })
  }

  childrenIdsCache.set(item.id, ids)
  return ids
}

const getChildrenState = computed(() => (item: CheckBoxGroupOptions): boolean => {
  if (!item.children?.length)
    return selected.value.includes(item.id)

  const childrenIds = getAllChildrenIds(item)
  return childrenIds.length > 0 && childrenIds.every(id => selected.value.includes(id))
})

function onSelectedChange(id: string, children: CheckBoxGroupOptions[] = []) {
  if (!children.length) {
    selected.value = selected.value.includes(id)
      ? selected.value.filter(v => v !== id)
      : [...selected.value, id]
    return
  }

  const childrenIds = children.reduce((acc, child) => {
    return [...acc, child.id, ...getAllChildrenIds(child)]
  }, [] as string[])

  const allSelected = childrenIds.every(id => selected.value.includes(id))
  selected.value = allSelected
    ? selected.value.filter(v => !childrenIds.includes(v) && v !== id)
    : [...new Set([...selected.value, id, ...childrenIds])]
}
</script>

<template>
  <CListGroup>
    <CListGroupItem v-for="item in options" :key="item.id">
      <CFormCheck
        :id="item.id"
        :label="item.label ?? item.id"
        :model-value="getChildrenState(item)"
        @change="onSelectedChange(item.id, item.children)"
      />
      <div v-if="item.children?.length" class="ms-4">
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
  --cui-list-group-item-padding-y: 0.25rem;
}
</style>
