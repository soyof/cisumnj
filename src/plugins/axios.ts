import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
// import { ElMessage as Message } from 'element-plus'

type AxiosOption = {
  baseURL: string
  timeout: number
  retry: number
  retryDelay: number
}

interface ResponseData<T> {
  status: number
  message?: string
  data: T
  code: string
}

// const errorFn = (error: string) => {
//   Message.error({
//     message: error || '服务器异常！'
//   })
// }

const _mixinUrl = (url: string | undefined, param: any): string => {
  url = url || ''
  param = param || {}
  if (!url) return ''
  url = url.indexOf('?') > 0 ? `${url}&` : `${url}?`
  url = Object.keys(param).reduce((preVal: string, curItem: string) => {
    preVal += `${curItem}=${encodeURIComponent(param[curItem])}&`
    return preVal
  }, url)
  return url.replace(/[&?]$/, '')
}

const config: AxiosOption = {
  baseURL: 'http://127.0.0.1:8080',
  timeout: 15000,
  retry: 2, // 请求重试次数
  retryDelay: 1000 // 求重试间隔1秒
}

const _axios = axios.create(config)

// 请求拦截器
_axios.interceptors.request.use(
  (config: any) => {
    // if (localStorage.getItem('token')) {
    //   (config.headers as AxiosRequestHeaders).authorization = localStorage.getItem('token') as string
    // }
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
_axios.interceptors.response.use(
  (response: any) => {
    const data = response.data
    if (response.request.responseType === 'blob') {
      return response
    }
    if (data.success) {
      return data.data
    } else if (data.error === 0) {
      return data
    }
    return Promise.reject(new Error(data.message))
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

class Services {
  service;
  constructor(config: AxiosOption) {
    this.service = axios.create(config)

    // 请求拦截
    this.service.interceptors.request.use((config: AxiosRequestConfig) => {
      return config
    },
    (error: any) => {
      return Promise.reject(error)
    })

    // 响应拦截
    this.service.interceptors.response.use((response: AxiosResponse<any>) => {
      const data = response.data
      if (response.request.responseType === 'blob') {
        return response
      }
      if (data.code === 200) {
        return data
      } else if (data.error === 0) {
        return data
      }
      return Promise.reject(new Error(data.message))
    }, (error: any) => {
      return Promise.reject(error)
    })
  }

  all<T>(urls: Array<T>): Promise<T[]> {
    return new Promise((resolve, reject) => {
      axios.all(urls)
        .then(axios.spread((...res) => {
          resolve(res)
        }))
        .catch(err => reject(err))
    })
  }

  get<T>(url: string, params?: Object, config = {}): Promise<ResponseData<T>> {
    return this.service.get(_mixinUrl(url, params), config)
  }
  post<T>(url: string, params?: Object, config = {}): Promise<ResponseData<T>> {
    return this.service.post(url, params, config)
  }
  put<T>(url: string, params?: Object, config = {}): Promise<ResponseData<T>> {
    return this.service.put(url, params, config)
  }
  delete<T>(url: string, params?: Object, config = {}): Promise<ResponseData<T>> {
    return this.service.delete(_mixinUrl(url, params), config)
  }
}

export default new Services(config)
