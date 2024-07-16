import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import * as THREE from "three";
import gsap from "gsap";

const manager = new THREE.LoadingManager();

/**
 * 专门加载模型文件=>模型对象
 * @param {*} pathList 模型文件路径数组
 * @param {*} suc 接收成功结果回调函数
 */
export function loadManager(pathList, suc) {
  // 定义加载器对象
  const gltfLoader = new GLTFLoader(manager);
  const fbxLoader = new FBXLoader(manager);
  var dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("draco/");
  dracoLoader.setDecoderConfig({ type: "js" });
  gltfLoader.setDRACOLoader(dracoLoader);

  // 保存加载成功模型对象数组
  const model = [];

  let preValue = 0; // 上一次进度值
  // 加载器对象关联属性和回调函数
  manager.onProgress = (url, loadedNum, totalNum) => {
    // url: 当前被加载完成的模型路径
    // loadedNum: 当前加载完成的个数
    // totalNum: 总共要加载的个数z
    // * 100 目的：为了让 0.5 进度变成 50 后续添加 % 后缀
    // 当前已经加载的进度数字1
    let progressRatio = Math.floor((loadedNum / totalNum) * 100);

    gsap.fromTo(
      "#processing-number",
      {
        innerText: preValue, // 暂时先传入一个数字（后面再去加 % 字符串）
      },
      {
        innerText: progressRatio,
        onUpdate() {
          // 详细控制显示的内容
          // 取出当前正在做动画的目标对象的属性值（进度数字）
          const num = gsap.getProperty(this.targets()[0], "innerText");
          this.targets()[0].innerText = num + "%";
          preValue = progressRatio; // 把当前最新的加载进度值，赋予到外面变量上

          if (num === 100) {
            // loader 加载器工作完毕
            suc(model);
            document.querySelector(".loading").style.display = "none";
          }
        },
      }
    );

    // 对进度条再来做一个动画
    // scaleX 范围是 0 - 1 做横向的缩放
    gsap.fromTo(
      "#loading-bar",
      {
        scaleX: preValue / 100,
      },
      {
        scaleX: progressRatio / 100,
      }
    );
  };

  pathList.forEach((path) => {
    if (path.indexOf("fbx") > -1) {
      gltfLoader.load(path, (obj) => {
        // 数据结构
        model.push({
          model: obj,
          url: path,
        });
        model.length === pathList.length && suc(model);
      });
    } else if (path.indexOf("gltf") > -1) {
      gltfLoader.load(path, (gltf) => {
        model.push({
          model: gltf.scene,
          url: path,
        });
        model.length === pathList.length && suc(model);
      });
    }
  });
}
