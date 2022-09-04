import Cookies from 'js-cookie'

const TokenKey = 'hrsaas-ybh-token' // 设置一个自己单独的token

export function getToken() { // 获取token
  return Cookies.get(TokenKey)
}

export function setToken(token) { // 设置token
  return Cookies.set(TokenKey, token)
}

export function removeToken() { // 删除token
  return Cookies.remove(TokenKey)
}
