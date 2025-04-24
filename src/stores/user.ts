import type { Account, UserForm } from '~/types/user'
import { useCookies } from '@vueuse/integrations/useCookies'
import { useJwt } from '@vueuse/integrations/useJwt'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { UserPermission } from '~/types/user'

export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  const cookies = useCookies()

  const { resume, pause } = useIntervalFn(() => {
    refreshtoken()
  }, 30 * 60 * 1000, { immediate: false })

  const userInfo = shallowReactive<Pick<Account, 'username' | 'permission'>>({
    username: '',
    permission: UserPermission.Viewer,
  })
  const sessionId = ref(cookies.get('token') || '')

  async function login(data: UserForm, rememberMe: boolean) {
    try {
      const { data: token } = await apiGenerateToken(data)
      const { payload } = useJwt<{
        username: string
        role: UserPermission
        exp: number
      }>(token)

      if (payload.value == null)
        throw new Error('Invalid token')

      const { username, role, exp } = payload.value

      userInfo.username = username
      userInfo.permission = role
      sessionId.value = token
      isLogin.value = true

      if (rememberMe) {
        const expireDate = new Date(exp * 1000)
        cookies.set('token', token, { expires: expireDate })
      }

      resume()
    }
    catch {
      isLogin.value = false
      return false
    }
    return true
  }

  function getToken(): string {
    if (sessionId.value)
      return sessionId.value

    return cookies.get('token')
  }

  function logout() {
    sessionId.value = ''
    cookies.remove('token')
    router.push('/login')
    pause()
    isLogin.value = false
  }

  async function refreshtoken() {
    try {
      const { data: token } = await apiRefreshToken()
      const { payload } = useJwt<{
        username: string
        role: UserPermission
        exp: number
      }>(token)

      if (payload.value == null)
        throw new Error('Invalid token')

      const { username, role, exp } = payload.value

      userInfo.username = username
      userInfo.permission = role
      sessionId.value = token
      isLogin.value = true

      resume()

      const expireDate = new Date(exp * 1000)
      cookies.set('token', token, { expires: expireDate })
    }
    catch {
      logout()
    }
  }

  return {
    userInfo,
    sessionId,
    login,
    logout,
    refreshtoken,
    getToken,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
