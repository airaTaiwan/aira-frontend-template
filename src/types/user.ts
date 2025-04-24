export interface UserForm {
  /**
   * 使用者名稱
   */
  username: string
  /**
   * 使用者密碼
   */
  password: string
}

export enum UserPermission {
  Admin = 'Admin',
  SuperUser = 'Superuser',
  Viewer = 'Viewer',
}

/**
 * 帳號
 */
export interface Account {
  /**
   *  唯一識別碼
   */
  uuid: string
  /**
   *  使用者名稱
   */
  username: string
  /**
   *  密碼
   */
  password: string
  /**
   *  權限類型
   */
  permission: UserPermission
  /**
   *  是否為固定帳號
   */
  fixed: boolean
  /**
   *  備註
   */
  remark: string
  /**
   * 建立時間
   */
  createdAt?: string
  /**
   * 更新時間
   */
  updatedAt?: string
}
