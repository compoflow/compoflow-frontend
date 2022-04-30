/*
 * @Author: Lavender
 * @Date: 2021-12-14 20:14:27
 * @LastEditors: Lavender
 * @LastEditTime: 2021-12-18 14:28:59
 * @Description: 点击元素会出现的一个小面板
 * @FilePath: /argo_bpmn/bpmnjs/src/components/customModeler/custom/CustomContextPadProvider.js
 */

export default function ContextPadProvider(contextPad, config, injector, translate, bpmnFactory, elementFactory, create, modeling, connect) {
    this.create = create
    this.elementFactory = elementFactory
    this.translate = translate
    this.bpmnFactory = bpmnFactory
    this.modeling = modeling
    this.connect = connect
    config = config || {}
    if (config.autoPlace !== false) {
        this._autoPlace = injector.get('autoPlace', false)
    }
    contextPad.registerProvider(this)
}
  
// TODO 删减权限，把原来自带的那些元素都删了
ContextPadProvider.$inject = [
    'contextPad',
    'config',
    'injector',
    'translate',
    'bpmnFactory',
    'elementFactory',
    'create',
    'modeling',
    'connect'
]
  
ContextPadProvider.prototype.getContextPadEntries = function(element) {}
