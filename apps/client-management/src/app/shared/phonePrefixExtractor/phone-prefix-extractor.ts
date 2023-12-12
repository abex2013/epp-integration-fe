import { countryPhoneCodes } from "../Data/dummy"

export function extractPhoneNumber(phoneNumber?: string | null) {
  const result = {} as {
      prefix: string | null,
      value: string | null,
      suffix: string | null,
  }
  const phonePrefices = countryPhoneCodes.map(x=>x.phoneCode)
  if (phoneNumber && phoneNumber !== null && phoneNumber !== '') {
      let noofMatches = 0
      for (let i = 0; i < phonePrefices.length; i++) {
          // console.log(this._phonePrefices[i])
          const prefix = phoneNumber.substring(0, phonePrefices[i].length)
          if (phonePrefices[i] === prefix
              && prefix.length > noofMatches) {
              result.prefix = phonePrefices[i]
              noofMatches = phonePrefices[i].length
          }
      }
      result.value = phoneNumber.substring(noofMatches);
  }
  return result
}
