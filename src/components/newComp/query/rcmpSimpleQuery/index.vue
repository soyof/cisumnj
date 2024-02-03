<!-- 自动查询框架 -->
<template>
  <div :class="[style[baseClass]]" style="padding: 16px;">
    <rcmpSearchTemplate
      v-if="xmlData"
      ref="temp"
      :baseSearch="xmlData.baseCondition && xmlData.baseCondition.length > 0"
      :columns="xmlData.columns"
      :exportUrl="xmlData.exportUrl"
      :filters="xmlData.formatter"
      :formArgs="xmlData.formArgs"
      :formCols="+xmlData.formCols || 4"
      :hasMoreConditions="xmlData.moreCondition && xmlData.moreCondition.length > 0"
      :hasPage="xmlData.hasPage === undefined ? true : xmlData.hasPage"
      :highlight-row="xmlData.highlightRow === undefined ? true : xmlData.highlightRow"
      :labelMapFormat="labelMapFormat"
      :labelWidth="+xmlData.labelWidth || 80"
      :occupyHight="xmlData.occupyHight || 8"
      :pageSizeOpts="xmlData.pageSizeOpts || pageSizeOpts"
      :queryMapFormat="queryMapFormat"
      :queryParamTrim="xmlData.queryParamTrim === undefined ? true : xmlData.queryParamTrim"
      :selfAdaptTable="'datagrid'"
      :showExportBtnByUrl="!!xmlData.exportUrl"
      :showListCkeckBox="xmlData.showListCkeckBox === undefined ? true : xmlData.showListCkeckBox"
      :showRefreshBtn="xmlData.showRefreshBtn === undefined ? true : xmlData.showRefreshBtn"
      :url="xmlData.url"
    >
      <template v-if="xmlData.baseCondition && xmlData.baseCondition.length" v-slot:baseCondition="{ form }">
        <QueryFormItem v-for="item in xmlData.baseCondition" :key="item.name" :config="item"
                       :form="form" :formatterdate="formatterdate" :getTitleByValue="getTitleByValue"
        />
      </template>
      <template v-if="xmlData.moreCondition && xmlData.moreCondition.length" v-slot:moreCondition="{ form }">
        <QueryFormItem v-for="item in xmlData.moreCondition" :key="item.name" :config="item"
                       :form="form" :formatterdate="formatterdate" :getTitleByValue="getTitleByValue"
        />
      </template>
      <template v-slot:opreBtns>
      </template>
    </rcmpSearchTemplate>
  </div>
</template>

<script>
import QueryFormItem from './components/QueryFormItem.vue'
import expandColumns from './components/expandColumns.vue'
import httpFetch from '../../utils/api/api.js'
export default {
  // 自动查询框架
  name: 'rcmpSimpleQuery',
  components: {
    QueryFormItem,
    // eslint-disable-next-line vue/no-unused-components
    expandColumns
  },
  data() {
    return {
      xmlData: null,
      baseClass: 'simple-query',
      menuCode: this.$route.meta.id, // 菜单编号
      pageSizeOpts: [10, 20, 50, 100], // 默认分页
      advancedSearch: false, // 高级查询,
      // 按钮权限
      btnRightCode: {
        exportRightCode: 'exportRightCode' // 导出
      },
      labelMapFormat: [],
      queryMapFormat: {}
    }
  },
  created() {
    this.getXmlData()
    if (!this.apiConfig) throw new Error('请在子组件的data中定义apiConfig')
  },
  methods: {
    async getXmlData() {
      const res = await httpFetch.get(`${this.apiConfig.PBS_API}/getMenuPageInfo?menu_code=` + this.menuCode)
      const { return_code, result } = res.data
      if (return_code === 0) {
        const xmlData = result.content[0]
        // 处理formArgs
        const formArgs = {}
        const arrType = ['hSelectTree', 'hSelect']
        // eslint-disable-next-line no-unused-expressions
        xmlData.baseCondition?.forEach(item => {
          if (arrType.includes(item.htype) && item.multiple && !item.isString) {
            formArgs[item.name] = []
          } else {
            formArgs[item.name] = ''
          }
        })
        // eslint-disable-next-line no-unused-expressions
        xmlData.moreCondition?.forEach(item => {
          if (arrType.includes(item.htype) && item.multiple && !item.isString) {
            formArgs[item.name] = []
          } else {
            formArgs[item.name] = ''
          }
        })
        xmlData.formArgs = formArgs

        this.changeUrl(xmlData) // 对 url 进行处理
        this.buildColumns(xmlData) // 对 columns 进行处理
        this.addQueryLog(xmlData) // 增加反洗钱日志留痕
        this.xmlData = xmlData
      }
    },
    changeUrl(data) {
      if (data.baseServer) {
        data.baseServer = this.getNewUrl(data.baseServer)
      }
      if (data.baseServer) {
        data.url = this.getNewUrl(data.url)
      }
      if (data.exportUrl) {
        data.exportUrl = this.getNewUrl(data.exportUrl)
      }
      // eslint-disable-next-line no-unused-expressions
      data.baseCondition?.forEach(item => {
        if (item.busUrl) {
          item.busUrl = this.getNewUrl(item.busUrl)
        }
      })
      // eslint-disable-next-line no-unused-expressions
      data.moreCondition?.forEach(item => {
        if (item.busUrl) {
          item.busUrl = this.getNewUrl(item.busUrl)
        }
      })
    },
    getNewUrl(url) {
      const index1 = url.indexOf('{')
      const index2 = url.indexOf('}')
      const index3 = url.indexOf('/')
      let str = ''
      if (index1 > -1 && index2 > -1) {
        str = url.substring(index1 + 1, index2)
      }
      let val = ''
      if (index3 > -1) {
        val = url.slice(index3)
      }
      return this.apiConfig[str] + val
    },
    buildColumns(data) {
      // eslint-disable-next-line no-unused-expressions
      data.columns?.forEach(item => {
        this.customColumns(item)
      })
      // 扩展自定义列，需要expandColumns配置
      this.getExpandColumns(data)
    },
    // expandColumns: 扩展菜单表格属性配置；expandTitle：定义查询接口获取扩展菜单信息的参数名称
    getExpandColumns(data) {
      if (data.expandColumns && data.expandColumns.length > 0) {
        data.columns.unshift(
          { type: 'expand', key: 'expand', width: 30, render: (h, params) => {
            return h(expandColumns, {
              props: {
                row: params.row[data.expandTitle],
                columns: data.expandColumns
              }
            })
          } }
        )
      }
    },
    addQueryLog(data) {
      if (data.queryLog) {
        // eslint-disable-next-line no-unused-expressions
        data.baseCondition?.forEach(item => {
          this.labelMapFormat.push({
            [item.name]: item.label
          })
        })
        // eslint-disable-next-line no-unused-expressions
        data.moreCondition?.forEach(item => {
          this.labelMapFormat.push({
            [item.name]: item.label
          })
        })
      }
    },
    // 反洗钱日志留痕中文转换
    getTitleByValue(e, name) {
      if (this.xmlData.queryLog) {
        if (Array.isArray(e)) {
          this.queryMapFormat[name] = e.reduce((acc, cuur) => {
            return (acc += acc === '' ? cuur.label : ',' + cuur.label)
          }, '')
        } else {
          this.queryMapFormat[name] = e.label
        }
      }
    },
    formatterdate(val, config) {
      if (val && val.length !== 0) {
        if (config.ctype === 'daterange') {
          const start = this.dateToNumber(val[0])
          const end = this.dateToNumber(val[1])
          if (config.name.includes(',')) {
            const [startName, endName] = config.name.split(',')
            this.$refs.temp.form[startName] = start
            this.$refs.temp.form[endName] = end
          } else {
            this.$refs.temp.form[config.name] = start + ' - ' + end
          }
        } else if (config.ctype === 'date') {
          this.$refs.temp.form[config.name] = this.dateToNumber(val)
        }
      } else {
        if (config.ctype === 'daterange') {
          if (config.name.includes(',')) {
            const [startName, endName] = config.name.split(',')
            this.$refs.temp.form[startName] = ''
            this.$refs.temp.form[endName] = ''
          }
        }
      }
    },
    dateToNumber(date) {
      return date ? date.replace(/[/|-]/g, '') : ''
    },
    // ============以下函数对外暴露，可以在函数中进行重写===================
    // 自定义列展示，子组件需要复写，用于实现自定义render
    /**
     * 自定义列，如果需要自定义列，可以在methods中覆盖此方法
     * @param column 通过column获取当前列的信息
     */
    customColumns(column) {
      return column
    },
  }
}
</script>
