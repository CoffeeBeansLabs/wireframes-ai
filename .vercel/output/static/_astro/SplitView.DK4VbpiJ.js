import{h as m,y as j}from"./signals.module.GfMc3gEj.js";import{l as w,k as v}from"./preact.module.BemPCGJA.js";var S=0;function e(r,t,n,s,p,u){t||(t={});var a,i,c=t;"ref"in t&&(a=t.ref,delete t.ref);var d={type:r,props:c,key:n,ref:a,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--S,__i:-1,__u:0,__source:p,__self:u};if(typeof r=="function"&&(a=r.defaultProps))for(i in a)c[i]===void 0&&(c[i]=a[i]);return w.vnode&&w.vnode(d),d}function h({label:r,htmlFor:t,required:n,optional:s,children:p}){return e("div",{children:[e("label",{htmlFor:t,class:"block text-sm font-medium text-gray-700 mb-2",children:[r,s&&e("span",{class:"text-gray-500 ml-1",children:"(optional)"})]}),p]})}function P({isLoading:r,loadingText:t="Generating...",children:n}){return e("button",{type:"submit",disabled:r,className:"w-full bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center",children:r?e(v,{children:[e("svg",{className:"animate-spin -ml-1 mr-3 h-5 w-5 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[e("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),e("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),t]}):n})}function M({message:r}){return r?e("div",{class:"bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg",children:r}):null}function q({onSubmit:r,isLoading:t}){const[n,s]=m(null);return e("form",{onSubmit:u=>{u.preventDefault();const a=u.target,i=new FormData(a),c=i.get("projectName");if(!c?.trim()){s("User Journey is required");return}const d=i.get("projectBrief");if(!d?.trim()){s("User Journey is required");return}const o=i.get("userPersona"),l=i.get("userJourney");if(!l?.trim()){s("User Journey is required");return}const f={initialInput:{projectName:c,projectBrief:d,userPersona:o,userJourney:l}};s(null),r(f)},class:"max-w-4xl space-y-6 transition-all duration-300",children:[e(h,{label:"Project Name",htmlFor:"projectName",children:e("input",{type:"text",id:"projectName",name:"projectName",required:!0,class:"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary",placeholder:"Enter project name"})}),e(h,{label:"Project Brief",htmlFor:"projectBrief",children:e("textarea",{id:"projectBrief",name:"projectBrief",rows:3,required:!0,class:"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary",placeholder:"Brief description of the project"})}),e(h,{label:"User Persona (optional)",htmlFor:"userPersona",children:e("textarea",{id:"userPersona",name:"userPersona",rows:3,class:"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary",placeholder:"Describe your target user"})}),e(h,{label:"User Journey",htmlFor:"userJourney",required:!0,children:e("textarea",{id:"userJourney",name:"userJourney",rows:4,required:!0,class:"w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary",placeholder:"Describe the user journey"})}),n&&e(M,{message:n}),e(P,{isLoading:t,children:"Generate Wireframes"})]})}const B="/api";async function F(r){if(!r.ok){const n=await r.json().catch(()=>({}));throw new Error(n.details||`HTTP error! status: ${r.status}`)}return await r.json()}async function x(r){try{const t=await fetch(`${B}/generate`,{method:"POST",body:JSON.stringify(r)});return F(t)}catch(t){throw console.error("API Error:",t),new Error(t instanceof Error?t.message:"Failed to generate wireframe. Please try again.")}}function k({onSubmit:r,isLoading:t}){const[n,s]=m(null);return e("form",{onSubmit:async u=>{u.preventDefault();const a=u.target,c=new FormData(a).get("prompt");if(c.trim()){s(null);try{r(c),a.reset()}catch(d){const o=d instanceof Error?d.message:"An unexpected error occurred";s(o)}}},class:"relative max-w-4xl mx-auto",children:[n&&e("div",{class:"absolute -top-12 left-0 right-0 bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg",children:n}),e("div",{class:"flex gap-4",children:[e("textarea",{name:"prompt",placeholder:"Ask a follow-up question...",required:!0,disabled:t,class:"flex-1 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary bg-white text-gray-900 transition-all disabled:bg-gray-50 disabled:text-gray-500"}),e("button",{type:"submit",disabled:t,class:"h-10 bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-6 rounded-lg transition-all duration-200 flex items-center justify-center whitespace-nowrap",children:t?e(v,{children:[e("svg",{class:"animate-spin -ml-1 mr-2 h-4 w-4 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[e("circle",{class:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor","stroke-width":"4"}),e("path",{class:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),"Sending..."]}):"Send"})]})]})}function N(){const[r,t]=m([]),[n,s]=m(!1),[p,u]=m(!1),[a,i]=m();j(()=>{console.log(r)},[r]);const c=async o=>{s(!0);const{assistantMessage:l,currentConversationId:f}=await x(o);s(!1),u(!0),i(f);const g={role:"assistant",content:{response:l.content[0].input.explanation,preview:l.content[0].input.wireframes}};t([g])},d=async o=>{try{s(!0);const l={role:"user",content:{response:o}};t(y=>[...y,l]);const f=a?{subsequentMessage:o,conversationId:a}:{initialInput:o},{assistantMessage:g,currentConversationId:b}=await x(f);b!==a&&i(b),console.log(g);const _={role:"assistant",content:{response:g.content[0].input.explanation,preview:g.content[0].input.wireframes}};t(y=>[...y,_])}catch(l){console.error("Error sending message:",l)}finally{s(!1)}};return e("div",{class:"transition-all duration-500",children:p?e("div",{class:"space-y-6 grid grid-cols-2 gap-6",children:[e("div",{class:"flex flex-col gap-6 max-w-6xl bg-white rounded-lg p-6 animate-slide-in",children:r.map((o,l)=>e("div",{class:`prose max-w-none ${o.role==="assistant"?"bg-gray-100 p-8 rounded-r-3xl rounded-tl-3xl mb-4 mr-12":"bg-indigo-100 text-indigo-900 w-fit rounded-l-3xl rounded-tr-3xl text-right p-4 ml-auto"}`,dangerouslySetInnerHTML:{__html:o.content.response}},l))}),e("div",{class:"flex flex-col gap-6 space-y-6 bg-white rounded-lg p-6 animate-slide-in",children:r.filter(o=>o.role=="assistant").at(-1)?.content.preview?.map((o,l)=>e("div",{class:"flex flex-col gap-4",children:[e("p",{class:"font-semibold",children:o.title}),e("div",{class:"wireframe-container border rounded-lg p-4 hover:shadow-lg transition-shadow duration-200",dangerouslySetInnerHTML:{__html:o.image}},l)]}))}),e("div",{class:"sticky col-span-2 bottom-0 bg-white border-t p-4 animate-slide-up",children:e(k,{onSubmit:d,isLoading:n})})]}):e("div",{class:"animate-fade-out",children:e(q,{onSubmit:c,isLoading:n})})})}export{N as SplitView};