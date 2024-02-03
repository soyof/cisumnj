<template>
  <div style="display:flex;">
    <h-select-tree
      :ref="refDom"
      :value="value"
      :firstValue="firstValue"
      :data="listData"
      :placeholder="placeholder"
      :showCheckbox="multiple"
      :clearable="clearable"
      :checkStrictly="checkStrictly"
      :filterable="filterable"
      :isTreeFilter="isTreeFilter"
      :onlyChild="onlyChild"
      :disabled="isDisabled"
      :showBottom="showBottom"
      :transfer="transfer"
      :remote="remote"
      :remote-method="remoteFn"
      :isString="isString"
      :formatValue="formatValue"
      :checkIndeter="checkIndeter"
      :dropWidth="dropWidth"
      :targetNode="targetNode"
      :autoPlacement="autoPlacement"
      @on-blur="blurFn"
      @on-select-change="selectedChange"
      @on-check-change="checkedChange"
    >
      <div slot="header" class="header-bth">
        <h-button-group>
          <h-button type="primary" @click.stop="expendData(1)">全部展开</h-button>
          <h-button type="primary" @click.stop="expendData(0)">全部折叠</h-button>
        </h-button-group>
      </div>
    </h-select-tree>
  </div>
</template>
<script>
import httpFetch from '../../../../utils/api/api.js';
export default {
  name: 'rcmpZTreeSelect',
  props: {
    refDom: {
      type: String,
      default: 'rcmpZTree'
    },
    busUrl: {
      type: String,
      default: ''
    },
    dropWidth: {
      type: [String, Number],
      default: ''
    },
    treeList: {
      type: Array,
      default: () => []
    },
    value: {
      type: [String, Number, Array],
      default: () => []
    },
    filterable: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: true
    },
    checkStrictly: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    showBottom: {
      type: Boolean,
      default: true
    },
    transfer: {
      type: Boolean,
      default: false
    },
    isString: {
      type: Boolean,
      default: false
    },
    formatValue: {
      type: String,
      default: 'id'
    },
    isTreeFilter: {
      // 是否进行下拉树过滤，不能与remote同时使用
      type: Boolean,
      default: false
    },
    onlyChild: {
      type: Boolean,
      default: false
    },
    checkIndeter: {
      type: Boolean,
      default: false
    },
    remote: {
      type: Boolean,
      default: false
    },
    // remoteFn: {
    //   type: Function,
    //   default: () => {}
    // },
    methodType: {
      type: String,
      default: 'get'
    },
    params: {
      type: Object,
      default: () => ({})
    },
    targetNode: { // h_ui 1.52.0版本及以上支持
      type: String,
      required: false,
      default: _ => undefined
    },
    autoPlacement: {
      type: Boolean,
      required: false,
      default: _ => true
    }
  },
  data() {
    return {
      defaultListData: [],
      listData: [],
      defaultValue: [],
      firstValue: '',
      totalSelected: null,
      currentQuery: false
    };
  },
  created() {
    if (this.value || this.value === 0) {
      this.firstValue = JSON.parse(JSON.stringify(this.value));
    }
    // 如果有请求，根据配置的请求获取数据
    this.listData = JSON.parse(JSON.stringify(this.treeList));
    this.defaultListData = JSON.parse(JSON.stringify(this.treeList));
    this.urlPath = this.busUrl;
  },
  mounted() {
    // 如果有请求，根据配置的请求获取数据
    this.requestData();
  },
  methods: {
    // 点击树节点
    selectedChange(data) {
      if (data.length > 0) {
        !this.multiple && this.$emit('input', data[0][this.formatValue]);
        this.$emit('selectedChange', data);
      }
    },
    // 点击复选框
    checkedChange(data) {
      this.currentQuery = true;
      const arr = [];
      data.forEach((item) => {
        if (this.onlyChild && !this.checkStrictly) {
          if (!item.children || item.children.length === 0) {
            arr.push(item);
          }
        } else {
          arr.push(item);
        }
      });
      if (this.checkIndeter && !this.checkStrictly) {
        const interArr = this.$refs[this.refDom].$refs.tree.getIndeterminateNodes();
        interArr.forEach((ite) => {
          arr.push(ite);
        });
      }
      const list = arr.map(one => {
        return one[this.formatValue];
      });
      this.$emit('input', this.isString ? list.join(',') : list);
      this.$emit('checkedChange', data);
    },
    // 获取默认数据
    requestData() {
      if (this.urlPath && this.treeList.length === 0) {
        httpFetch({
          url: this.urlPath,
          method: this.methodType,
          data: this.params,
          noFormat: true,
          responseType: 'text'
        }).then(result => {
          if (result.data.error_code) {
            this.$hMessage.error(result.data.error_message || '获取数据失败！');
            return;
          }
          // var response = JSON.parse(JSON.stringify(result.data));
          const response = JSON.parse(JSON.stringify(result.data.result));
          if (response && response.length > 0) {
            this.listData = [...response];
            this.defaultListData = JSON.parse(JSON.stringify(response));
          }
          const isArray = (this.multiple && !this.isString);
          if (isArray) {
            if (this.value && this.value.length > 0) {
              this.firstValue = JSON.parse(JSON.stringify(this.value));
            }
          } else {
            if (this.value && this.value.length > 0) {
              this.firstValue = JSON.parse(JSON.stringify(this.value));
            }
          }
        });
      }
    },
    // 树展开和折叠
    expendData(type) {
      const tree = this.$refs[this.refDom].$children.find((child) => {
        return child.$el.classList.contains('h-select-dropdown');
      }).$children[1];
      tree.expandTree(type);
    },
    // 过滤
    filter(nodes, query) {
      const predicate = function(node) {
        if (node.title.indexOf(query) > -1) {
          return true;
        }
        return false;
      };
      if (!(nodes && nodes.length)) {
        return [];
      }
      const newChildren = [];
      for (const node of nodes) {
        const subs = this.filter(node.children, query);
        // 以下两个条件任何一个成立，当前节点都应该加入到新子节点集中
        // 1. 子孙节点中存在符合条件的，即 subs 数组中有值
        // 2. 自己本身符合条件
        if (predicate(node)) {
          newChildren.push(node);
        } else if (subs && subs.length) {
          node.children = subs;
          newChildren.push(node);
        }
      }
      return newChildren.length ? newChildren : [];
    },
    blurFn() {
      this.$emit('onBlur');
      if (!this.remote) {
        return;
      }
      if (!this.currentQuery) {
        this.remoteFn('');
      }
      this.currentQuery = false;
    },
    remoteFn(query) {
      if (!this.remote) {
        return;
      }
      const defaultListData = JSON.parse(JSON.stringify(this.defaultListData));
      this.listData = this.filter(defaultListData, query);
    }
  }
};
</script>
<style scoped>
.header-bth {
  text-align: center;
  margin-top: 8px;
}
/deep/ .h-selectTree-dropdown-content .h-selectTree-dropdown-list {
  max-height: inherit !important;
}
</style>
<style>
.h-selectTree-dropdown-content .h-selectTree-dropdown-list .h-tree-empty {
  text-align: center;
}
</style>
