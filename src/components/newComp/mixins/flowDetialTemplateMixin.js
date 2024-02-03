export default {
  props: {
    flowTextInfo: {
      type: Object,
      default: () => ({
        search: '查询',
        reset: '重置',
        export: '导出',
        advancedSearch: '高级查询',
        triggerName: '触发原因',
        riskFlowName: '预警流水'
      })
    },
    activeTabName: {
      type: String,
      default: 'triggerDetial'
    },
    showTrigger: {
      type: Boolean,
      default: true
    },
    showRiskFlow: {
      type: Boolean,
      default: true
    },
    pageSizeOpts: {
      type: Array,
      default: () => {
        return [5, 10, 15, 20];
      }
    },
    triggerColumns: {
      type: Array,
      default: () => {
        return [];
      }
    },
    riskFlowColumns: {
      type: Array,
      default: () => {
        return [];
      }
    },
    flowAutoLoad: {
      type: Boolean,
      default: false
    },
    triggerUrl: {
      type: String,
      default: ''
    },
    riskFlowUrl: {
      type: String,
      default: ''
    },
    triggerDetialArgs: {
      type: Array,
      default: () => {
        return ['monitor_id'];
      }
    },
    riskFlowDetialArgs: {
      type: Array,
      default: () => {
        return ['monitor_id'];
      }
    },
    riskFlowAdvanceFormArgs: {
      type: Object,
      default: () => ({})
    },
    selectItem: {
      type: Object,
      default: () => ({})
    },
    triggerHasOperBtn: {
      type: Boolean,
      default: false
    },
    baseServer: {
      type: String,
      default: ""
    },
    // 按钮权限
    btnRightCode: {
      type: Object,
      default: () => { return {}; }
    },
    showConditionTrigger: {
      type: Boolean,
      default: false
    },
    triggerConditionColumns: {
      type: Array,
      default: () => {
        return [
          { title: "后置条件",
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                {
                  style: {
                    textAlign: 'center',
                  }
                },
                params.row.condition_name
              );
            },
            key: "condition_name", width: 100, ellipsis: true, sortable: true},
          { title: "初始阈值",
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                {
                  style: {
                    textAlign: 'center',
                  }
                },
                params.row.condition_value_list_desc
              );
            },
            key: "condition_value_list_desc", minWidth: 200, ellipsis: true, sortable: true},
          { title: "实际值",
            align: "center",
            render: (h, params) =>{
              return h(
                "div",
                {
                  style: {
                    textAlign: 'center',
                  }
                },
                params.row.condition_value_desc
              );
          },
            key: "condition_value_desc", minWidth: 100, ellipsis: true, sortable: true},
          { title: "触发表达式",
            align: "center",
            key: "condition_expression_desc", minWidth: 100, ellipsis: true, sortable: true}
        ];
      }
    },
    triggerConditionUrl: {
      type: String,
      default: ''
    }
  }
};
