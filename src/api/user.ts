import type { APIResponse } from '~/plugin/ky'

import type { UserForm } from '~/types/user'
import ky from '~/plugin/ky'

/**
 * 登入
 */
export async function apiGenerateToken(data: UserForm) {
  return ky.post<{ data: string }>('login', { json: data })
}

/**
 * 延長 token 過期時間
 */
export async function apiRefreshToken() {
  return ky.post<{ data: string }>('refresh', { json: {} })
}

/**
 * 重設密碼
 */
export async function apiResetPassword(data: UserForm) {
  return ky.post<APIResponse>('resetpassword', { json: data })
}
