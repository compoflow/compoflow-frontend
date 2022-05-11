/*
 * @Author: Lavender
 * @Date: 2021-12-14 20:14:27
 * @LastEditors: Lavender
 * @LastEditTime: 2022-04-01 14:46:48
 * @Description: 属性栏中自定义的Props
 * @FilePath: /bpmn_workflow/src/components/properties-panel-extension/provider/metadata/parts/TitleProps.js
 */

import entryFactory, { label } from 'bpmn-js-properties-panel/lib/factory/EntryFactory';
import participantHelper from 'bpmn-js-properties-panel/lib/helper/ParticipantHelper'

export default function (group, element, translate) {
    var project_name = localStorage.getItem("project")
    // if (element.type=='bpmn:docker') { // 可以在这里做类型判断
    //     group.entries.push(entryFactory.textField(translate,{
    //         id: 'title',
    //         description: '权限的标题',
    //         label: '标题',
    //         modelProperty: 'title'
    //     }));
    // }

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
            description: '权限的标题',
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
        group.entries.push(entryFactory.textBox(translate, {
            id: 'filter-textBox-1',
            label: '脚本源代码',
            modelProperty: 'srcCode',
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
        group.label = '聚合节点'
    }
}
