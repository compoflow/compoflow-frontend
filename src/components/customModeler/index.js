/*
 * @Author: Lavender
 * @Date: 2021-12-14 20:14:27
 * @LastEditors: Lavender
 * @LastEditTime: 2021-12-18 14:26:14
 * @Description: 将custom文件夹中的自定义模块导出
 * @FilePath: /argo_bpmn/bpmnjs/src/components/customModeler/index.js
 */

import Modeler from 'bpmn-js/lib/Modeler'
import CustomModule from './custom'
import inherits from 'inherits'

export default function CustomModeler(options) {
    Modeler.call(this,options)
    this._customElements=[]
}
inherits(CustomModeler,Modeler)
CustomModeler.prototype._modules=[].concat(
    CustomModeler.prototype._modules,[
        CustomModule
    ]
)
