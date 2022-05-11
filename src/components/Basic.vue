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
      <el-container direction="horizontal">
        <el-footer>
          <el-button class="buttons" type="success" @click="postXML" round>部署</el-button>
        </el-footer>
        <el-footer>
          <el-button class="buttons" type="success" @click="uploadXML" round>保存到云端</el-button>
        </el-footer>
        <el-footer>
          <el-button class="buttons" type="success" @click="downloadXML" round>保存到本地</el-button>
        </el-footer>
        <el-footer>
          <el-upload
              class="upload-demo"
              action=""
              :show-file-list=false
              accept="xml"
              :on-change="loadLocalXML"
              :file-list="fileList"
              :http-request="noOps">
            <el-button class="buttons" type="primary">从本地加载</el-button>
            <div slot="tip" class="el-upload__tip">上传BPMN XML文件</div>
          </el-upload>
        </el-footer>
      </el-container>
<!--      <el-button class="buttons" type="success" @click="loadLocalXML" round>从本地加载</el-button>-->
    </template>
  </div>
</template>

<script>
// 引入相关的依赖
import CustomModeler from "./customModeler";
import propertiesPanelModule from "bpmn-js-properties-panel";
import camundaModdleDescriptor from "camunda-bpmn-moddle/resources/camunda";
import propertiesProviderModule from "./properties-panel-extension/provider/metadata";
import medatadaModdleDescriptor from "./properties-panel-extension/descriptors/metadata";
import { xmlStr } from "../mock/xmlStr";
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
      fileList: [],
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
      this.createNewDiagram();
    },
    async createNewDiagram() {
      // 将字符串转换成图显示出来
      try {
        const result = await this.bpmnModeler.importXML(xmlStr);
        const { warnings } = result;
        console.log(warnings);
        this.success();
      } catch (err) {
        console.log(err.message, err.warnings);
      }
      // this.bpmnModeler.importXML(xmlStr, (err) => {
      //     if (err) {
      //         console.error(err)
      //     }
      //     else {
      //         // 这里是成功之后的回调, 可以在这里做一系列事情
      //         this.success()
      //     }
      // })
    },
    success() {
      console.log("创建成功!");
      this.addBpmnListener();
      this.addModelerListener();
    },
    addBpmnListener() {
      // 获取a标签dom节点
      const that = this;
      const downloadLink = this.$refs.saveDiagram;
      const downloadSvgLink = this.$refs.saveSvg;
      // 给图绑定事件，当图有发生改变就会触发这个事件
      this.bpmnModeler.on("commandStack.changed", function () {
        that.saveSVG(downloadSvgLink);
        that.saveDiagram(downloadLink);
        // that.saveSVG(function(err, svg) {
        //     that.setEncoded(downloadSvgLink, 'diagram.svg', err ? null : svg)
        // })
        // that.saveDiagram(function(err, xml) {
        //     that.setEncoded(downloadLink, 'diagram.bpmn', err ? null : xml)
        // })
      });
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
    // 将xml文件post给后端
    async postXML() {
      try {
        const result = await this.bpmnModeler.saveXML({ format: true });
        const { xml } = result;
        console.log(xml);
        axios
          .post("http://localhost:30086/deploy", { xml: xml })
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
    async saveSVG(downloadSvgLink) {
      try {
        const result = await this.bpmnModeler.saveSVG();
        const { svg } = result;
        //console.log(svg);
        this.setEncoded(downloadSvgLink, "diagram.svg", svg);
      } catch (err) {
        console.log(err);
        this.setEncoded(downloadSvgLink, "diagram.svg", null);
      }
      // this.bpmnModeler.saveSVG(done)
    },
    // 下载为bpmn格式,done是个函数，调用的时候传入的
    async saveDiagram(downloadLink) {
      // 把传入的done再传给bpmn原型的saveXML函数调用
      try {
        const result = await this.bpmnModeler.saveXML({ format: true });
        const { xml } = result;
        // console.log(xml);
        this.setEncoded(downloadLink, "diagram.bpmn", xml);
      } catch (err) {
        console.log(err);
        this.setEncoded(downloadLink, "diagram.bpmn", null);
      }
      // this.bpmnModeler.saveXML({ format: true }, function(err, xml) {
      //     done(err, xml)
      // })
    },
    // 当图发生改变的时候会调用这个函数，这个data就是图的xml
    setEncoded(link, name, data) {
      // // 把xml转换为URI，下载要用到的
      // const encodedData = encodeURIComponent(data);
      // // 下载图的具体操作,改变a的属性，className令a标签可点击，href令能下载，download是下载的文件的名字
      // console.log(link, name, data);
      // let xmlFile = new File([data], "test.bpmn");
      // console.log(xmlFile);
      // console.log(data);
      // if (data) {
      //   link.className = "active";
      //   link.href = "data:application/bpmn20-xml;charset=UTF-8," + encodedData;
      //   link.download = name;
      // }
    },

    // 保存xml到minio
    uploadXML() {

    },

    // 保存xml到本地
    async downloadXML() {
      try {
        const result = await this.bpmnModeler.saveXML({ format: true });
        let { xml } = result;
        // 必须对这两个符号进行转义，否则会保存失败
        xml = xml.replaceAll("&#", "%26%23")

        var obj=document.getElementById('js-properties-panel');
        // IE浏览器
        if(!!window.ActiveXObject || "ActiveXObject" in window) {
          var winname = window.open('', '_blank', 'top=10000');
          winname.document.open('text/xml', 'replace');
          winname.document.writeln(xml);
          winname.document.execCommand('saveas','','bpmn.xml');
          winname.close();
        } else {
          // chrome、火狐等现代浏览器
          var a = document.createElement('a');
          var filename = "bpmn.xml"
          a.setAttribute('href', 'data:text/xml,' + xml);
          a.setAttribute('download', filename);
          a.setAttribute('target', '_blank');
          a.style.display="none";
          obj.parentNode.appendChild(a);
          a.click();
        }
      } catch (err) {
        console.log(err);
      }
    },

    // 从本地加载xml
    loadLocalXML(file, fileList) {
      file.raw.text().then(async res => {
        console.log(res)
        try {
          const result = await this.bpmnModeler.importXML(res);
          const {warnings} = result;
          console.log(warnings);
          this.success();
        } catch (err) {
          console.log(err.message, err.warnings);
          alert("xml文件格式错误，请检查后再上传！")
        }
      })
    },

    noOps() {}
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
