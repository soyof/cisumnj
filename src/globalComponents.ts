import Pagination from '@/components/Pagination.vue'
import HeaderLine from '@/components/global/HeaderLine.vue'
import SelfEmpty from '@/components/global/SelfEmpty.vue'

const globalComponents = (app: any) => {
  if (app['component']) {
    app['component']((Pagination.name || 'Pagination'), Pagination)
    app['component']((Pagination.name || 'HeaderLine'), HeaderLine)
    app['component']((Pagination.name || 'SelfEmpty'), SelfEmpty)
  }
  return app
}

export default globalComponents
