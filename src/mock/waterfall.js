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
  const type = Number(query.type) || 1;
  // 视频资源库（可替换为真实URL）
  const videoSources = [
    "https://upos-hz-mirrorakam.akamaized.net/upgcxcode/30/60/29905126030/29905126030-1-16.mp4?e=ig8euxZM2rNcNbRVhwdVhwdlhWdVhwdVhoNvNC8BqJIzNbfq9rVEuxTEnE8L5F6VnEsSTx0vkX8fqJeYTj_lta53NCM=&uipk=5&nbs=1&deadline=1747014370&gen=playurlv2&os=akam&oi=1760166133&trid=b03bd4f2df7e4e4ebc4825a35c1d4463h&mid=0&platform=html5&og=hw&upsig=88b4b50bd9a4b5496966948bb851df3f&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&hdnts=exp=1747014370~hmac=171933529c1db703934e90202db6c046d5803ce5f99dad9920480e384fc038c8&bvc=vod&nettype=0&f=h_0_0&bw=63332&logo=80000000",
    "https://upos-hz-mirrorakam.akamaized.net/upgcxcode/30/60/29905126030/29905126030-1-16.mp4?e=ig8euxZM2rNcNbRVhwdVhwdlhWdVhwdVhoNvNC8BqJIzNbfq9rVEuxTEnE8L5F6VnEsSTx0vkX8fqJeYTj_lta53NCM=&uipk=5&nbs=1&deadline=1747014370&gen=playurlv2&os=akam&oi=1760166133&trid=b03bd4f2df7e4e4ebc4825a35c1d4463h&mid=0&platform=html5&og=hw&upsig=88b4b50bd9a4b5496966948bb851df3f&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&hdnts=exp=1747014370~hmac=171933529c1db703934e90202db6c046d5803ce5f99dad9920480e384fc038c8&bvc=vod&nettype=0&f=h_0_0&bw=63332&logo=80000000",
    "https://upos-hz-mirrorakam.akamaized.net/upgcxcode/30/60/29905126030/29905126030-1-16.mp4?e=ig8euxZM2rNcNbRVhwdVhwdlhWdVhwdVhoNvNC8BqJIzNbfq9rVEuxTEnE8L5F6VnEsSTx0vkX8fqJeYTj_lta53NCM=&uipk=5&nbs=1&deadline=1747014370&gen=playurlv2&os=akam&oi=1760166133&trid=b03bd4f2df7e4e4ebc4825a35c1d4463h&mid=0&platform=html5&og=hw&upsig=88b4b50bd9a4b5496966948bb851df3f&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&hdnts=exp=1747014370~hmac=171933529c1db703934e90202db6c046d5803ce5f99dad9920480e384fc038c8&bvc=vod&nettype=0&f=h_0_0&bw=63332&logo=80000000",
    "https://upos-hz-mirrorakam.akamaized.net/upgcxcode/30/60/29905126030/29905126030-1-16.mp4?e=ig8euxZM2rNcNbRVhwdVhwdlhWdVhwdVhoNvNC8BqJIzNbfq9rVEuxTEnE8L5F6VnEsSTx0vkX8fqJeYTj_lta53NCM=&uipk=5&nbs=1&deadline=1747014370&gen=playurlv2&os=akam&oi=1760166133&trid=b03bd4f2df7e4e4ebc4825a35c1d4463h&mid=0&platform=html5&og=hw&upsig=88b4b50bd9a4b5496966948bb851df3f&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&hdnts=exp=1747014370~hmac=171933529c1db703934e90202db6c046d5803ce5f99dad9920480e384fc038c8&bvc=vod&nettype=0&f=h_0_0&bw=63332&logo=80000000",
  ];
  const videoSources1 = [
    "https://upos-hz-mirrorakam.akamaized.net/upgcxcode/35/53/28494335335/28494335335-1-16.mp4?e=ig8euxZM2rNcNbRVhwdVhwdlhWdVhwdVhoNvNC8BqJIzNbfq9rVEuxTEnE8L5F6VnEsSTx0vkX8fqJeYTj_lta53NCM=&uipk=5&nbs=1&deadline=1747015143&gen=playurlv2&os=akam&oi=1760166133&trid=4eabb47d400640a7a49ed392c7dd7290h&mid=0&platform=html5&og=cos&upsig=f5c9f6ac0eac3c37ae772d31d4c56077&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&hdnts=exp=1747015143~hmac=debc453b9fa42364a7e46388856ed0c6c393eec0a87dd16a172d44e328333333&bvc=vod&nettype=0&f=h_0_0&bw=38308&logo=80000000",
    "https://upos-hz-mirrorakam.akamaized.net/upgcxcode/35/53/28494335335/28494335335-1-16.mp4?e=ig8euxZM2rNcNbRVhwdVhwdlhWdVhwdVhoNvNC8BqJIzNbfq9rVEuxTEnE8L5F6VnEsSTx0vkX8fqJeYTj_lta53NCM=&uipk=5&nbs=1&deadline=1747015143&gen=playurlv2&os=akam&oi=1760166133&trid=4eabb47d400640a7a49ed392c7dd7290h&mid=0&platform=html5&og=cos&upsig=f5c9f6ac0eac3c37ae772d31d4c56077&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&hdnts=exp=1747015143~hmac=debc453b9fa42364a7e46388856ed0c6c393eec0a87dd16a172d44e328333333&bvc=vod&nettype=0&f=h_0_0&bw=38308&logo=80000000",
    "https://upos-hz-mirrorakam.akamaized.net/upgcxcode/35/53/28494335335/28494335335-1-16.mp4?e=ig8euxZM2rNcNbRVhwdVhwdlhWdVhwdVhoNvNC8BqJIzNbfq9rVEuxTEnE8L5F6VnEsSTx0vkX8fqJeYTj_lta53NCM=&uipk=5&nbs=1&deadline=1747015143&gen=playurlv2&os=akam&oi=1760166133&trid=4eabb47d400640a7a49ed392c7dd7290h&mid=0&platform=html5&og=cos&upsig=f5c9f6ac0eac3c37ae772d31d4c56077&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&hdnts=exp=1747015143~hmac=debc453b9fa42364a7e46388856ed0c6c393eec0a87dd16a172d44e328333333&bvc=vod&nettype=0&f=h_0_0&bw=38308&logo=80000000",
    "https://upos-hz-mirrorakam.akamaized.net/upgcxcode/35/53/28494335335/28494335335-1-16.mp4?e=ig8euxZM2rNcNbRVhwdVhwdlhWdVhwdVhoNvNC8BqJIzNbfq9rVEuxTEnE8L5F6VnEsSTx0vkX8fqJeYTj_lta53NCM=&uipk=5&nbs=1&deadline=1747015143&gen=playurlv2&os=akam&oi=1760166133&trid=4eabb47d400640a7a49ed392c7dd7290h&mid=0&platform=html5&og=cos&upsig=f5c9f6ac0eac3c37ae772d31d4c56077&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&hdnts=exp=1747015143~hmac=debc453b9fa42364a7e46388856ed0c6c393eec0a87dd16a172d44e328333333&bvc=vod&nettype=0&f=h_0_0&bw=38308&logo=80000000",
  ];
  const imgSources = [
    "https://img1.baidu.com/it/u=3573657214,1329192546&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500",
    "https://img2.baidu.com/it/u=1574821713,3001062660&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
    "https://img0.baidu.com/it/u=2957218001,1135064860&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500",
    "https://img2.baidu.com/it/u=1017585846,596196740&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=500",
  ];
  const imgSources1 = [
    "https://img1.baidu.com/it/u=132361974,4193066749&fm=253&fmt=auto&app=120&f=JPEG?w=750&h=500",
    "https://img0.baidu.com/it/u=3427417399,2857940028&fm=253&fmt=auto&app=120&f=JPEG?w=1266&h=800",
    "https://img0.baidu.com/it/u=2610008207,1087569662&fm=253&fmt=auto&app=120&f=JPEG?w=1200&h=800",
    "https://img1.baidu.com/it/u=1964916270,1783148707&fm=253&fmt=auto&app=120&f=JPEG?w=1200&h=800",
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
              // cover: Mock.Random.image(
              //   "300x200",
              //   Mock.Random.color(),
              //   "Video Cover"
              // ),
              cover:
                type == 1
                  ? imgSources[this.id % imgSources.length]
                  : imgSources1[this.id % imgSources1.length],
              url:
                type == 1
                  ? videoSources[this.id % videoSources.length]
                  : videoSources1[this.id % videoSources1.length],
              duration: Mock.Random.integer(5, 180), // 视频时长(秒)
            };
          } else {
            // return Mock.Random.image(
            //   "300x200",
            //   Mock.Random.color(),
            //   imageCategories[this.id % imageCategories.length]
            // );
            return type == 1
              ? imgSources[this.id % imgSources.length]
              : imgSources1[this.id % imgSources1.length];
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
