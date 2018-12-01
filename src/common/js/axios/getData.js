import axios from './axios'
/*  登录  */
export const login = (data) => axios('/user/login/',data,'POST');
/*  入库  */
export const inbound = () => axios('/data/getInOrder/A15103796');
/*  入库查询多张单  */
export const incheck = (data) => axios('/data/getInOrder/'+data);
/*  打印  */
export const printAll = (data) => axios('/printer/printAll',data,'POST');
/*  缸号查询入库单  */
export const vatAll = (data) => axios('/data/getInNoListByVatDye/'+data);
/*  入库单查询单号  */
export const vatInNo = (data) => axios("/data/getListByInNo/" + data);
/*  保存入库打印信息  */
export const saveInbound =(data) => axios('/data/saveData/10/'+data.key ,data.form,'POST');
/*  校验查询  */
export const checkVerify = (data) => axios('/data/getValidateInOrder/'+data);
/*  校验新增  */
export const addList = (data) => axios('/data/getInOrderByEpc/'+data);
/*  开始校验  */
export const openCheck  = ()  => axios('/reader/validate');
/*  停止校验  */
export const closeCheck = () => axios('/reader/close');
/*  提交校验结果  */
export const postList = (data) => axios('/data/saveValidate/'+data);
/*  打印历史记录  */
export const printItem = (data)=> axios('/data/findInPrintHistory/'+data,data,'POST');
/*  校验历史记录  */
export const verifyItem = (data) => axios('/data/findInValidateHistory/'+data,data,'POST');
/*  根据缸号查入库单的单号列表 */


/*  出库 */
export const outbound = (data) => axios('/wms/product/out/'+ data);
/*  出库查询  */
export const outCheck = (data) => axios('/data/product/out/A15103796',data,'POST');
/*  出库查询校验  */

/*  缸号查询校验  */

/*  查询缸号后出库查询 */

/*  出库校验提交  */

