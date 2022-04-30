/*
 * @Author: Lavender
 * @Date: 2021-12-14 20:14:27
 * @LastEditors: Lavender
 * @LastEditTime: 2021-12-18 14:36:33
 * @Description: 导出自定义的属性栏
 * @FilePath: /argo_bpmn/bpmnjs/src/components/properties-panel-extension/provider/metadata/index.js
 */

import MetadataPropertiesProvider from "./MetadataPropertiesProvider";

export default {
    __init__: ['propertiesProvider'],
    propertiesProvider: ['type',MetadataPropertiesProvider]
};