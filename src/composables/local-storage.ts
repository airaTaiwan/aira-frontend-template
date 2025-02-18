import packageJson from '../../package.json'

/** 側邊欄開關 */
export const sideBarVisible = useLocalStorage<boolean>(`${packageJson.name}-sideBarVisible`, true)
