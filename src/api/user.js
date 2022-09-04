import request from '@/utils/request'

export function login(data) { // 封装登录接口
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {

}

export function logout() {

}
