<script setup lang="ts">
import type { NavigationFailure, RouteLocationNormalizedLoaded } from 'vue-router'
import type { RouteNamedMap } from 'vue-router/auto-routes'
import { CNavGroup, CNavItem, CSidebarNav } from '@coreui/vue-pro'
import { RouterLink } from 'vue-router'

export interface Navitem {
  id?: 'dashboard' | 'manage' | 'report'
  name?: string
  items?: Navitem[]
  to?: keyof RouteNamedMap
  extras?: Array<keyof RouteNamedMap>
}

const route = useRoute()
const router = useRouter()

const { t } = useI18n()

const manageNavs = computed<Navitem[]>(() => [
  {
    name: t('logout'),
    component: CNavItem,
    to: '/logout',
  },
])

const reportNavs = computed<Navitem[]>(() => [])

const navs = computed<Navitem[]>(() => [...manageNavs.value, ...reportNavs.value])

function normalizePath(path: string) {
  return decodeURI(path)
    .replace(/#.*$/, '')
    .replace(/(index)?\.(html)$/, '')
}

function isActiveLink(route: RouteLocationNormalizedLoaded, link?: string): boolean {
  if (!link)
    return false

  const resolvedLink = router.resolve(link)

  const currentPathSegments = normalizePath(route.path).split('/')
  const targetPathSegments = normalizePath(resolvedLink.path).split('/')

  if (currentPathSegments.length !== targetPathSegments.length) {
    return false
  }

  const isSame = currentPathSegments.every((segment, index) => {
    if (segment.startsWith(':') || targetPathSegments[index].startsWith(':')) {
      return true
    }
    return segment === targetPathSegments[index]
  })

  return isSame
}

function isActiveItem(route: RouteLocationNormalizedLoaded, item: Navitem): boolean {
  if (isActiveLink(route, item.to)) {
    return true
  }

  if (item.extras && item.extras.length > 0) {
    return item.extras.some((extra: any) => isActiveLink(route, extra))
  }

  if (item.items) {
    return item.items.some((child: any) => isActiveItem(route, child))
  }

  return false
}

function isExtrasActie(extra: string, path: string): boolean {
  const currentPathSegments = extra.split('/')
  const targetPathSegments = path.split('/')

  return currentPathSegments.every((segment, index) => {
    if (segment.startsWith(':') || targetPathSegments[index].startsWith(':')) {
      return true
    }
    return segment === targetPathSegments[index]
  })
}

function goTo(link: string | undefined, e: Event) {
  if (link === undefined)
    return

  router.push(link)

  if (route.fullPath === link)
    return

  e.stopPropagation()
}

function renderItem(nav: Navitem) {
  if (nav.items && nav.items.length > 0) {
    const selfStatus = isActiveItem(route, nav)
    const status = nav.items.some((child: Navitem) => isActiveItem(route, child))

    return h(
      CNavGroup,
      {
        visible: status || selfStatus,
        class: [
          (status || selfStatus) && 'nav-group-active show',
          selfStatus && !status ? 'group-show' : '',
        ],
      },
      {
        togglerContent: () => [
          h('p', nav.name),
          h('div', { class: 'absolute inset-0 z-10', onClick: e => goTo(nav.to, e) }),
        ],
        default: () => nav.items?.map((child: any) => renderItem(child)),
      },
    )
  }

  return nav.to
    ? h(
        RouterLink,
        {
          to: nav.to,
          custom: true,
        },
        {
          default: (props: {
            isActive: boolean
            href: string
            navigate: (e?: MouseEvent | undefined) => Promise<void | NavigationFailure>
          }) =>
            h(
              CNavItem,
              null,
              {
                default: () =>
                  h(
                    'div',
                    {
                      class: [
                        'nav-link',
                        props.isActive
                        || nav.extras?.some(extra => isExtrasActie(extra, route.path))
                          ? 'active'
                          : '',
                      ],
                      onClick: () => props.navigate(),
                    },
                    nav.name,
                  ),
              },
            ),
        },
      )
    : h(CNavItem, null, {
        default: () => nav.name,
      })
}
</script>

<template>
  <SideBar>
    <CSidebarNav>
      <template v-for="nav in navs" :key="nav.name">
        <component :is="renderItem(nav)" />
      </template>
    </CSidebarNav>
  </SideBar>
</template>

<style scoped>
* {
  --text-color: rgba(180, 191, 192, 1);
  --hover-bg-color: rgba(67, 67, 67, 0.5);
  --icon: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUgMVY5IiBzdHJva2U9IiNCNEJGQzAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8cGF0aCBkPSJNOSA1TDEgNSIgc3Ryb2tlPSIjQjRCRkMwIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+Cg==');
  --cui-sidebar-nav-padding-x: 0;
  --cui-sidebar-nav-padding-y: 0;
  --cui-sidebar-nav-title-color: rgba(255, 255, 255, 0.6);
  --cui-sidebar-nav-link-padding-x: 1rem;
  --cui-sidebar-nav-link-padding-y: 0.75rem;
  --cui-sidebar-nav-link-color: var(--text-color);
  --cui-sidebar-nav-link-bg: transparent;
  --cui-sidebar-nav-link-border-color: transparent;
  --cui-sidebar-nav-link-border: 0 solid var(--cui-sidebar-nav-link-border-color);
  --cui-sidebar-nav-link-border-radius: 0;
  --cui-sidebar-nav-link-active-color: var(--text-color);
  --cui-sidebar-nav-link-hover-color: var(--text-color);
  --cui-sidebar-nav-group-indicator-color: #fff;
  --cui-sidebar-nav-group-indicator-hover-color: #fff;
  --cui-sidebar-nav-group-toggle-show-color: var(--text-color);
  --cui-sidebar-nav-icon-width: 2rem;
  --cui-sidebar-nav-link-active-bg: var(--hover-bg-color);
  --cui-sidebar-nav-link-hover-bg: var(--hover-bg-color);
  --cui-sidebar-nav-group-bg: transparent;
  --cui-sidebar-nav-link-icon-margin: 0rem;
  --cui-sidebar-nav-link-icon-width: 1rem;
}

:deep(.nav-link) {
  --uno: lh-none cursor-pointer;
}

:deep(.nav-group.show) {
  --icon: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkgNUwxIDUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K');
}

:deep(.nav-group-toggle) {
  --uno: relative;
}

.group-show :deep(.nav-group-toggle) {
  border-width: 0 6px 0 0;
  border-style: solid;
  border-color: rgba(77, 171, 220, 1);
  font-weight: 700;
}

:deep(.active) {
  border-width: 0 6px 0 0;
  border-style: solid;
  border-color: rgba(77, 171, 220, 1);
  font-weight: 700;
}
</style>
