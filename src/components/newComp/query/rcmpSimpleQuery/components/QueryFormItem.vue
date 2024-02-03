<template>
  <h-form-item :label="config.label" :labelTitle="config.labelTitle || config.label">
    <!-- input框 -->
    <h-input v-if="config.htype === 'hInput'" v-model="form[config.name]" :disabled="config.disabled"
             :placeholder="config.placeholder"
    />
    <!-- 下拉选择框 -->
    <rcmpSimpleSelect
      v-if="config.htype === 'hSelect' && config.busUrl"
      v-model="form[config.name]"
      :disabled="config.disabled"
      :placeholder="config.placeholder || '请选择'"
      :busUrl="config.busUrl"
      :multiple="config.multiple"
      :isString="config.isString"
      :isCheckall="config.multiple"
      :filterable="config.filterable"
      :showBottom="config.multiple"
      :labelInValue="config.labelInValue"
      :labelField="config.labelField"
      :valueField="config.valueField"
      @onChange="
        (e) => {
          getTitleByValue(e, config.name);
        }
      "
    />
    <!-- 字典项下拉选择框 -->
    <rcmpDictCodeSimpleSelect
      v-if="config.htype === 'hSelect' && config.dict"
      :disabled="config.disabled"
      :placeholder="config.placeholder || '请选择'"
      v-model="form[config.name]"
      :dictEntr="config.dict"
      :multiple="config.multiple"
      :isString="config.isString"
      :isCheckAll="config.multiple"
      :filterable="config.filterable"
      :showBottom="config.multiple"
      :labelInValue="config.labelInValue"
      :labelField="config.labelField"
      :valueField="config.valueField"
      :baseServer="pbsServer"
      @onChange=" (e) => { getTitleByValue(e, config.name) }
      "
    />
    <!-- 树形菜单 -->
    <rcmpZTreeSelect
      v-if="config.htype === 'hSelectTree' && config.busUrl"
      :busUrl="config.busUrl"
      v-model="form[config.name]"
      :multiple="config.multiple"
      :isString="config.isString"
      :filterable="config.filterable"
      :showBottom="config.showBottom"
      :isTreeFilter="true"
      :dropWidth="400"
      :onlyChild="config.onlyChild"
      :placeholder="config.placeholder || '请选择'"
    />

    <!-- 日期处理 -->
    <h-date-picker
      v-if="config.htype === 'hDate'"
      v-model="form[config.name]"
      :showFormat="true"
      :type="config.ctype"
      :placeholder="config.placeholder || '请选择'"
      :format="config.format || 'yyyy/MM/dd'"
      @on-change="(val) => { formatterdate(val, config) }"
    />
  </h-form-item>

</template>

<script>
export default {
  name: 'QueryBaseForm',
  props: {
    config:
    {
      type: Object,
      default: () => {}
    },
    form: {
      type: Object,
      default: () => {}
    },
    baseServer: {
      type: String,
      default: ''
    },
    getTitleByValue: {
      type: Function,
      default: null
    },
    formatterdate: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      pbsServer: '/hsrcm/hsrcm-pbs-server/v'
    };
  },
  created() {
  },
  methods: {
  }
};
</script>

<style></style>
