/*
 * @Author: Lavender
 * @Date: 2021-12-14 20:14:27
 * @LastEditors: Lavender
 * @LastEditTime: 2021-12-18 14:35:13
 * @Description: 从custom文件夹中导出自定义的模块
 * @FilePath: /argo_bpmn/bpmnjs/src/components/customModeler/custom/index.js
 */

import CustomPalette from "./CustomPalette";
import CustomRenderer from "./CustomRenderer";

export default {
    __init__:['paletteProvider','customRenderer'],
    paletteProvider:['type',CustomPalette],
    customRenderer:['type',CustomRenderer]
}