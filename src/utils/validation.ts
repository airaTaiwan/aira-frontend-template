import { i18n } from '~/plugin/i18n'

const IP_REGEX = /^(?:\d{1,3}\.){3}[?:0-9]{1,3}$/
const EMAIL_REGEX = /^[\w.-]+@[a-z0-9.-]+\.[a-z]{2,}$/i
const DOMAIN_NAME_REGEX = /^[a-z0-9.-]+$/i
const WHITESPACE_REGEX = /\s/g
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
export function checkNumber(val: number | string | undefined | null): string | undefined {
  if (val == null) {
    return undefined
  }

  const stringVal = String(val)
  const trimmedVal = stringVal.trim()

  if (trimmedVal === '') {
    return i18n.global.t('validation.noEmptyNoSpace')
  }

  if (Number.isNaN(Number(trimmedVal))) {
    return i18n.global.t('validation.invalidNumber')
  }

  return ''
}

/**
 * 檢查輸入值是否超過最大長度
 */
export function checkMaxLen(val: string | undefined, maxLen: number) {
  if (val === undefined)
    return undefined

  return val.split('').length > maxLen ? i18n.global.t('validation.maxLensField') : ''
}

/**
 * 檢查數值是否介於指定的 min / max 範圍之間（包含邊界）。
 * 可以只提供 min、只提供 max，或兩者都提供。
 */
export function checkRange(val: number | string | undefined, min?: number, max?: number) {
  const numberCheckResult = checkNumber(val)
  if (numberCheckResult) {
    return numberCheckResult
  }

  const numVal = Number(val)

  if (min !== undefined && max === undefined) {
    if (numVal >= min) {
      return ''
    }
    else {
      return i18n.global.t('validation.rangeErrorMin', { min })
    }
  }
  else if (min === undefined && max !== undefined) {
    if (numVal <= max) {
      return ''
    }
    else {
      return i18n.global.t('validation.rangeErrorMax', { max })
    }
  }
  else if (min !== undefined && max !== undefined) {
    if (numVal >= min && numVal <= max) {
      return ''
    }
    else {
      return i18n.global.t('validation.rangeErrorMinMax', { min, max })
    }
  }
  else {
    return ''
  }
}

/**
 * 檢查 port 是否介於 0 ~ 65535 之間
 */
export function checkPort(port: number | undefined) {
  const checkNumberResult = checkNumber(port)
  if (checkNumberResult)
    return checkNumberResult

  if (checkRange(port, 0, 65535) === '')
    return ''

  return i18n.global.t('validation.noEmptyPortOnly')
}

/**
 * 檢查 ip 格式
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
 */
export function checkUri(uri: string | undefined) {
  if (uri === undefined)
    return undefined

  if (uri === '')
    return i18n.global.t('validation.noEmptyNoSpace')

  return URI_REGEX.test(uri) ? '' : i18n.global.t('validation.invalidUriFormat')
}
