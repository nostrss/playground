"use strict";(self.webpackChunknext_blog=self.webpackChunknext_blog||[]).push([[511],{"./src/stories/PostCard.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>PostCard_stories});var react=__webpack_require__("../../node_modules/.pnpm/next@13.4.19_@babel+core@7.24.7_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/compiled/react/index.js"),next_link=__webpack_require__("../../node_modules/.pnpm/next@13.4.19_@babel+core@7.24.7_react-dom@18.2.0_react@18.2.0/node_modules/next/link.js"),link_default=__webpack_require__.n(next_link),TagLabel=__webpack_require__("./src/components/TagLabel.tsx"),__jsx=react.createElement;function PostCard(_ref){var title=_ref.title,description=_ref.description,date=_ref.date,currentPostId=_ref.currentPostId,tagList=_ref.tags.split(" ");return(0,react.useEffect)((function(){var giscusIframe=document.querySelector(".giscus");null==giscusIframe||giscusIframe.remove()}),[]),__jsx("div",{className:"w-full min-w-[360px] max-w-2xl border rounded-xl border-gray-500"},__jsx("div",{className:"flex flex-row justify-start items-center px-4"},__jsx("article",{className:"w-full h-full p-4 md:p-8"},__jsx("div",{className:"flex items-center justify-between gap-2"},__jsx("div",{className:"w-full text-s"},date)),__jsx(link_default(),{href:"/blog/".concat(currentPostId),className:"hover:underline py-1"},__jsx("h2",{className:"mt-4 text-3xl font-bold"},title)),__jsx("p",{className:"mt-4 "},description),__jsx("div",{className:"flex flex-row gap-2 mt-4 overflow-hidden flex-wrap"},tagList.map((function(tag,index){return __jsx(TagLabel.A,{key:index,tagName:tag})}))))))}PostCard.displayName="PostCard";try{PostCard.displayName="PostCard",PostCard.__docgenInfo={description:"",displayName:"PostCard",props:{currentPostId:{defaultValue:null,description:"",name:"currentPostId",required:!1,type:{name:"string"}},title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},description:{defaultValue:null,description:"",name:"description",required:!0,type:{name:"string"}},date:{defaultValue:null,description:"",name:"date",required:!0,type:{name:"string"}},tags:{defaultValue:null,description:"",name:"tags",required:!0,type:{name:"string"}},images:{defaultValue:null,description:"",name:"images",required:!0,type:{name:"ImgesArrayItem[]"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/PostCard.tsx#PostCard"]={docgenInfo:PostCard.__docgenInfo,name:"PostCard",path:"src/components/PostCard.tsx#PostCard"})}catch(__react_docgen_typescript_loader_error){}const PostCard_stories={title:"Example/PostCard",component:PostCard,parameters:{layout:"centered"},argTypes:{title:{control:{type:"text"}},description:{control:{type:"text"}},date:{control:{type:"text"}},currentPostId:{control:{type:"text"}},images:{control:{type:"object"}},tags:{control:{type:"text"}}},tags:["autodocs"]};var Default={args:{title:"Post Title",description:"Post Description",date:"2021-01-01",currentPostId:"1",tags:"tag1 tag2",images:[{url:"https://picsum.photos/200/300"}]}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {\n    title: 'Post Title',\n    description: 'Post Description',\n    date: '2021-01-01',\n    currentPostId: '1',\n    tags: 'tag1 tag2',\n    images: [{\n      url: 'https://picsum.photos/200/300'\n    }]\n  }\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/components/TagLabel.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var next_navigation__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/.pnpm/next@13.4.19_@babel+core@7.24.7_react-dom@18.2.0_react@18.2.0/node_modules/next/navigation.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/.pnpm/next@13.4.19_@babel+core@7.24.7_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/compiled/react/index.js"),__jsx=react__WEBPACK_IMPORTED_MODULE_0__.createElement;function TagLabel(_ref){var tagName=_ref.tagName,_ref$count=_ref.count,count=void 0===_ref$count?0:_ref$count,_ref$isActive=_ref.isActive,isActive=void 0!==_ref$isActive&&_ref$isActive,router=(0,next_navigation__WEBPACK_IMPORTED_MODULE_1__.useRouter)();return __jsx("button",{onClick:function onClickTag(){router.push("/tag/".concat(tagName))},className:"px-3 py-1 text-xs ".concat(function handleActiveClassName(){return isActive?"bg-black text-white":"bg-gray-200 text-gray-800"}()," rounded-xl cursor-pointer hover:bg-black hover:text-white")},"".concat(tagName),count>0&&"(".concat(count,")"))}TagLabel.displayName="TagLabel";const __WEBPACK_DEFAULT_EXPORT__=react__WEBPACK_IMPORTED_MODULE_0__.memo(TagLabel);try{TagLabel.displayName="TagLabel",TagLabel.__docgenInfo={description:"",displayName:"TagLabel",props:{tagName:{defaultValue:null,description:"",name:"tagName",required:!0,type:{name:"string"}},count:{defaultValue:{value:"0"},description:"",name:"count",required:!1,type:{name:"number"}},isActive:{defaultValue:{value:"false"},description:"",name:"isActive",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/TagLabel.tsx#TagLabel"]={docgenInfo:TagLabel.__docgenInfo,name:"TagLabel",path:"src/components/TagLabel.tsx#TagLabel"})}catch(__react_docgen_typescript_loader_error){}}}]);