/*
 * @Author: Lavender
 * @Date: 2021-12-14 20:14:27
 * @LastEditors: Lavender
 * @LastEditTime: 2022-04-01 14:46:48
 * @Description: 属性栏中自定义的Props
 * @FilePath: /bpmn_workflow/src/components/properties-panel-extension/provider/metadata/parts/TitleProps.js
 */

import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

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
    if (element.type == 'bpmn:docker') {
        /* 
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
        */
        group.entries.push(entryFactory.textField(translate, {
            id: 'image',
            description: '镜像名称',
            label: '镜像',
            modelProperty: 'image'
        }))

        group.entries.push(entryFactory.textBox(translate, {
            id: 'port',
            description: '端口',
            label: '端口',
            modelProperty: 'port'
        }))

        group.entries.push(entryFactory.textBox(translate, {
            id: 'target',
            description: '服务的路径（默认"/"）',
            label: '路径',
            modelProperty: 'target'
        }))
    }
}

//
// 从后端获得docker列表
//
