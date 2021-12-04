const sidebar = require('./sidebar')
module.exports = {
  title: "威博客",
  description: "分享一点自己的前端知识",
  dest: "public",
  base: "/lewin.github.io/",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/favicon.ico",
      },
    ],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ],
  ],
  plugins: [
    "@vuepress-reco/vuepress-plugin-comments",
    "vuepress-plugin-meting",
  ],
  theme: "reco",
  themeConfig: {
    mode: "light",
    subSidebar: "auto",
    valineConfig: {
      appId: "2EGVFVXUjPQj9iL6GbNeKEws-gzGzoHsz",
      appKey: "u5SYjog04FbcyVWJxiarcjpN",
    },
    codeTheme: 'okaidia',
    nav: [
      {
        text: "主页",
        link: "/",
        icon: "reco-home",
      },
      {
        text: "时间线",
        link: "/timeline/",
        icon: "reco-date",
      },
      {
        text: "联系方式",
        icon: "reco-message",
        items: [
          {
            text: "Gitee",
            link: "https://gitee.com/torresloo",
            icon: "reco-github",
          },
        ],
      },
    ],
    sidebar,
    type: "blog",
    blogConfig: {
      category: {
        location: 2,
        text: "目录",
      },
      tag: {
        location: 3,
        text: "标签",
      },
    },
    logo: "/logo.png",
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: "Last Updated",
    author: "Lewin",
    authorAvatar: "/avatar.jpeg",
    record: "xxxx",
    startYear: "2021",
  },
  markdown: {
    lineNumbers: true,
  },
};
