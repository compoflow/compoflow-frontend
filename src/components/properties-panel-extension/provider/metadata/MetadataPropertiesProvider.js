/*
 * @Author: Lavender
 * @Date: 2021-12-14 20:14:27
 * @LastEditors: Lavender
 * @LastEditTime: 2022-04-01 14:38:16
 * @Description: 右边的属性栏中的metadata部分
 * @FilePath: /bpmn_workflow/src/components/properties-panel-extension/provider/metadata/MetadataPropertiesProvider.js
 */

import inherit from 'inherits'

import PropertiesActivator from 'bpmn-js-properties-panel/lib/PropertiesActivator'

import idProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/IdProps';
import nameProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/NameProps';
import processProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/ProcessProps';
import linkProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/LinkProps';
import eventProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/EventProps';
import documentationProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/DocumentationProps';
import TitleProps from './parts/TitleProps';
import {
    is
} from 'bpmn-js/lib/util/ModelUtil';

function createMetadataTabGroups(element, bpmnFactory, canvas, elementRegistry, translate) {
    var metadataGroup = {
        id: 'metadata',
        label: '填入描述',
        entries: []
    };
    // idProps(metadataGroup, element, translate);
    nameProps(metadataGroup, element, bpmnFactory, canvas, translate);
    // processProps(metadataGroup, element, translate);


    TitleProps(metadataGroup, element, translate)
    return [
        metadataGroup,
    ];
}

export default function MetadataPropertiesProvider(eventBus, bpmnFactory, canvas, elementRegistry, translate) {
    PropertiesActivator.call(this, eventBus);
    this.getTabs = function (element) {
        var metadataTab = {
            id: 'metadata',
            label: '属性',
            groups: createMetadataTabGroups(element, bpmnFactory, canvas, elementRegistry, translate)
        };

        // var authorityTab = {
        //     id: 'authority',
        //     label: '权限',
        //     groups: createAuthorityTabGroups(element)
        // };
        return [
            // generalTab,
            // authorityTab
            metadataTab
        ];
    }
}

MetadataPropertiesProvider.$inject = ['eventBus', 'bpmnFactory', 'canvas', 'elementRegistry', 'translate']

inherit(MetadataPropertiesProvider, PropertiesActivator);