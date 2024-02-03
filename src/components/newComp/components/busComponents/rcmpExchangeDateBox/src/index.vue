<script>
import formatter from "../../../../utils/formatter";
import fetch from "../../../../utils/api/api.js";
import exchangeDate from "../../../../utils/commonData/exchangeDate";
import { DatePicker } from "h_ui";

export default {
  name: "rcmpExchangeDateBox",
  extends: DatePicker,
  props: {
    baseServer: {
      type: String,
      default: ""
    },
    params: {
      type: Object,
      default: () => {}
    },
    showInitDate: {
      type: Boolean,
      default: true
    },
    format: {
      type: String,
      default: "yyyy-MM-dd"
    },
    showFormat: {
      type: Boolean,
      default: true
    },
    options: {
      type: Object,
      default: () => ({
        shortcuts: [
          {
            text: "上一交易日",
            value() {},
            onClick: picker => {
              // if (!picker.value[0]) {
              //   return;
              // }
              // // 当前选中的
              // let current = formatter.formatterDateToString(
              //   picker.value[0],
              //   "yyyyMMdd"
              // );
              // let index = this.exchangeDate.indexOf(current);
              // if (index > 0) {
              //   // 点击该按钮后，应该显示exchangeDate数组中的前一个
              //   let preDate = formatter.formatterDate(
              //     this.exchangeDate[index - 1]
              //   );
              //   console.log(preDate);
              //   picker.handlePick(preDate);
              //   // this.$emit("preDateClick", preDate);
              // }
            }
          },
          {
            text: "下一交易日",
            value() {},
            onClick: picker => {
              // if (!picker.value[0]) {
              //   return;
              // }
              // // 当前选中的
              // let current = formatter.formatterDateToString(
              //   picker.value[0],
              //   "yyyyMMdd"
              // );
              // let index = this.exchangeDate.indexOf(current);
              // if (index < this.exchangeDate.length - 1) {
              //   // 点击该按钮后，应该显示exchangeDate数组中的后一个
              //   let nextDate = formatter.formatterDate(
              //     this.exchangeDate[index + 1]
              //   );
              //   console.log(nextDate);
              //   picker.handlePick(nextDate);
              //   // this.$emit("nextDateClick", nextDate);
              // }
            }
          }
        ],
        disabledDate(date) {
          return (
            [].indexOf(formatter.formatterDateToString(date, "yyyyMMdd")) < 0
          );
        }
      })
    }
  },
  data() {
    return {
      busUrl: this.baseServer + "/getExchangeDateList",
      exchangeDate: [], // 可以选择的交易日期
      getExchangeDateList: exchangeDate
    };
  },
  created() {
    exchangeDate(this.busUrl, this.params).then(data => {
      this.exchangeDate = data;
      this.options.disabledDate = function(date) {
        return (
          data.indexOf(formatter.formatterDateToString(date, "yyyyMMdd")) < 0
        );
      };
      this.options.shortcuts = [
        {
          text: "上一交易日",
          value() {},
          onClick: picker => {
            let pickerDate = picker.value[0];
            if (!pickerDate) {
              pickerDate = new Date();
            }
            // 当前选中的
            let current = formatter.formatterDateToString(
              pickerDate,
              "yyyyMMdd"
            );
            let index = this.getcurrent(current);
            if (index > 0) {
              // 点击该按钮后，应该显示exchangeDate数组中的前一个
              let preDate = formatter.formatterDate(
                this.exchangeDate[index - 1]
              );
              picker.handlePick(preDate);
              this.$emit("preDateClick", preDate);
            }
          }
        },
        {
          text: "下一交易日",
          value() {},
          onClick: picker => {
            let pickerDate = picker.value[0];
            if (!pickerDate) {
              pickerDate = new Date();
            }
            // 当前选中的
            let current = formatter.formatterDateToString(
              pickerDate,
              "yyyyMMdd"
            );
            let index = this.getcurrent(current);
            let length =
              this.exchangeDate.indexOf(current) > -1
                ? this.exchangeDate.length - 1
                : this.exchangeDate.length;
            if (index < length) {
              // 点击该按钮后，应该显示exchangeDate数组中的前一个
              let preDate = formatter.formatterDate(
                this.exchangeDate[index + 1]
              );
              picker.handlePick(preDate);
              this.$emit("preDateClick", preDate);
            }
          }
        }
      ];
      if (this.showInitDate) {
        this.setInitDate();
      }
    });
  },
  methods: {
    getcurrent(dateStr) {
      let exchangeDateCopy = [].concat(this.exchangeDate);
      let currentIndex = exchangeDateCopy.indexOf(dateStr);
      if (currentIndex > -1) {
        return currentIndex;
      } else {
        exchangeDateCopy.push(dateStr);
        exchangeDateCopy.sort();
        return exchangeDateCopy.indexOf(dateStr);
      }
    },
    setInitDate() {
      let pickerDate = new Date();
      let current = formatter.formatterDateToString(pickerDate, "yyyyMMdd");
      let initDate = "";
      let index = this.exchangeDate.indexOf(current);
      if (index > -1) {
        initDate = formatter.formatterDate(this.exchangeDate[index]);
      } else {
        index = this.getcurrent(current);
        if (index > 0) {
          initDate = formatter.formatterDate(this.exchangeDate[index - 1]);
        } else {
          initDate = formatter.formatterDate(this.exchangeDate[index + 1]);
        }
      }
      this.$emit("input", initDate);
      this.$emit("setInitDateCall", initDate);
    }
  }
};
</script>
