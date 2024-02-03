export const targetClientInfo = (_this, info) => {
  const query = {
    branch_no: info.branch_no,
    client_id: info.client_id
  };
  _this.$tabs.addNewTab(
    `srmps_srmps_0003_customInfoView_${info.client_id}_${info.branch_no}`, // 添加 _customInfoView 后缀防止路由跳转失败
    `/hsrcmSrmps/views/customInfoView_${info.client_id}_${info.branch_no}`,
    query,
    `客户明细-${info.client_name || info.client_id}`,
    '',
    true,
    'hsrcmSrmps',
    'srmps_srmps_0003'
  );
  _this.$tabs.refresh(`srmps_srmps_0003_customInfoView_${info.client_id}_${info.branch_no}`);
};

export const targetAbmStartWflPage = (_this, riskInfo) => {
  const ids = `srmps_wfl_0001_-${riskInfo.monitor_id}-${riskInfo.scene_occur_id}-${riskInfo.occur_date}`;
  const main = {
    processKey: 'abm_risk_process',
    isInitiate: true,
    menuId: ids,
    riskClassType: riskInfo.risk_class_type,
    searchParamsList: [
      {
        scene_occur_id: riskInfo.scene_occur_id,
        occur_date: riskInfo.occur_date,
        monitor_id: riskInfo.monitor_id
      }
    ]
  };
  _this.$tabs.addNewTab(
    ids,
    `/workflow/client/taskProcess/startProcessList_srmps_wfl_0001_${ids}`,
    { main: JSON.stringify(main) },
    `${riskInfo.risk_name || riskInfo.scene_name}_发起工作流`,
    '',
    true,
    'hsrcmSrmps',
    'srmps_wfl_0001'
  );
};

export const targetAbmDtlPage = (_this, riskInfo) => {
  const pathId = `${riskInfo.scene_occur_id}_${riskInfo.risk_id}_${riskInfo.monitor_id}_${riskInfo.occur_date}`;
  _this.$tabs.addNewTab(
    `riskDtlPage_${pathId}`,
    `/hsrcmSrmps/views/riskDtlPage_${pathId}`,
    {
      risk_id: riskInfo.risk_id,
      risk_name: encodeURIComponent(riskInfo.risk_name || riskInfo.scene_name),
      monitor_id: riskInfo.monitor_id,
      occur_date: riskInfo.occur_date,
      scene_occur_id: riskInfo.scene_occur_id
    },
    `【${riskInfo.risk_name || riskInfo.scene_name}】预警详情`,
    '',
    true,
    'hsrcmSrmps',
    'riskDtlPage'
  );
};

export const targetAbmWflPage = (_this, taskId, viewMode) => {
  const mainInfo = {
    taskId: taskId,
    viewMode: !!viewMode
  };
  const menuId = `srmps_wfl_0001_${taskId}`;
  _this.$tabs.addNewTab(
    menuId,
    `/workflow/client/taskProcess/todoTask_srmps_wfl_0001_${taskId}`,
    {
      toview: 'srmps_wfl_0001',
      tomodule: 'hsrcmSrmps',
      toapp: 'hsrcmSrmps',
      _system_name: 'hsrcmSrmps',
      menu_arg: '{}',
      main: JSON.stringify(mainInfo),
      _menu_id: menuId,
      _route_resourceId: 'srmps_wfl_0001',
      viewMode: !!viewMode
    },
    `提交任务[${taskId}]`,
    '',
    true,
    'hsrcmSrmps',
    'srmps_wfl_0001'
  );
};

export const targetSceneWflPage = (_this, taskId, viewMode) => {
  const mainInfo = {
    taskId: taskId,
    viewMode: !!viewMode
  };
  const menuId = `srmps_wfl_0003_dealProcessPage_${taskId}`;
  _this.$tabs.addNewTab(
    menuId,
    `/workflow/client/taskProcess/todoTask_srmps_wfl_0003_${taskId}`,
    {
      toview: 'srmps_wfl_0003',
      tomodule: 'hsrcmSrmps',
      toapp: 'hsrcmSrmps',
      _system_name: 'hsrcmSrmps',
      menu_arg: '{}',
      main: JSON.stringify(mainInfo),
      _menu_id: menuId,
      _route_resourceId: 'srmps_wfl_0003',
      viewMode: !!viewMode
    },
    `${viewMode ? '查看任务' : '提交任务'}[${taskId}]`,
    '',
    true,
    'hsrcmSrmps',
    'srmps_wfl_0003'
  );
};

export const targetRemarkPage = (_this, idList, viewMode, isFromWorkbench, fromList) => {
  _this.$tabs.addNewTab(
    `srmps_srmps_0006_${idList.join(',')}`,
    `/hsrcmSrmps/views/remarkBatchPage`,
    {
      ids: JSON.stringify(idList),
      isFromWorkbench: !!isFromWorkbench,
      fromList: !!fromList,
      viewMode: !!viewMode
    },
    `${viewMode ? '查看' : ''}批注[${idList.join(',')}]`,
    '',
    true,
    'hsrcmSrmps',
    'srmps_srmps_0006'
  );
};
