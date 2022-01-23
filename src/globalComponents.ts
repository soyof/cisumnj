import Pagination from '@/components/global/pagination.vue'
import HeaderLine from '@/components/global/headerLine.vue'
import SelfEmpty from '@/components/global/selfEmpty.vue'

const globalComponents = (app: any) => {
  if (app['component']) {
    app['component']((Pagination.name || 'Pagination'), Pagination)
    app['component']((Pagination.name || 'HeaderLine'), HeaderLine)
    app['component']((Pagination.name || 'SelfEmpty'), SelfEmpty)
  }
  return app
}

export default globalComponents
