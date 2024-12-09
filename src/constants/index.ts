import packageJson from '../../package.json'

export const WhitePageRegexp = /manage|report|login/

export const stepProgressParams = Object.freeze({
  param_cardStyle: 'height: 35rem;',
  activeColor: '#6baee3',
  passiveColor: '#919bae',
  lineThickness: 3,
  thickness: 3,
  passiveThickness: 3,
})

declare const __BUILD_DATE__: string

function formatVersion(version: string) {
  return version
    .split('.')
    .map((num, index) => (index === 0 ? num : num.padStart(2, '0')))
    .join('.')
}

export const frontEndVersion = `${formatVersion(packageJson.version)}.${__BUILD_DATE__}`
