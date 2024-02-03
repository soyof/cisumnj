import httpFetch from './api/api.js';
import { columnNameToFieldName } from './utils';

const getUserPermission = () => {
  return new Promise((resolve, reject) => {
    const rightCodeObj = window.FRAME_CONFIG.rightcodeObj || window.LOCAL_CONFIG.rightcodeObj || {};
    if (Object.keys(rightCodeObj).length > 0) {
      window.LOCAL_CONFIG.rightcodeObj = rightCodeObj; // 解决分支仍然从LOCAL_CONFIG中获取权限信息
      resolve(rightCodeObj);
    } else {
      httpFetch({
        url: window.FRAME_CONFIG.API_HOME + '/getUserPermissions',
        method: 'get'
      }).then((res) => {
        const permissionObj = res.data || {};
        const keys = Object.keys(permissionObj);
        const authInfo = {};
        keys.forEach((key) => {
          const keyArr = (key || '').split('$');
          const pageCode = keyArr[0];
          let rightCode = '';
          if (keyArr[1]) {
            rightCode = keyArr[1];
          }
          if (pageCode && rightCode) {
            if (pageCode in authInfo) {
              authInfo[pageCode].push(rightCode);
            } else {
              authInfo[pageCode] = [];
              authInfo[pageCode].push(rightCode);
            }
          }
        });
        // 将获取的权限保存在全局，便于其他子系统去使用
        window.FRAME_CONFIG.rightcodeObj = authInfo;
        window.LOCAL_CONFIG.rightcodeObj = authInfo;
        resolve(authInfo);
      }).catch(err => {
        reject(err);
      });
    }
  });
};

export default getUserPermission;

/**
 * 判断是否有单个 rightCode 权限，不传入 pageCode 调用时需要改变 this 指向为 Vue 中的 this
 * @async
 * @function hasPermission
 * @param {string} rightCode - 操作功能编号
 * @param {string} [pageCode] - 资源编号/菜单编码，可选，默认从路由中取值
 * @returns {Promise<boolean>} - 是否有单个 rightCode 权限的 Promise
 * @this Vue
 */
export const hasPermission = async function (rightCode, pageCode) {
  // 获取 pageCode
  pageCode = pageCode || this.$route?.meta.tempMenuTplId || this.$route?.meta.id || window.sessionStorage.getItem('activeTabId');
  if (!pageCode) return false;
  // 获取全部权限
  const authInfo = await getUserPermission();
  // 获取 pageCode 页面全部权限
  const rightCodeList = authInfo[pageCode] || [];
  // 是否有权限
  return rightCodeList.includes(rightCode);
};

/**
 * 权限指令 v-permission
 * @type Vue.DirectiveOptions
 */
export const permissionDirective = {
  async bind(el, binding, vnode) {
    // 保存原有 display 样式，判断是否有权限前先隐藏元素
    const displayValue = el.style.display;
    el.style.display = 'none';

    // 获取 pageCode
    let pageCode = binding.arg ? binding.arg : (vnode.context.$route.meta.tempMenuTplId || vnode.context.$route.meta.id);
    // 下划线转驼峰
    if (window.LOCAL_CONFIG.isUnderscore + '' === 'true') pageCode = columnNameToFieldName(pageCode);

    // 是否为配置式（binding.value 为配置对象）
    const isOption = binding.modifiers.option && typeof binding.value === 'object';

    // 获取操作功能编号
    const rightCode = isOption ? binding.value['rightCode'] : binding.value;

    let permissionFlag = false;

    // 是否判断多个权限
    if (binding.modifiers.multiple) {
      if (Array.isArray(rightCode)) {
        for (let i = 0; i < rightCode.length; i++) {
          // 是否有权限
          permissionFlag = await hasPermission(rightCode[i], pageCode);
          if (!permissionFlag) break; // 无权限，终止循环
        }
      }
    } else {
      // 是否有权限
      permissionFlag = await hasPermission(rightCode, pageCode);
    }

    if (!permissionFlag) {
      // 无权限
      if (binding.modifiers.hint) {
        // 显示提示信息
        const div = document.createElement('div');
        div.innerHTML = isOption && binding.value['noPermissionText'] ? binding.value['noPermissionText'] : '无权限';
        div.style.height = '100%';
        div.style.display = 'flex';
        div.style.justifyContent = 'center';
        div.style.alignItems = 'center';
        el.parentNode.replaceChild(div, el);
      } else {
        // 移除 DOM
        el.remove();
      }
    } else {
      // 有权限，还原原有样式
      el.style.display = displayValue;
    }
  }
};
