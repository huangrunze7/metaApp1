// src/mock/waterfall.js
import Mock from "mockjs";
import qs from "query-string";

// 解析URL查询参数
function parseQuery(url) {
  const queryStr = url.split("?")[1] || "";
  return qs.parse(queryStr);
}

Mock.mock(RegExp("/api/waterfall/list.*"), "get", function (options) {
  // 手动解析查询参数
  const query = parseQuery(options.url);
  const page = Number(query.page) || 1;
  const pageSize = Number(query.pageSize) || 10;

  // 视频资源库（可替换为真实URL）
  const videoSources = [
    "https://cn-gdjm-cm-01-02.bilivideo.com/upgcxcode/56/54/25713315456/25713315456-1-16.mp4?e=ig8euxZM2rNcNbRVhwdVhwdlhWdVhwdVhoNvNC8BqJIzNbfq9rVEuxTEnE8L5F6VnEsSTx0vkX8fqJeYTj_lta53NCM=&uipk=5&nbs=1&deadline=1746982669&gen=playurlv2&os=bcache&oi=1879127506&trid=000015cb2ee523124a868e9bb78ac10de6a1h&mid=0&platform=html5&og=hw&upsig=d71e78389c6e1ffa856fd30a02821560&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&cdnid=88502&bvc=vod&nettype=0&f=h_0_0&bw=65595&logo=80000000",
    "https://cn-gdjm-cm-01-02.bilivideo.com/upgcxcode/56/54/25713315456/25713315456-1-16.mp4?e=ig8euxZM2rNcNbRVhwdVhwdlhWdVhwdVhoNvNC8BqJIzNbfq9rVEuxTEnE8L5F6VnEsSTx0vkX8fqJeYTj_lta53NCM=&uipk=5&nbs=1&deadline=1746982669&gen=playurlv2&os=bcache&oi=1879127506&trid=000015cb2ee523124a868e9bb78ac10de6a1h&mid=0&platform=html5&og=hw&upsig=d71e78389c6e1ffa856fd30a02821560&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&cdnid=88502&bvc=vod&nettype=0&f=h_0_0&bw=65595&logo=80000000",
    "https://cn-gdjm-cm-01-02.bilivideo.com/upgcxcode/56/54/25713315456/25713315456-1-16.mp4?e=ig8euxZM2rNcNbRVhwdVhwdlhWdVhwdVhoNvNC8BqJIzNbfq9rVEuxTEnE8L5F6VnEsSTx0vkX8fqJeYTj_lta53NCM=&uipk=5&nbs=1&deadline=1746982669&gen=playurlv2&os=bcache&oi=1879127506&trid=000015cb2ee523124a868e9bb78ac10de6a1h&mid=0&platform=html5&og=hw&upsig=d71e78389c6e1ffa856fd30a02821560&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&cdnid=88502&bvc=vod&nettype=0&f=h_0_0&bw=65595&logo=80000000",
    "https://cn-gdjm-cm-01-02.bilivideo.com/upgcxcode/56/54/25713315456/25713315456-1-16.mp4?e=ig8euxZM2rNcNbRVhwdVhwdlhWdVhwdVhoNvNC8BqJIzNbfq9rVEuxTEnE8L5F6VnEsSTx0vkX8fqJeYTj_lta53NCM=&uipk=5&nbs=1&deadline=1746982669&gen=playurlv2&os=bcache&oi=1879127506&trid=000015cb2ee523124a868e9bb78ac10de6a1h&mid=0&platform=html5&og=hw&upsig=d71e78389c6e1ffa856fd30a02821560&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&cdnid=88502&bvc=vod&nettype=0&f=h_0_0&bw=65595&logo=80000000",
  ];

  // 图片资源库
  const imageCategories = ["nature", "people", "tech", "animals", "food"];

  return Mock.mock({
    code: 0,
    message: "success",
    [`data|${pageSize}`]: [
      {
        "id|+1": (page - 1) * pageSize + 1,
        // 交替生成图片和视频（第1页：图、图、视频...；第2页：视频、图、图...）
        type: function () {
          return this.id % 3 === 0 ? "video" : "image";
        },
        title: "@ctitle(6, 15)",
        desc: "@cparagraph(1, 2)",
        media: function () {
          if (this.type === "video") {
            return {
              cover: Mock.Random.image(
                "300x200",
                Mock.Random.color(),
                "Video Cover"
              ),
              url: videoSources[this.id % videoSources.length],
              duration: Mock.Random.integer(5, 180), // 视频时长(秒)
            };
          } else {
            return Mock.Random.image(
              "300x200",
              Mock.Random.color(),
              imageCategories[this.id % imageCategories.length]
            );
          }
        },
        avatar: Mock.Random.image("50x50", Mock.Random.color(), "Avatar"),
        name: "@cname",
        "likes|0-1000": 1,
        "comments|0-200": 1,
        "views|100-10000": 1,
        createTime: Mock.Random.datetime("yyyy-MM-dd HH:mm:ss"),
        "tags|1-3": ["@ctitle(2, 4)"],
      },
    ],
    page,
    pageSize,
    total: 100,
  });
});
