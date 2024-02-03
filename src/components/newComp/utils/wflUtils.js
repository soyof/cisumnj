import services from './services';

// 通过流程实例号获取最新taskId
export const getTaskIdByProcessInstanceId = (wflServer, processInstanceId) => {
  wflServer = wflServer || '/hsrcm/hsrcm-wfl-server/v';
  return services.get(`${wflServer}/findLastTaskByInstanceId`, {
    process_instance_id: processInstanceId
  });
};
