!function(){"use strict";function t(t,e){if(!t.hasAttribute(e))throw Error(`'<${t.tagName.toLowerCase()}>' requires '${e}' attribute. Found: ${t.outerHTML}`)}function e(e,r){r.forEach(r=>t(e,r))}function r(t,e=1){let r="  ".repeat(e);return t.split("\n").map(t=>t?r+t:"").join("\n")}function n(t){if(t.nodeType===Node.TEXT_NODE){let e=t.textContent.trim();return e||""}if(t.nodeType!==Node.ELEMENT_NODE)return"";let r=t.tagName.toLowerCase(),n=u[r];if(!n)throw Error(`MarkJS: no handler for <${r}> — node: ${t.outerHTML}`);return n(t)}function i(t){return Array.from(t.childNodes).map(n).filter(Boolean).join("\n")}let u={program:t=>i(t),let:t=>(e(t,["name","value"]),`let ${t.getAttribute("name")} = ${t.getAttribute("value")};`),set:t=>(e(t,["name","value"]),`${t.getAttribute("name")} = ${t.getAttribute("value")};`),function(e){t(e,"name");let n=e.getAttribute("name"),u=i(e);return`function ${n}() {
    ${r(u)}
    }`},call(e){t(e,"function");let r=e.getAttribute("function"),n=e.getAttribute("args")||e.getAttribute("arg")||"";return`${r}(${n});`},if(e){t(e,"condition");let u=e.getAttribute("condition"),a=Array.from(e.childNodes).filter(t=>t.nodeType===Node.ELEMENT_NODE&&!["elseif","else"].includes(t.tagName.toLowerCase())).map(n).join("\n"),o=`if (${u}) {
    ${r(a)}
    }`;return Array.from(e.childNodes).forEach(e=>{if(e.nodeType!==Node.ELEMENT_NODE)return;let n=e.tagName.toLowerCase();if("elseif"===n){t(e,"condition");let u=e.getAttribute("condition"),a=i(e);o+=` else if (${u}) {
    ${r(a)}
    }`}else if("else"===n){let l=i(e);o+=` else {
    ${r(l)}
    }`}}),o},for(t){e(t,["init","condition","update"]);let n=t.getAttribute("init"),u=t.getAttribute("condition"),a=t.getAttribute("update"),o=i(t);return`for (${n}; ${u}; ${a}) {
    ${r(o)}
    }`},while(e){t(e,"condition");let n=e.getAttribute("condition"),u=i(e);return`while (${n}) {
    ${r(u)}
    }`},dowhile(e){t(e,"condition");let n=e.getAttribute("condition"),u=i(e);return`do {
    ${r(u)}
    } while (${n});`},break:()=>"break;",continue:()=>"continue;",return:e=>(t(e,"value"),`return ${e.getAttribute("value")};`),switch(e){t(e,"expression");let n=e.getAttribute("expression"),u=i(e);return`switch (${n}) {
    ${r(u)}
    }`},case(e){t(e,"value");let n=e.getAttribute("value"),u=i(e);return`case ${n}:
    ${r(u)}`},default(t){let e=i(t);return`default:
    ${r(e)}`},try:t=>`try {
    ${r(i(t))}
    }`,catch:e=>(t(e,"exception"),`catch (${e.getAttribute("exception")}) {
    ${r(i(e))}
    }`),finally:t=>`finally {
    ${r(i(t))}
    }`,throw:e=>(t(e,"exception"),`throw ${e.getAttribute("exception")};`),forin(t){e(t,["left","right"]);let n=t.getAttribute("left"),u=t.getAttribute("right"),a=i(t);return`for (${n} in ${u}) {
    ${r(a)}
    }`},forof(t){e(t,["left","right"]);let n=t.getAttribute("left"),u=t.getAttribute("right"),a=i(t);return`for (${n} of ${u}) {
    ${r(a)}
    }`},class(e){t(e,"name");let n=e.getAttribute("name"),u=e.getAttribute("extends"),a=i(e);return`class ${n}${u?" extends "+u:""} {
    ${r(a)}
    }`},constructor(t){let e=t.getAttribute("args")||"",n=i(t);return`constructor(${e}) {
    ${r(n)}
    }`},method(e){t(e,"name");let n=e.getAttribute("name"),u="true"===e.getAttribute("static")?"static ":"",a="true"===e.getAttribute("async")?"async ":"",o="true"===e.getAttribute("generator")?"*":"",l=e.getAttribute("params")||"",g=i(e);return`${u}${a}${o}${n}(${l}) {
    ${r(g)}
    }`},import(e){t(e,"from");let r=e.getAttribute("from"),n=e.getAttribute("default"),i=e.getAttribute("named"),u=e.getAttribute("namespace"),a=[];return n&&a.push(n),i&&a.push(`{ ${i} }`),u&&a.push(`* as ${u}`),`import ${a.join(", ")} from ${r};`},export(e){t(e,"name");let r=e.getAttribute("name"),n="true"===e.getAttribute("default"),i=e.getAttribute("from");return i?`export { ${r} } from ${i};`:n?`export default ${r};`:`export { ${r} };`},arrowfunction(t){let e=t.getAttribute("params")||"",n="true"===t.getAttribute("async")?"async ":"",u=i(t);return`${n}(${e}) => {
    ${r(u)}
    }`},asyncfunction(e){t(e,"name");let n=e.getAttribute("name"),u=e.getAttribute("params")||"",a=i(e);return`async function ${n}(${u}) {
    ${r(a)}
    }`},await:e=>(t(e,"expression"),`await ${e.getAttribute("expression")};`),yield:e=>(t(e,"argument"),`yield ${e.getAttribute("argument")};`),new(e){t(e,"callee");let r=e.getAttribute("callee"),n=e.getAttribute("args")||"";return`new ${r}(${n});`},delete:e=>(t(e,"argument"),`delete ${e.getAttribute("argument")};`),typeof:e=>(t(e,"argument"),`typeof ${e.getAttribute("argument")};`),instanceof(t){e(t,["left","right"]);let r=t.getAttribute("left"),n=t.getAttribute("right");return`${r} instanceof ${n};`},debugger:()=>"debugger;",label(e){t(e,"name");let n=e.getAttribute("name"),u=i(e);return`${n}: {
    ${r(u)}
    }`},with(e){t(e,"object");let n=e.getAttribute("object"),u=i(e);return`with (${n}) {
    ${r(u)}
    }`},ternary(t){e(t,["condition","consequent","alternate"]);let r=t.getAttribute("condition"),n=t.getAttribute("consequent"),i=t.getAttribute("alternate");return`${r} ? ${n} : ${i};`},on(e){t(e,"event");let n=e.getAttribute("event"),u=e.getAttribute("key"),a=i(e),o=`document.addEventListener(${JSON.stringify(n)}, e => {
    `;return u?o+=`  if (e.key === ${JSON.stringify(u)}) {
    ${r(a,2)}
      }
    `:o+=r(a,1)+"\n",o+="});"},alias(t){e(t,["tag","as"]);let r=t.getAttribute("tag").toLowerCase(),n=t.getAttribute("as").toLowerCase();if(!u[n])throw Error(`Cannot alias '${r}' to unknown <${n}> handler. Origin: ${t.outerHTML}`);return u[r]=u[n],""},elseif:t=>i(t),else:t=>i(t)};document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll('script[type="text/markjs"]').forEach(t=>{let e=t.getAttribute("src"),r=t.getAttribute("data-mode")||"execute",n=t.getAttribute("data-output")||"pretty";function u(e){let u=e.replace(/<([a-zA-Z][\w-]*)\b([^>]*)\/>/g,"<$1$2></$1>").trim(),a=document.createElement("template");a.innerHTML=u;let o=i(a.content);if("minified"===n&&(o=o.replace(/\n\s*/g,"")),"dry-run"===r){console.log("MarkJS [dry-run] compiled:\n",o);return}if("test"===r){let l=t=>t.replace(/&/g,"&amp;").replace(/</g,"&lt;"),g=document.createElement("div");g.style.border="1px solid #ccc",g.style.padding="8px",g.innerHTML=`
                    <details open>
                      <summary>MarkJS Test</summary>
                      <strong>Original DSL:</strong>
                      <pre>${l(u)}</pre>
                      <strong>Compiled JS:</strong>
                      <pre>${l(o)}</pre>
                    </details>
                  `,t.parentNode.insertBefore(g,t.nextSibling);return}if("sandbox"===r)Function(o)();else{let s=document.createElement("script");s.type="text/javascript",s.text=o,s.setAttribute("data-markjs-generated",""),t.parentNode.replaceChild(s,t)}}e?fetch(e).then(t=>t.text()).then(u).catch(t=>console.error(`MarkJS: failed to fetch "${e}"`,t)):u(t.textContent)})})}();
