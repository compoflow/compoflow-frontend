/*
 * @Author: Lavender
 * @Date: 2021-12-14 20:14:27
 * @LastEditors: Lavender
 * @LastEditTime: 2022-03-27 18:25:24
 * @Description: 左边自定义的元素面板
 * @FilePath: /bpmn_workflow/src/components/customModeler/custom/CustomPalette.js
 */

// TODO 增加自定义元素的种类（需要开会）

import custom from ".";

export default function PaletteProvider(palette, create, elementFactory, globalConnect, bpmnFactory) {
    this.create = create;
    this.elementFactory = elementFactory;
    this.globalConnect = globalConnect;
    this.bpmnFactory = bpmnFactory;
    palette.registerProvider(this);
}

PaletteProvider.$inject = [
    'palette',
    'create',
    'elementFactory',
    'globalConnect',
    'bpmnFactory'
]

PaletteProvider.prototype.getPaletteEntries = function (element) {
    const {
        create,
        elementFactory,
        bpmnFactory
    } = this;

    function createDocker() {
        return function (event) {
            const businessObject = bpmnFactory.create('bpmn:Task', { custom: 1 });
            var arr = businessObject.id.split('_');
            arr[0] = 'Docker'
            businessObject.id = arr[0] + '_' + arr[1]
            const shape = elementFactory.createShape({
                type: 'bpmn:docker',
                businessObject,
            });
            // const label = elementFactory.createLabel();
            // console.log(shape) // 只在拖动或者点击时触发
            // console.log(label) // 只在拖动或者点击时触发
            create.start(event, shape);
        }
    }

    function createPythonScript() {
        return function (event) {
            const businessObject = bpmnFactory.create('bpmn:Task', { custom: 2 });
            var arr = businessObject.id.split('_');
            arr[0] = 'Pythonscript'
            businessObject.id = arr[0] + '_' + arr[1]
            const shape = elementFactory.createShape({
                type: 'bpmn:pythonscript',
                businessObject
            });
            // const label = elementFactory.createLabel();
            // console.log(shape) // 只在拖动或者点击时触发
            // console.log(label) // 只在拖动或者点击时触发
            create.start(event, shape);
        }
    }

    return {
        'create.docker': {
            group: 'model',
            className: 'icon-custom docker',
            title: '创建任务容器',
            action: {
                dragstart: createDocker(),
                click: createDocker()
            }
        },
        'create.pythonscript': {
            group: 'model',
            className: 'icon-custom pythonscript',
            title: '创建python脚本',
            action: {
                dragstart: createPythonScript(),
                click: createPythonScript()
            }
        }
    }
}