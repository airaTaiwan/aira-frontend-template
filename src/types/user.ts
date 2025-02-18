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
