/*
 * @Author: Lavender
 * @Date: 2021-12-14 20:14:27
 * @LastEditors: Lavender
 * @LastEditTime: 2022-04-01 14:46:48
 * @Description: 属性栏中自定义的Props
 * @FilePath: /bpmn_workflow/src/components/properties-panel-extension/provider/metadata/parts/TitleProps.js
 */

import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';
import en from "element-ui/src/locale/lang/en";
import {is} from "bpmn-js/lib/util/ModelUtil";

export default function (group, element, translate) {
    var project_name = localStorage.getItem("project")

    /**
     * starter
     */
    if (element.type === 'bpmn:starter') {
        group.label = '启动节点'
        var workflowTypes = [
            { "name": "单次执行", "value": "once" },
            { "name": "定时执行", "value": "cron" },
        ]
        var timeUnits = [
            { "name": "分", "value": "m" },
            { "name": "时", "value": "h" },
            { "name": "天", "value": "d" },
        ]
        var strategies = [
            { "name": "允许", "value": "allow" },
            { "name": "替换", "value": "replace" },
            { "name": "不允许", "value": "forbid" },
        ]
        group.entries.push(entryFactory.selectBox(translate, {
            id: 'starter-selectBox-1',
            label: '工作流类型',
            selectOptions: workflowTypes,
            modelProperty: 'workflowType'
        }))
        group.entries.push(entryFactory.label({
            id: 'starter-label-1',
            divider: true
        }))
        group.entries.push(entryFactory.textBox(translate, {
            id: 'starter-textBox-1',
            label: '时间间隔',
            modelProperty: 'interval'
        }))
        group.entries.push(entryFactory.selectBox(translate, {
            id: 'starter-selectBox-2',
            label: '单位',
            selectOptions: timeUnits,
            modelProperty: 'timeUnit',
        }))
        group.entries.push(entryFactory.textBox(translate, {
            id: 'starter-textBox-2',
            label: 'cron表达式(* * * * *)',
            description: '自定义cron表达式，如果填写则以此为准',
            modelProperty: 'cronExpression'
        }))
        // group.entries.push(entryFactory.collapsible({
        //     id: '123',
        //     title: 'title',
        //     description: 'description',
        //     onToggle: function (value, entryNode) {
        //         console.log(value)
        //         console.log(entryNode)
        //         entryNode.innerText="3123123123312"
        //     },
        //     onRemove: function (value, entryNode) {
        //         value = false
        //         entryNode.innerText=""
        //     }
        // }))
        group.entries.push(entryFactory.selectBox(translate, {
            id: 'starter-selectBox-3',
            label: '并发执行策略',
            selectOptions: strategies,
            modelProperty: 'strategy',
            description: '定时触发多条工作流并发执行时的策略.允许表示允许并发;替换表示终止未完成的工作流并执行新工作流;不允许表示不允许并发'
        }))
    }

    /**
     * docker
     */
    if (element.type === 'bpmn:docker') {
        group.label = '微服务调用节点'
        var options = []
        const req = new XMLHttpRequest();
        req.open("GET", 'http://106.14.40.180:31003/api/servicePackage/image/listRemote/' + project_name, false)
        req.send()
        var response = req.responseText
        response = eval("(" + response + ")")
        console.log(response)
        var imageList = response.data.artifacts
        for (var i = 0; i < imageList.length; i++) {
            if (imageList[i].tags != null) {
                var dict = {}
                dict["name"] = imageList[i].repoName + ":" + imageList[i].tags[0].name
                dict["value"] = imageList[i].repoName + ":" + imageList[i].tags[0].name
                options.push(dict)
            }
        }
        group.entries.push(entryFactory.selectBox(translate, {
            id: 'image',
            description: '服务镜像',
            label: '镜像',
            selectOptions: options,
            modelProperty: 'image'
        }))
        group.entries.push(entryFactory.textBox(translate, {
            id: 'port',
            description: '服务的端口（默认80）',
            label: '端口',
            modelProperty: 'port'
        }))
        group.entries.push(entryFactory.textBox(translate, {
            id: 'target',
            description: '服务的路径（默认"/"）',
            label: '路径',
            modelProperty: 'target'
        }))
        group.entries.push(entryFactory.textBox(translate, {
            id: 'command',
            description: '镜像启动命令（默认为空）',
            label: '镜像启动命令',
            modelProperty: 'command'
        }))
        group.entries.push(entryFactory.textBox(translate, {
            id: 'args',
            description: '镜像启动参数（默认无参数）',
            label: '镜像启动参数',
            modelProperty: 'args'
        }))
    }

    /**
     * pythonscript
     */
    if (element.type === 'bpmn:pythonscript') {
        group.label = 'python脚本节点'
        var versions = [
            { "name": "2.7", "value": "2.7" },
            { "name": "3.6", "value": "3.6" },
            { "name": "3.8", "value": "3.8" },
        ]
        group.entries.push(entryFactory.selectBox(translate, {
            id: 'pythonscript-selectBox-1',
            label: 'python版本',
            selectOptions: versions,
            modelProperty: 'version'
        }))
        group.entries.push(entryFactory.textBox(translate, {
            id: 'pythonscript-textBox-1',
            label: '脚本源代码',
            modelProperty: 'script',
            description: '输入json对象请从\'input\'变量获取，输出json对象请赋值给\'result\'变量'
        }))
    }

    /**
     * filter
     */
    if (element.type === 'bpmn:filter') {
        group.label = '过滤节点'
        var conditions = [
            { "name": "大于", "value": ">" },
            { "name": "大于等于", "value": ">=" },
            { "name": "等于", "value": "==" },
            { "name": "不等于", "value": "!=" },
            { "name": "小于等于", "value": "<=" },
            { "name": "小于", "value": "<" },
        ]

        group.entries.push(entryFactory.textField(translate, {
            id: 'filter-textField-1',
            label: '左值',
            modelProperty: 'leftValue',
            description: '请使用{{}}获取json属性值，例如{{msg.payload}}',
        }))
        group.entries.push(entryFactory.selectBox(translate, {
            id: 'filter-selectBox-1',
            label: '条件',
            selectOptions: conditions,
            modelProperty: 'condition'
        }))
        group.entries.push(entryFactory.textField(translate, {
            id: 'filter-textField-2',
            label: '右值',
            modelProperty: 'rightValue',
            description: '请使用{{}}获取json属性值，例如{{msg.payload}}',
        }))
        group.entries.push(entryFactory.textField(translate, {
            id: 'filter-textField-3',
            label: 'JSONata表达式',
            modelProperty: 'expression',
            description: '自定义JSONata表达式，如果填写则用它进行判断',
        }))
    }

    /**
     * split
     */
    if (element.type === 'bpmn:split') {
        group.label = '分支节点'
    }

    /**
     * join
     */
    if (element.type === 'bpmn:join') {
        group.label = '同步节点'
        group.entries.push(entryFactory.textField(translate, {
            id: 'join-textField-1',
            label: '最长等待时间(ms)',
            modelProperty: 'waitMillis',
            description: '请输入大于0的整数（默认为无限长）',
        }))
    }
}
