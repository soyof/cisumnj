import fetch from './api/api';

/**
 * 获取用户信息
 * @returns 用户信息
 */
export const getUserInfo = () => {
  const currentUser = window.localStorage.getItem('currentUser');
  const localStorageUser = window.localStorage.getItem('user');
  let userInfo = {};
  if (currentUser) {
    userInfo = {
      ...JSON.parse(currentUser)
    };
  }
  if (localStorageUser) {
    userInfo = {
      ...userInfo,
      ...JSON.parse(localStorageUser)
    };
  }
  return userInfo;
};

export const getCompany = (baseServer) => {
  baseServer = baseServer || '/hsrcm/hsrcm-pbs-server/v';
  return new Promise((resolve, reject) => {
    if (!sessionStorage.getItem('companyno')) {
      fetch.post(`${baseServer}/getCompany`, {}).then((res) => {
        const companyInfo = res.data || {};
        if (res.data.error_code) {
          reject();
        } else {
          sessionStorage.setItem('companyno', companyInfo.company_no);
          resolve(companyInfo.company_no);
        }
      }).catch(err => {
        reject(err);
      });
    } else {
      resolve(sessionStorage.getItem('companyno'));
    }
  });
};
