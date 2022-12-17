/*
 * @Author: Lavender
 * @Date: 2021-12-14 20:14:27
 * @LastEditors: Lavender
 * @LastEditTime: 2021-12-18 14:32:50
 * @Description: 自定义绘图方法，自定义元素能展示的关键方法！
 * @FilePath: /argo_bpmn/bpmnjs/src/components/customModeler/custom/CustomRenderer.js
 */

import inherits from 'inherits'

import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer'
import {
    isObject,
    assign,
    forEach
} from 'min-dash';
import {
    append as svgAppend,
    create as svgCreate,
    classes as svgClasses
} from 'tiny-svg'

import { customElements, customConfig, hasLabelElements } from '../../utils/util'
/**
 * A renderer that knows how to render custom elements.
 */
export default function CustomRenderer(eventBus, styles, textRenderer) {
    BaseRenderer.call(this, eventBus, 2000)

    var computeStyle = styles.computeStyle

    function renderLabel(parentGfx, label, options) {

        options = assign({
            size: {
                width: 100
            }
        }, options);

        var text = textRenderer.createText(label || '', options);

        svgClasses(text).add('djs-label');

        svgAppend(parentGfx, text);

        return text;
    }

    this.drawCustomElements = function(parentNode, element) {
        // for(let key in element){
        //     console.log('key: '+key+"   "+'value: '+element[key])
        // }
        // console.log("custom"+custom)
        const type = element.type // 获取到类型
        const custom = element.custom
        if (customElements.includes(type)) { // or customConfig[type]
            const { url, attr } = customConfig[type]

            console.log(url);

            const customIcon = svgCreate('image', {
                ...attr,
                href: url
            })
            element['width'] = attr.width // 直接修改元素的宽高
            element['height'] = attr.height
            svgAppend(parentNode, customIcon)
            return customIcon
        } 
        const shape = this.bpmnRenderer.drawShape(parentNode, element)
        return shape
    }
}

inherits(CustomRenderer, BaseRenderer)

CustomRenderer.$inject = ['eventBus', 'styles', 'textRenderer']

CustomRenderer.prototype.canRender = function(element) {
    // ignore labels
    return true
        // return !element.labelTarget;
}

//
// 重载原型的drawShape方法，根据id的前缀进行类型判断，可以让bpmnjs展示我自己创建
// 的元素
//
CustomRenderer.prototype.drawShape = function(p, element) {
    // 通过修改后的id前缀来加载自定义的类型
    var arr = element.id.split('_')
    if (arr[0]=="Docker") {
        element.type="bpmn:docker"
    } else if (arr[0]=="Pythonscript") {
        element.type="bpmn:pythonscript"
    }
    if (customElements.includes(element.type)) {
        return this.drawCustomElements(p, element)
    }
}

CustomRenderer.prototype.getShapePath = function(shape) {
    //console.log(shape)
}
