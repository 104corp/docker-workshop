(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{368:function(t,a,s){"use strict";s.r(a);var n=s(42),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"volume-mapping"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#volume-mapping"}},[t._v("#")]),t._v(" Volume Mapping")]),t._v(" "),s("p",[t._v("練習此題，可以了解：")]),t._v(" "),s("ul",[s("li",[t._v("如何在 container 讀取本機的目錄或檔案")])]),t._v(" "),s("h2",{attrs:{id:"指令練習"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#指令練習"}},[t._v("#")]),t._v(" 指令練習")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 產生一個本機的檔案")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("echo")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"hello world"')]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" ./my-web.html\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 啟動 nginx")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("docker")]),t._v(" container run --rm -it -p "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("8080")]),t._v(":80 -v "),s("span",{pre:!0,attrs:{class:"token variable"}},[s("span",{pre:!0,attrs:{class:"token variable"}},[t._v("`")]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("pwd")]),s("span",{pre:!0,attrs:{class:"token variable"}},[t._v("`")])]),t._v("/my-web.html:/usr/share/nginx/html/my-web.html nginx:alpine\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 查看 http://localhost:8080/my-web.html")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 停止容器再啟動一次")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("docker")]),t._v(" container run --rm -it -p "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("8080")]),t._v(":80 -v "),s("span",{pre:!0,attrs:{class:"token variable"}},[s("span",{pre:!0,attrs:{class:"token variable"}},[t._v("`")]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("pwd")]),s("span",{pre:!0,attrs:{class:"token variable"}},[t._v("`")])]),t._v("/my-web.html:/usr/share/nginx/html/my-web.html nginx:alpine\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 再次查看 http://localhost:8080/my-web.html")]),t._v("\n")])])]),s("p",[t._v("這個練習題目，是解決 "),s("RouterLink",{attrs:{to:"/docs/exercises/exercises-04-run-command.html"}},[t._v("Run Command")]),t._v(" 佈署問題最簡單（同時額外的問題也最多）的方法：直接把 host 上某些檔案掛進 container 即可。同個指令開的 container 除了有一樣環境之外，也能有一樣的檔案。")],1),t._v(" "),s("p",[t._v("這也是本機開發或測試最常使用的佈署方法。")]),t._v(" "),s("h2",{attrs:{id:"指令說明"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#指令說明"}},[t._v("#")]),t._v(" 指令說明")]),t._v(" "),s("h3",{attrs:{id:"docker-container-run"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#docker-container-run"}},[t._v("#")]),t._v(" "),s("code",[t._v("docker container run")])]),t._v(" "),s("ul",[s("li",[s("code",[t._v("-v|--volume")]),t._v(" 掛載 volume 到這個 container 上，格式為 "),s("code",[t._v("[/host]:[/container]:[參數]")])])])])}),[],!1,null,null,null);a.default=e.exports}}]);