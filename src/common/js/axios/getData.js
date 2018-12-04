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
export const saveInbound =  (data) => axios('/data/saveData/10/'+data.key ,data.form,'POST');
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


/*  出库查询校验  */
export const outCheck = (data) => axios('/data/getValidateOutOrder/'+data);
/*  缸号查询校验  */
export const outVerify = (data) =>  axios('/data/getOutNoListByVatDye/'+data);
/*  查询缸号后出库查询 */
export const vatOut = (data) => axios('/data/getValidateOutOrder/'+data.outNo+"?vatDye="+data.vatNo);
/*  出库校验提交  */
export const postVerify = (data) => axios('/data/saveOutValidate/' + data);
/*  开始校验  */
export const openVerify = () => axios('/reader/validate?type=out');
/*  校验历史记录  */
export const verifyHistory = (data) =>  axios('/data/getOutValidateHistory/' + data,data,'POST');
