import rcmpFormatter from './utils/formatter';
import rcmpCommonFun from './utils/commonFun';
import rcmpSelect from './components/comComponents/rcmpSelect';
import rcmpSimpleSelect from './components/comComponents/rcmpSimpleSelect';
import rcmpTreeSelect from './components/comComponents/rcmpTreeSelect';
import rcmpZTreeSelect from './components/comComponents/rcmpZTreeSelect';
import rcmpSearchBox from './components/comComponents/rcmpSearchBox';
import rcmpDataGrid from './components/comComponents/rcmpDataGrid';
import rcmpDrawer from './components/comComponents/rcmpDrawer';

import rcmpMarketCodeSelect from './components/busComponents/rcmpMarketCodeSelect';
import rcmpDictCodeSelect from './components/busComponents/rcmpDictCodeSelect';
import rcmpDictCodeSimpleSelect from './components/busComponents/rcmpDictCodeSimpleSelect';
import rcmpRiskLevelSelect from './components/busComponents/rcmpRiskLevelSelect';
import rcmpBranchSelect from './components/busComponents/rcmpBranchSelect';
import rcmpUserOrgSelect from './components/busComponents/rcmpUserOrgSelect';
import rcmpBranchTreeSelect from './components/busComponents/rcmpBranchTreeSelect';
import rcmpExchangeDateBox from './components/busComponents/rcmpExchangeDateBox';
import rcmpSearchStockAccount from './components/busComponents/rcmpSearchStockAccount';
import rcmpSearchStockCode from './components/busComponents/rcmpSearchStockCode';
import rcmpSearchRelatedAccount from './components/busComponents/rcmpSearchRelatedAccount';
import rcmpSearchSelectTable from './components/busComponents/rcmpSearchSelectTable';

import rcmpRiskTypeTreeSelect from './components/busComponents/rcmpRiskTypeTreeSelect';
import rcmpRiskItemTreeSelect from './components/busComponents/rcmpRiskItemTreeSelect';
import rcmpAmsFundAccountTreeSelect from './components/busComponents/rcmpAmsFundAccountTreeSelect';
import rcmpAMSFundAccount from './components/busComponents/rcmpAMSFundAccount';
import rcmpMonitorGroup from './components/busComponents/rcmpMonitorGroup';
import rcmpStockGroup from './components/busComponents/rcmpStockGroup';
import rcmpAMSDepartment from './components/busComponents/rcmpAMSDepartment';
import rcmpBusinessFlag from './components/busComponents/rcmpBusinessFlag';
import rcmpAMSAsset from './components/busComponents/rcmpAMSAsset';
import rcmpUserSelect from './components/busComponents/rcmpUserSelect';

import rcmpSearchTemplate from './components/template/rcmpSearchTemplate';
import rcmpFlowDetialTemplate from './components/template/rcmpFlowDetialTemplate';
import rcmpRiskTemplate from './components/template/rcmpRiskTemplate';
import rcmpSettingDialogTemplate from './components/template/rcmpSettingDialogTemplate';
import rcmpSettingInlineTemplate from './components/template/rcmpSettingInlineTemplate';
import rcmpSplitTable from './components/template/rcmpSplitTable';

import HeaderLine from './components/otherComponents/headerLine';
import SelfEmpty from './components/otherComponents/selfEmpty';
import DebounceButton from './components/otherComponents/debounceButton';
import ThrottleButton from './components/otherComponents/throttleButton';
import SimpleTab from './components/otherComponents/simpleTab';
import SelfCollapse from './components/otherComponents/selfCollapse';
import SelfLoading from './components/otherComponents/selfLoading';
import AttachFileInfo from './components/otherComponents/attachFileInfo';
import WorkflowTemplate from './components/otherComponents/workflowTemplate';
import FileListDialog from './components/otherComponents/fileListDialog';
import SelfBaseInfo from './components/otherComponents/selfBaseInfo';
import MultiTabTmp from './components/otherComponents/multiTabTmp';
import SplitTableTmp from './components/otherComponents/splitTableTmp';
import SelfTooltip from './components/otherComponents/selfTooltip';
import WarningLevel from './components/otherComponents/warningLevel';
import SelfTableBaseInfo from './components/otherComponents/selfTableBaseInfo.vue';

const components = [
  rcmpSelect,
  rcmpSimpleSelect,
  rcmpTreeSelect,
  rcmpZTreeSelect,
  rcmpSearchBox,
  rcmpDataGrid,
  rcmpDrawer,
  rcmpMarketCodeSelect,
  rcmpDictCodeSelect,
  rcmpDictCodeSimpleSelect,
  rcmpRiskLevelSelect,
  rcmpBranchSelect,
  rcmpUserOrgSelect,
  rcmpBranchTreeSelect,
  rcmpExchangeDateBox,
  rcmpRiskTypeTreeSelect,
  rcmpRiskItemTreeSelect,
  rcmpAmsFundAccountTreeSelect,
  rcmpSearchStockAccount,
  rcmpSearchStockCode,
  rcmpSearchRelatedAccount,
  rcmpSearchSelectTable,
  rcmpAMSFundAccount,
  rcmpMonitorGroup,
  rcmpStockGroup,
  rcmpAMSDepartment,
  rcmpBusinessFlag,
  rcmpAMSAsset,
  rcmpUserSelect,
  rcmpSearchTemplate,
  rcmpFlowDetialTemplate,
  rcmpRiskTemplate,
  rcmpSettingDialogTemplate,
  rcmpSettingInlineTemplate,
  rcmpSplitTable,
  HeaderLine,
  SelfEmpty,
  DebounceButton,
  ThrottleButton,
  SimpleTab,
  SelfCollapse,
  SelfLoading,
  AttachFileInfo,
  WorkflowTemplate,
  FileListDialog,
  SelfBaseInfo,
  MultiTabTmp,
  SplitTableTmp,
  SelfTooltip,
  WarningLevel,
  SelfTableBaseInfo
];

import directives from './directives/index';
const install = (Vue) => {
  components.map(component => {
    Vue.component(component.name, component);
  });
  Vue.prototype.rcmpFormatter = rcmpFormatter;
  Vue.prototype.rcmpCommonFun = rcmpCommonFun;
  const direKeys = Object.keys(directives);
  direKeys.forEach(key => {
    Vue.directive(key, directives[key]);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

const rcmpComps = {
  install
};

export default rcmpComps;
