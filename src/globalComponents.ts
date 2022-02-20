import Pagination from '@/components/global/pagination.vue'
import HeaderLine from '@/components/global/headerLine.vue'
import SelfEmpty from '@/components/global/selfEmpty.vue'
import ThrottleButton from '@/components/global/throttleButton.vue'
import SimplePagination from '@/components/global/simplePagination.vue'

const globalComponents = (app: any) => {
  if (app['component']) {
    app['component']((Pagination.name || 'Pagination'), Pagination)
    app['component']((HeaderLine.name || 'HeaderLine'), HeaderLine)
    app['component']((SelfEmpty.name || 'SelfEmpty'), SelfEmpty)
    app['component']((ThrottleButton.name || 'ThrottleButton'), ThrottleButton)
    app['component']((SimplePagination.name || 'SimplePagination'), SimplePagination)
  }
  return app
}

export default globalComponents
