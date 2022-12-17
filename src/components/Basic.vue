<!--
 * @Author: Lavender
 * @Date: 2021-12-14 20:14:27
 * @LastEditors: Lavender
 * @LastEditTime: 2022-04-01 14:34:53
 * @Description: bpmnjs工作流的前端组件
 * @FilePath: /bpmn_workflow/src/components/Basic.vue
-->

<template>
  <div class="containers">
    <div class="loading" v-if="loading">Loading...</div>
    <template v-else>
      <div class="canvas" ref="canvas"></div>
      <div id="js-properties-panel" class="panel"></div>
      <div>
        <el-button class="buttons" type="success" @click="newDiagram" round>新建</el-button>
        <el-upload ref="upload" action :http-request="openDiagram" style="display: inline-block; margin-left: 10px; margin-right: 10px;">
          <el-button class="buttons" type="success" round>上传</el-button>
        </el-upload>
        <el-button class="buttons" type="success" @click="saveDiagramBpmn" round>下载</el-button>
        <el-button class="buttons" type="success" @click="postXML" round>部署</el-button>
        <a hidden ref="downloadLink"></a>

      </div>
    </template>
  </div>
</template>

<script>
// 引入相关的依赖
import CustomModeler from "./customModeler";
import propertiesPanelModule from "bpmn-js-properties-panel";
import propertiesProviderModule from "./properties-panel-extension/provider/metadata";
import medatadaModdleDescriptor from "./properties-panel-extension/descriptors/metadata";
import { xmlStr } from "../mock/xmlStr";
import { defaultTemplateXml } from "../mock/defaultXmlStr"
import axios from "axios";
import customModule from "./customModeler/custom";
export default {
  name: "",
  props: ["project"],
  components: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 载入后, Vue 实例挂载到实际的 DOM 操作完成，一般在该过程进行 Ajax 交互
  mounted() {
    this.init();
  },
  data() {
    return {
      // loading
      loading: false,
      // bpmn建模器
      bpmnModeler: null,
      container: null,
      canvas: null,
    };
  },
  // 方法集合
  methods: {
    async init() {
      // 输出name
      console.log(this.project);
      // 设置localStorage
      localStorage.setItem("project", this.project);
      // 获取到属性ref为“canvas”的dom节点
      const canvas = this.$refs.canvas;
      // 建模
      this.bpmnModeler = new CustomModeler({
        container: canvas,
        propertiesPanel: {
          parent: "#js-properties-panel",
        },
        additionalModules: [
          customModule,
          // 右边属性栏的框
          propertiesPanelModule,
          // 右边属性栏的内容
          propertiesProviderModule,
        ],
        moddleExtensions: {
          //如果要在属性面板中维护camunda：XXX属性，则需要此
          // camunda: camundaModdleDescriptor
          metadata: medatadaModdleDescriptor,
        },
      });
      this.loadDefaultDiagram();
    },
    loadDefaultDiagram() {
      this.createNewDiagram(xmlStr);
    },
    async createNewDiagram(createXmlStr) {
      // 将字符串转换成图显示出来
      try {
        const result = await this.bpmnModeler.importXML(createXmlStr);
        const { warnings } = result;
        console.log(warnings);
        this.success();
      } catch (err) {
        console.log(err.message, err.warnings);
      }
    },
    success() {
      console.log("创建成功!");
      this.addModelerListener();
    },
    addModelerListener() {
      // 监听 modeler
      const bpmnjs = this.bpmnModeler;
      const that = this;
      // 'shape.removed'
      const events = [
        "shape.added",
        "shape.move.end",
        "connect.end",
        "connection.create",
        "connection.move",
      ];
      events.forEach(function (event) {
        that.bpmnModeler.on(event, (e) => {
          var elementRegistry = bpmnjs.get("elementRegistry");
          var shape = e.element ? elementRegistry.get(e.element.id) : e.shape;
        });
      });
    },
    newDiagram() {
      this.createNewDiagram(defaultTemplateXml);
    },
    openDiagram(item) {
      const reader = new FileReader();
      reader.readAsText(item.file, "utf-8");
      reader.onload = () => {
        this.createNewDiagram(reader.result);
        this.$refs.upload.clearFiles();
      };
      this.$refs.upload.clearFiles();
      return false;
    },
    async saveDiagramBpmn() {
      try {
        const result = await this.bpmnModeler.saveXML({ format: true });
        const { xml } = result;
        this.downloadDiagram({data:xml});
      } catch (err) {
        console.log(err);
      }
    },
    // 将xml文件post给后端
    async postXML() {
      try {
        const result = await this.bpmnModeler.saveXML({ format: true });
        const { xml } = result;
        console.log(xml);
        axios
          .post("http://localhost:30086/", { xml: xml })
          .then((response) => {
            if (response.data == "failed") {
              alert("部署失败");
            } else {
              alert("部署成功");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    },
    downloadDiagram({name = "diagram.bpmn", data}) {
      try {
        if (data) {
          const downloadLink = this.$refs.downloadLink;
          const encodedData = encodeURIComponent(data);
          downloadLink.href = "data:application/bpmn20-xml;charset=UTF-8," + encodedData;
          downloadLink.download = name;
          downloadLink.click();
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
  // 计算属性
  computed: {},
};
</script>

<style lang="less" scoped>
.containers {
  background-color: #ffffff;
  width: 100%;
  height: calc(100vh - 52px);
}
.canvas {
  width: 100%;
  height: 100%;
}
.panel {
  position: absolute;
  right: 0;
  top: 0;
  width: 300px;
}
</style>
