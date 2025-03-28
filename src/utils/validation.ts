import { i18n } from '~/plugin/i18n'

const IP_REGEX = /^(?:\d{1,3}\.){3}[?:0-9]{1,3}$/
const EMAIL_REGEX = /^[\w.-]+@[a-z0-9.-]+\.[a-z]{2,}$/i
const DOMAIN_NAME_REGEX = /^[a-z0-9.-]+$/i
const WHITESPACE_REGEX = /\s/g
const DIGITS_REGEX = /^\d+$/
const URI_REGEX = /^\/[\w/-]*$/

/**
 * 檢查輸入值是否為空
 *
 * @param val 輸入值
 */
export function isNotEmptyValidator(val: string | undefined): string | undefined {
  if (val === undefined)
    return undefined

  return val === '' && val.replace(WHITESPACE_REGEX, '').length <= 0 ? i18n.global.t('validation.noEmptyNoSpace') : ''
}

/**
 * 檢查數值是否為數字
 */
export function checkNumber(val: number | string | undefined) {
  if (val === undefined)
    return undefined

  if (Number.isNaN(Number(val)))
    return i18n.global.t('validation.invalidNumber')

  if (val.toString() === '')
    return i18n.global.t('validation.noEmptyNoSpace')

  if (!DIGITS_REGEX.test(val.toString()))
    return i18n.global.t('validation.invalidNumber')

  return ''
}

/**
 * 檢查輸入值是否超過最大長度
 *
 * @param val 輸入值
 * @param maxLen 最大長度
 */
export function checkMaxLen(val: string | undefined, maxLen: number) {
  if (val === undefined)
    return undefined

  return val.split('').length > maxLen ? i18n.global.t('validation.maxLensField') : ''
}

/**
 * 檢查數值是否介於 min ~ max 之間
 */
export function checkRange(val: number | undefined, min: number, max: number) {
  if (val === undefined)
    return undefined

  if (val.toString() === '')
    return i18n.global.t('validation.noEmptyNoSpace')

  if (Number(val) >= min && Number(val) <= max)
    return ''

  return i18n.global.t('validation.rangeError')
}

/**
 * 檢查 port 是否介於 0 ~ 65535 之間
 *
 * @param port
 */
export function checkPort(port: number | undefined) {
  const checkNumberResult = checkNumber(port)
  if (checkNumberResult)
    return checkNumberResult

  return checkRange(port, 0, 65535) || i18n.global.t('validation.noEmptyPortOnly')
}

/**
 * 檢查 ip 格式
 *
 * @param ip
 */
export function checkIpAddr(ip: string | undefined) {
  if (ip === undefined)
    return undefined

  if (ip === '')
    return i18n.global.t('validation.noEmptyNoSpace')

  return IP_REGEX.test(ip) ? '' : i18n.global.t('validation.invalidIpFormat')
}

/**
 * 檢查 email 格式
 *
 * @param email
 */
export function checkEmail(email: string | undefined) {
  if (email === undefined)
    return undefined

  if (email === '')
    return i18n.global.t('validation.noEmptyNoSpace')

  return EMAIL_REGEX.test(email) ? '' : i18n.global.t('validation.invalidEmailFormat')
}

/**
 * 檢查 domain name 格式
 *
 * @param domainName
 */
export function checkDomainName(domainName: string | undefined) {
  if (domainName === undefined)
    return undefined

  if (domainName === '')
    return i18n.global.t('validation.noEmptyNoSpace')

  return DOMAIN_NAME_REGEX.test(domainName) ? '' : i18n.global.t('validation.invalidDomainFormat')
}

/**
 * 檢查密碼是否相同
 *
 * @param password 密碼
 * @param checkPassword 檢查值
 */
export function checkConfirmPassword(password: string | undefined, checkPassword: string) {
  if (checkPassword === undefined)
    return undefined

  if (checkPassword === '')
    return i18n.global.t('validation.noEmptyNoSpace')

  return password === checkPassword ? '' : i18n.global.t('validation.passwordNotMatch')
}

/**
 * 檢查 URI 格式
 *
 * @param uri
 */
export function checkUri(uri: string | undefined) {
  if (uri === undefined)
    return undefined

  if (uri === '')
    return i18n.global.t('validation.noEmptyNoSpace')

  return URI_REGEX.test(uri) ? '' : i18n.global.t('validation.invalidUriFormat')
}
