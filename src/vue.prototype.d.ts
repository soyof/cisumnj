/* eslint-disable */
import { ComponentCustomProperties } from '@/vue'
import { AxiosInstance, AxiosStatic } from 'axios'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $http: AxiosStatic;
  }
}
