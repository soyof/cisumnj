<!-- 自动查询框架,带设置功能 -->
<template>
  <div style="padding: 16px;">
    <rcmpSearchTemplate
      v-if="xmlData && templateShow"
      ref="temp"
      :baseSearch="xmlData.baseCondition && xmlData.baseCondition.length > 0"
      :btnRightCode="xmlData.btnRightCode ? btnRightCode : {}"
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
      :onSelectChange="handleSelectChange"
      :pageSizeOpts="xmlData.pageSizeOpts || pageSizeOpts"
      :queryMapFormat="queryMapFormat"
      :queryParamTrim="xmlData.queryParamTrim === undefined ? true : xmlData.queryParamTrim"
      :selfAdaptTable="'datagrid'"
      :showExportBtnByUrl="!!xmlData.exportUrl"
      :showListCkeckBox="xmlData.showListCkeckBox === undefined ? true : xmlData.showListCkeckBox"
      :showRefreshBtn="xmlData.showRefreshBtn === undefined ? true : xmlData.showRefreshBtn"
      :url="xmlData.url"
      :autoLoad="autoLoad"
    >
      <div slot="opreBtns" style="display:flex; gap: 8px;">
        <template v-for="item in xmlData.opreBtns">
          <h-button
            v-if="item.htype === 'hButton'"
            :key="item.label"
            v-bind="item"
            :style="{order: item.order || 0}"
            :type="item.type || 'ghost'"
            @click="handleClick(item)"
          >{{ item.label }}</h-button>
        </template>
      </div>
      <template v-if="xmlData.baseCondition && xmlData.baseCondition.length" v-slot:baseCondition="{ form }">
        <QueryFormItem
          v-for="item in xmlData.baseCondition"
          :key="item.name"
          :config="item"
          :form="form"
          :formatterdate="formatterdate"
          :getTitleByValue="getTitleByValue"
        />
      </template>
      <template v-if="xmlData.moreCondition && xmlData.moreCondition.length" v-slot:moreCondition="{ form }">
        <QueryFormItem
          v-for="item in xmlData.moreCondition"
          :key="item.name"
          :config="item"
          :form="form"
          :formatterdate="formatterdate"
          :getTitleByValue="getTitleByValue"
        />
      </template>
    </rcmpSearchTemplate>

  </div>
</template>

<script>
import QueryFormItem from './components/QueryFormItem.vue'
import expandColumns from './components/expandColumns.vue'
import $http from '../../utils/services'
import dayjs from '../../utils/dayjs'
export default {
  // 自动查询框架
  name: 'rcmpSimpleManage',
  components: {
    QueryFormItem,
    // eslint-disable-next-line vue/no-unused-components
    expandColumns
  },
  data() {
    return {
      xmlData: null,
      baseClass: 'simple-manage',
      menuCode: this.$route.meta.id, // 菜单编号
      pageSizeOpts: [10, 20, 50, 100], // 默认分页
      advancedSearch: false, // 高级查询,
      // 按钮权限
      btnRightCode: {
        exportRightCode: 'exportRightCode' // 导出
      },
      labelMapFormat: [],
      queryMapFormat: {},
      selectRows: [],
      templateShow: true, // 用于配置页面是否自动查询
      autoLoad: true // 默认自动查询
    }
  },
  created() {
    this.getXmlData()
    if (!this.apiConfig) throw new Error('请在子组件的data中定义apiConfig')
  },
  methods: {
    async getXmlData() {
      const res = await $http.get(`${this.apiConfig.PBS_API}/getMenuPageInfo?menu_code=` + this.menuCode)
      const { return_code, result } = res
      if (return_code === 0) {
        let xmlData = null
        try {
          xmlData = result.content[0]
        } catch (error) {
          this.$hMessage.error('xml配置有误，请检查！')
          throw new Error('xml配置有误，请检查！')
        }
        this.handleXmlData(xmlData)
        // 处理formArgs
        const formArgs = {}
        const arrType = ['hSelectTree', 'hSelect']
        // eslint-disable-next-line no-unused-expressions
        xmlData.baseCondition?.forEach(item => {
          if (arrType.includes(item.htype) && item.multiple && !item.isString) {
            formArgs[item.name] = []
          } else if (item.htype === 'hInputNumber') {
            formArgs[item.name] = null
          } else{
            formArgs[item.name] = ''
          }
          this.handleDateRange(formArgs, item)
        })
        // eslint-disable-next-line no-unused-expressions
        xmlData.moreCondition?.forEach(item => {
          if (arrType.includes(item.htype) && item.multiple && !item.isString) {
            formArgs[item.name] = []
          } else if (item.htype === 'hInputNumber') {
            formArgs[item.name] = null
          } else {
            formArgs[item.name] = ''
          }
          this.handleDateRange(formArgs, item)
        })
        xmlData.formArgs = formArgs

        this.changeUrl(xmlData) // 对 url 进行处理
        this.buildColumns(xmlData) // 对 columns 进行处理
        this.addQueryLog(xmlData) // 增加反洗钱日志留痕
        this.xmlData = xmlData

        this.AfterGetData()
      }
    },
    handleDateRange(formArgs, item) {
      if (Object.keys(this.$route.query).length > 0) return
      // 额外处理日期
      if (item.htype === 'hDate' && item.ctype === 'daterange') {
        if (item.value) {
          const [startName, endName] = item.name.split(',')
          let startTime = ''
          let endTime = ''
          // 处理value值
          let values = item.value.split(',').map(s => s.trim())
          if (values[0] === 'current') {
            if (values.length === 3) {
              const [, type, number] = values
              const n = Number(number)
              const t = type === 'M' ? 'M' : type.toLowerCase()
              if (n < 0) {
                startTime = dayjs().add(n, t)
                endTime = dayjs()
              } else {
                startTime = dayjs()
                endTime = dayjs().add(n, t)
              }
            } else {
              startTime = dayjs()
              endTime = dayjs()
            }
            formArgs[item.name] = [startTime, endTime]
            formArgs[startName] = startTime.format('YYYYMMDD')
            formArgs[endName] = endTime.format('YYYYMMDD')
          } else {
            if (values.length === 2) {
              startTime = dayjs(values[0])
              endTime = dayjs(values[1])
              formArgs[item.name] = [startTime, endTime]
              formArgs[startName] = startTime.format('YYYYMMDD')
              formArgs[endName] = endTime.format('YYYYMMDD')
            }
          }
        }
      }
    },
    // 刷新
    refresh() {
      this.$refs.temp.formSearch()
    },
    handleSelectChange(arr, selectInx) {
      this.selectRows = arr
    },
    changeUrl(data) {
      if (data.baseServer) {
        data.baseServer = this.getNewUrl(data.baseServer)
      }
      if (data.baseServer) {
        data.url = this.getNewUrl(data.url)
        // 处理 url 上的查询字符串，放入 formArgs 中
        if (data.url.includes('?')) {
          const [url, queryString] = data.url.split('?')
          data.url = url
          if (queryString) {
            const queries = {}
            queryString.split('&').forEach(query => {
              const [key, value] = query.split('=')
              queries[key] = value
            })
            data.formArgs = Object.assign(data.formArgs, queries)
          }
        }
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
        // 处理操作列
        if (item.htype === 'columns' && item.key === 'action') {
          // 处理自定义列
          item.render = (h, params) => {
            let buttons = item.actions.map(action => {
              return (
                <a key={item.key} onClick={() => this.handleAction(params, action)}>{action.text}</a>
              )
            })
            buttons = [...buttons, ...this.extraColumnActions(params)]
            return (
              // 内置的按钮
              <div class='operator'>
                { buttons}
              </div>
            )
          }
        } else {
          this.customColumns(item)
        }
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
    // 内置的按钮时事件
    handleAction(params, action) {
      if (action.event === 'del') {
        this.handleDel(params, action)
      }
    },
    async handleDel(params, action) {
      const { row } = params
      const { method = 'post' } = action
      // 删除前校验
      const res = this.beforeDel(params)
      if (res instanceof Promise) {
        await res
      } else if (!res) {
        return
      }
      this.$hMsgBox.confirm({
        title: '确认',
        content: `<p>确定要删除选中数据？</p>`,
        onOk: async() => {
          const params = {
            [action.key]: row[action.key],
            formatter: this.xmlData.formatter,
            menu_code: this.$route.meta.id
          }
          const url = this.getNewUrl(action.url)
          await $http[method](url, params)
          this.$hMessage.success('删除成功！')
          this.refresh()
        }
      })
    },
    // 处理额外插槽
    handleOpreBtns(superRender) {
      const extraButtons = this.extraButtons()
      if (extraButtons && extraButtons.length > 0) {
        const templateVnode = superRender.children[0]
        if (templateVnode.componentOptions && templateVnode.componentOptions.children) {
          const slotVNodes = templateVnode.componentOptions.children
          slotVNodes.forEach(vNode => {
            if (vNode.data?.slot === 'opreBtns') {
              vNode.children.push(...extraButtons)
            }
          })
        }
      }
    },
    handleClick(item) {
      // eslint-disable-next-line no-unused-expressions
      this[item.event]?.(item)
    },
    // 批量删除
    async delBatch(config) {
      if (!this.selectRows.length) {
        this.$hMessage.warning('请选择数据进行删除！')
        return
      }

      // 删除前校验
      const res = this.beforeDelBatch(this.selectRows)
      if (res instanceof Promise) {
        await res
      } else if (!res) {
        return
      }

      this.$hMsgBox.confirm({
        title: '确认',
        content: `<p>确定要删除选中的数据？</p>`,
        onOk: async() => {
          const { key = 'id', method = 'post', keyType = 'string' } = config
          const url = this.getNewUrl(config.url)
          let ids = ''
          if (keyType === 'string') {
            ids = this.selectRows.reduce((acc, cuur) => {
              return (acc += acc === '' ? cuur[key] : ',' + cuur[key])
            }, '')
          } else {
            ids = this.selectRows.map(config => config[key])
          }
          const params = {
            [key]: ids
          }
          const res = await $http[method](url, params)
          const { error_code } = res
          if (error_code) {
            this.$hMessage.error('删除失败!')
          } else {
            this.$hMessage.success('删除成功！')
            this.refresh()
          }
        }
      })
    },
    // ============以下函数对外暴露，可以在函数中进行重写===================
    /**
     * 删除前的校验,如果需要校验，可以在methods中覆盖此方法
     * @returns {boolean | Promise}
     */
    beforeDel() {
      return true
    },
    /**
     * 批量删除前的校验,如果需要校验，可以在methods中覆盖此方法
     * @returns {boolean | Promise}
     */
    beforeDelBatch() {
      return true
    },
    /**
     * 自定义列，如果需要自定义列，可以在methods中覆盖此方法
     * @param column 通过column获取当前列的信息
     */
    customColumns(column) {
      return column
    },
    /**
     * 自定义操作列中的按钮，如果需要自定义列，可以在methods中覆盖此方法
     */
    extraColumnActions() {
      return []
    },
    /**
     * 自定义额外的操作按钮，如果需要自定义操作按钮，可以在methods中覆盖此方法
     */
    extraButtons() {
      return []
    },
    /**
     * 发送请求获取模板数据后的hook，一般用于处理初始查询条件
     */
    AfterGetData() {},
    /**
     * 用于处理接口返回的xmlData，一般用于需要进行参数判断后做个性化改造的特殊情况
     */
    handleXmlData(xmlData) {
      return xmlData
    }
  }
}
</script>
