import { EventBus } from "@/utils/EventBus";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:4523/m1/3995728-0-default";

export class DataManager {
  static getInstance() {
    if (!this.instance) {
      this.instance = new DataManager();
    }
    return this.instance;
  }
  // 获取数据
  getData() {
    return new Promise((resolve, reject) => {
      const json = {
        base: {
          buildingTotal: 9.539289158188069,
          chargePoleTotal: 94,
          enterpriseTotal: 49,
          parkingTotal: 98,
        },
        parkIncome: {
          yIncome: [
            9840.46925015311, 5137.248449837848, 7565.634247179237,
            5612.090632215053, 6678.2224783113925, 9080.630569136689,
            7415.327101869527, 6544.048958224986, 7232.160985394875,
            7606.114200494125, 8040.946045221934, 8562.84601507447,
          ],
        },
        parkIndustry: [
          {
            name: "医疗健康",
            value: 16,
          },
          {
            name: "互联网",
            value: 20,
          },
          {
            name: "金融",
            value: 20,
          },
          {
            name: "素质教育",
            value: 30,
          },
        ],
        fireBuilding: {
          name: "01-shanghaizhongxindasha",
          fireFloor: 1,
          evacueesNumbers: 68,
        },
        buildingsIntroduce: {
          "01-shanghaizhongxindasha": {
            name: "上海中心大厦",
            parkingRemain: "88",
            squareMeters: "200",
            officesRemain: "200",
            accommodate: "500",
            cameraPosition: {
              x: "-27.60404773326758",
              y: "77.6723594934777",
              z: "190.86129619259177",
            },
          },
          "02-huanqiujinrongzhongxin": {
            name: "环球金融中心",
            parkingRemain: "88",
            squareMeters: "300",
            officesRemain: "300",
            accommodate: "500",
            cameraPosition: {
              x: "131.9624984817232",
              y: "39.710278910183",
              z: "124.55245213099015",
            },
          },
          "03-jinmaodasha": {
            name: "金茂大厦",
            parkingRemain: "88",
            squareMeters: "400",
            officesRemain: "400",
            accommodate: "500",
            cameraPosition: {
              x: "-64.34296046056993",
              y: "77.33072005913716",
              z: "-6.082941978909162",
            },
          },
          "04-dongfangmingzhu": {
            name: "东方明珠",
            parkingRemain: "88",
            squareMeters: "500",
            officesRemain: "500",
            accommodate: "500",
            cameraPosition: {
              x: "-98",
              y: "46",
              z: "-87",
            },
          },
        },
      };
      resolve(json);
      // axios.get("/city").then((response) => {
      //   resolve(response.data);
      // });
    });
  }
  // 模拟轮询请求服务器
  refreshData() {
    // 15 秒刷新一次数据
    setInterval(async () => {
      let data = await this.getData();
      console.log(data, "data");
      data.base.buildingTotal += 20;
      EventBus.getInstance().emit("refreshHomeCount", data);
    }, 5000);
  }
}
