import httpFetch from '../api/api.js';
function exchangeDate(busUrl, params) {
  let exchangeDate = [];
  let httpGetFlag = false; // 发请求去获取数据
  try {
    let getExchangeDateList = sessionStorage.getItem("getExchangeDateList");
    if (getExchangeDateList) {
      getExchangeDateList = JSON.parse(getExchangeDateList);
      if (getExchangeDateList instanceof Array) {
        exchangeDate = getExchangeDateList;
        if (!exchangeDate.length) {
          httpGetFlag = true;
        }
      } else {
        httpGetFlag = true;
      }
    } else {
      httpGetFlag = true;
    }
  } catch (e) {
    httpGetFlag = true;
  }

  return new Promise((resolve) => {
    if (httpGetFlag) {
      return httpFetch({
        url: busUrl,
        method: "get",
        data: params,
        noFormat: true,
        responseType: "text"
      }).then(result => {
        var response = result.data.result;
        if (response && response.item && response.item.length > 0) {
          exchangeDate = response.item.sort();
        }
      }).finally(() => {
        sessionStorage.setItem(
          "getExchangeDateList",
          JSON.stringify(exchangeDate)
        );
        return resolve(exchangeDate);
      });
    } else {
      return resolve(exchangeDate);
    }
  });


}

/* httpFetch({
  url: this.busUrl,
  method: 'post',
  data: this.params,
  noFormat: true,
  responseType: 'text'
}).then(result => {
  var response = result.data.result
  if (response && response.length > 0) {
    exchangeDate = response
  }
}) */

// exchangeDate = ['20200605', '20200604']
// console.log(exchangeDate)
export default exchangeDate;
