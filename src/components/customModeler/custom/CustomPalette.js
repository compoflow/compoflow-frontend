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

    /**
     * 启动节点
     * @returns {(function(*): void)|*}
     */
    function createStarter() {
        return function (event) {
            const businessObject = bpmnFactory.create('bpmn:Task', { custom: 0 });
            businessObject.id = 'Starter'
            const shape = elementFactory.createShape({
                type: 'bpmn:starter',
                businessObject,
            });
            create.start(event, shape);
        }
    }

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

    function createSuspend() {
        return function (event) {
            const businessObject = bpmnFactory.create('bpmn:Task', { custom: 3 });
            var arr = businessObject.id.split('_');
            arr[0] = 'Suspend'
            businessObject.id = arr[0] + '_' + arr[1]
            const shape = elementFactory.createShape({
                type: 'bpmn:suspend',
                businessObject
            });
            // const label = elementFactory.createLabel();
            // console.log(shape) // 只在拖动或者点击时触发
            // console.log(label) // 只在拖动或者点击时触发
            create.start(event, shape);
        }
    }

    /**
     * 过滤节点
     * @returns {(function(*): void)|*}
     */
    function createFilter() {
        return function (event) {
            const businessObject = bpmnFactory.create('bpmn:Task', { custom: 4 });
            var arr = businessObject.id.split('_');
            arr[0] = 'Filter'
            businessObject.id = arr[0] + '_' + arr[1]
            const shape = elementFactory.createShape({
                type: 'bpmn:filter',
                businessObject,
            });
            create.start(event, shape);
        }
    }

    /**
     * 分支节点
     * @returns {(function(*): void)|*}
     */
    function createSplit() {
        return function (event) {
            const businessObject = bpmnFactory.create('bpmn:Task', { custom: 5 });
            var arr = businessObject.id.split('_');
            arr[0] = 'Split'
            businessObject.id = arr[0] + '_' + arr[1]
            const shape = elementFactory.createShape({
                type: 'bpmn:split',
                businessObject,
            });
            create.start(event, shape);
        }
    }

    /**
     * 同步节点
     * @returns {(function(*): void)|*}
     */
    function createJoin() {
        return function (event) {
            const businessObject = bpmnFactory.create('bpmn:Task', { custom: 6 });
            var arr = businessObject.id.split('_');
            arr[0] = 'Join'
            businessObject.id = arr[0] + '_' + arr[1]
            const shape = elementFactory.createShape({
                type: 'bpmn:join',
                businessObject,
            });
            create.start(event, shape);
        }
    }

    return {
        'create.starter': {
            group: 'model',
            className: 'icon-custom starter',
            title: '创建任务容器',
            action: {
                dragstart: createStarter(),
                click: createStarter()
            }
        },
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
        },
        'create.suspend': {
            group: 'model',
            className: 'icon-custom suspend',
            title: '创建暂停器',
            action: {
                dragstart: createSuspend(),
                click: createSuspend()
            }
        },
        'create.filter': {
            group: 'model',
            className: 'icon-custom filter',
            title: '创建过滤器',
            action: {
                dragstart: createFilter(),
                click: createFilter()
            }
        },
        'create.split': {
            group: 'model',
            className: 'icon-custom split',
            title: '创建分支',
            action: {
                dragstart: createSplit(),
                click: createSplit()
            }
        },
        'create.join': {
            group: 'model',
            className: 'icon-custom join',
            title: '创建聚合',
            action: {
                dragstart: createJoin(),
                click: createJoin()
            }
        },
    }
}