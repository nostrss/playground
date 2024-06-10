"use strict";(self.webpackChunknext_blog=self.webpackChunknext_blog||[]).push([[482],{"./src/stories/MarkDownViewer.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>MarkDownViewer_stories});var defineProperty=__webpack_require__("../../node_modules/.pnpm/@babel+runtime@7.24.7/node_modules/@babel/runtime/helpers/esm/defineProperty.js"),esm_extends=__webpack_require__("../../node_modules/.pnpm/@babel+runtime@7.24.7/node_modules/@babel/runtime/helpers/esm/extends.js"),objectWithoutProperties=__webpack_require__("../../node_modules/.pnpm/@babel+runtime@7.24.7/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),react=__webpack_require__("../../node_modules/.pnpm/next@13.4.19_@babel+core@7.24.7_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/compiled/react/index.js"),react_markdown=__webpack_require__("../../node_modules/.pnpm/react-markdown@8.0.7_@types+react@18.2.21_react@18.2.0/node_modules/react-markdown/lib/react-markdown.js"),remark_gfm=__webpack_require__("../../node_modules/.pnpm/remark-gfm@3.0.1/node_modules/remark-gfm/index.js"),prism=__webpack_require__("../../node_modules/.pnpm/react-syntax-highlighter@15.5.0_react@18.2.0/node_modules/react-syntax-highlighter/dist/esm/prism.js"),material_dark=__webpack_require__("../../node_modules/.pnpm/react-syntax-highlighter@15.5.0_react@18.2.0/node_modules/react-syntax-highlighter/dist/esm/styles/prism/material-dark.js"),next_image=__webpack_require__("../../node_modules/.pnpm/@storybook+nextjs@7.6.19_@swc+core@1.5.25_esbuild@0.18.20_next@13.4.19_react-dom@18.2.0_react_onorqiy56ge7ad3aaora73pmue/node_modules/@storybook/nextjs/dist/images/next-image.mjs"),rehype_raw=__webpack_require__("../../node_modules/.pnpm/rehype-raw@6.1.1/node_modules/rehype-raw/index.js"),_excluded=["inline","className","children"],_excluded2=["children"],_excluded3=["children"],_excluded4=["children"],_excluded5=["children"],_excluded6=["children"],_excluded7=["children"],_excluded8=["children"],__jsx=react.createElement;function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){(0,defineProperty.A)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function MarkDownViewer(_ref){var content=_ref.content;return __jsx(react_markdown.$,{className:"prose w-full max-w-[880px] dark:text-white ",remarkPlugins:[remark_gfm.A],rehypePlugins:[rehype_raw.A],components:{code:function code(_ref2){var inline=_ref2.inline,className=_ref2.className,children=_ref2.children,props=(0,objectWithoutProperties.A)(_ref2,_excluded),match=/language-(\w+)/.exec(className||"");return!inline&&match?__jsx(prism.A,(0,esm_extends.A)({},props,{style:material_dark.A,language:match[1],PreTag:"div",showLineNumbers:!0}),String(children).replace(/\n$/,"")):__jsx("code",(0,esm_extends.A)({},props,{className}),children)},img:function img(image){return __jsx(next_image.A,{className:"w-full h-auto object-cover shadow-md rounded-md",src:image.src||"",alt:image.alt||"",width:500,height:500,placeholder:"blur",blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMCwurBwADrwGLBfLO1QAAAABJRU5ErkJggg=="})},h1:function h1(_ref3){var children=_ref3.children,props=(0,objectWithoutProperties.A)(_ref3,_excluded2);return __jsx("h1",(0,esm_extends.A)({className:"prose text-2xl dark:text-white w-full max-w-[880px]"},props),children)},h2:function h2(_ref4){var children=_ref4.children,props=(0,objectWithoutProperties.A)(_ref4,_excluded3);return __jsx("h2",(0,esm_extends.A)({className:"prose text-xl dark:text-white w-full max-w-[880px]"},props),children)},h3:function h3(_ref5){var children=_ref5.children,props=(0,objectWithoutProperties.A)(_ref5,_excluded4);return __jsx("h3",(0,esm_extends.A)({className:"prose text-lg dark:text-white w-full max-w-[880px]"},props),children)},p:function p(_ref6){var children=_ref6.children,props=(0,objectWithoutProperties.A)(_ref6,_excluded5);return __jsx("p",(0,esm_extends.A)({className:"prose dark:text-white w-full max-w-[880px]"},props),children)},li:function li(_ref7){var children=_ref7.children,liProps=_objectSpread(_objectSpread({},(0,objectWithoutProperties.A)(_ref7,_excluded6)),{},{ordered:"false"});return __jsx("li",(0,esm_extends.A)({className:"prose dark:text-white w-full max-w-[880px]"},liProps),children)},strong:function strong(_ref8){var children=_ref8.children,props=(0,objectWithoutProperties.A)(_ref8,_excluded7);return __jsx("strong",(0,esm_extends.A)({className:"prose dark:text-white w-full max-w-[880px]"},props),children)},a:function a(_ref9){var children=_ref9.children,props=(0,objectWithoutProperties.A)(_ref9,_excluded8);return __jsx("a",(0,esm_extends.A)({className:"prose dark:text-blue-300 w-full max-w-[880px]"},props),children)}}},content)}MarkDownViewer.displayName="MarkDownViewer";try{MarkDownViewer.displayName="MarkDownViewer",MarkDownViewer.__docgenInfo={description:"",displayName:"MarkDownViewer",props:{content:{defaultValue:null,description:"",name:"content",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/MarkDownViewer.tsx#MarkDownViewer"]={docgenInfo:MarkDownViewer.__docgenInfo,name:"MarkDownViewer",path:"src/components/MarkDownViewer.tsx#MarkDownViewer"})}catch(__react_docgen_typescript_loader_error){}const MarkDownViewer_stories={title:"Example/MarkDownViewer",component:MarkDownViewer,parameters:{layout:"centered"},argTypes:{content:{control:{type:"text"}}},tags:["autodocs"]};var Default={args:{content:'# Hello World \n This is a test of the markdown viewer \n ## This is a subheader \n ### This is a subsubheader \n > This is a quote \n - This is a list \n - This is another list \n ```js \n const test = "test"; \n ``` \n [This is a link](https://www.google.com) \n ![This is an image](https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png) '}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {\n    content: '# Hello World \\n This is a test of the markdown viewer \\n ## This is a subheader \\n ### This is a subsubheader \\n > This is a quote \\n - This is a list \\n - This is another list \\n ```js \\n const test = \"test\"; \\n ``` \\n [This is a link](https://www.google.com) \\n ![This is an image](https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png) '\n  }\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]}}]);