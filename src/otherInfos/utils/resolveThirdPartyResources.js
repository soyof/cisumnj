import hCore, { store } from 'hui-core'

/**
 * 跨系统进行资源访问的兼容方法实现
 * @param {string} app - 系统名称
 * @param {string} id - 资源标识，在框架 1.0 中特指路由ID
 * @param {string} url - 资源路径，在框架 2.0 中可以指定资源路径，否则会尝试以 `${entry}/libs/${id}.js` 作为路径获取资源
 */
export default function resolveThirdPartyResources(app, id, url) {
    return new Promise((resolve, reject) => {
        // 2.0 业务系统构建
        if (process.env.HUI_BUILD_TARGET === 'app') {
            const isMicroApp = hCore.utils.isMicroApp()
            if (!url && isMicroApp) {
                try {
                    // 获取业务系统的部署路径，要求主系统在 root 状态模块中新增 apps 状态值，存储业务系统的配置信息
                    const { root } = store.state
                    const { entry } = root.apps.find((item) => app === item.name)
                    url = `${entry}/libs/${id}.js`
                } catch (error) {
                    throw error
                }
            }

            return url ? requirejs([url], resolve, reject) : reject('NOT FOUND')
        }
    })
}
