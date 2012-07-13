if("function"!=typeof(Function.prototype.bind)){Function.prototype.bind=function(b){var a=this;return function(){return a.apply(b,arguments)}}}Function.prototype.defer=function defer(){var b=this;var a=arguments;return window.setTimeout(function(){return b.apply(this,a)}.bind(this),defer._interval||25)};Function.prototype.defer._interval=25;Object.extend=function(a,c){for(var b in c){a[b]=c[b]}return a};if("function"!=typeof(Object.freeze)){Object.freeze=function(a){oryx.log.warn("Current JavaScript version does not support freezing variables, changes will apply.",a)}}if("function"!=typeof(String.prototype.trim)){String.prototype.trim=function(){return this.replace(/^\s*/,"").replace(/\s*$/,"")}};(function(b){var a=function c(d){var e=c.modules[d]||b[d]||(window&&window[d]);if(!e){throw new Error("(cjs) module not defined: "+d)}return e};a.modules={};b.require=a})(this);(function(a){var b=(function(d){d=d.split(" ");var c={};var e=0;c.setAppender=function(f){d.forEach(function(g){if("function"==typeof(f[g])){c[g]=function(){f[g].apply(f,arguments)}}else{c[g]=function(){}}});return true};c.setLevel=function(g){var f=isNaN(g)?d.indexOf(g):g;if(0>f||d.length-1<f){throw new TypeError("invalid log level: "+g)}e=f};if(window&&window.console){c.setAppender(window.console)}else{c.setAppender({})}return c})("error warn info debug log");a.log=b})(require.modules);(function(a){var f=require("log");var i={};i.options={method:"GET",asynchronous:true,contentType:"application/x-www-form-urlencoded",encoding:"UTF-8",parameters:"",timeout:Infinity,interval:50,empty:null};var m=0;var h=1;var g=2;var o=3;var p=4;i.isSameOrigin=function(u){var t=u.toString().match(/^\s*((file|http|https):\/\/[a-z\.-]*:?\d{0,6})/);var v=document.location;var w=v.protocol+"//"+document.domain+(v.port?":"+v.port:"");return !!t&&(t[1]==w)};var r=i.isSameOrigin;i.serializeParameters=function(v){if("function"!=typeof(v.hasOwnProperty)){throw new TypeError("parameters must be a JavaScript (hash) object")}var u=[];for(var t in v){if(v.hasOwnProperty(t)){var w=v[t];if("function"==typeof(w.forEach)){w.forEach(function(x){u.push(rfc3986encode(t)+"="+rfc3986encode(x))})}else{u.push(rfc3986encode(t)+"="+rfc3986encode(w))}}}return u.join("&")};var j=i.serializeParameters;i.rfc3986encode=function(t){if(null===t){return""}return encodeURIComponent(t.toString()).replace(/%20/g,"+").replace(/!/g,"%21").replace(/'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/\*/g,"%2A")};rfc3986encode=i.rfc3986encode;i.rfc3986decode=function(t){if(null===t){return""}return decodeURIComponent(t.toString().replace(/\+/g," ").replace(/%21/g,"!").replace(/%27/g,"'").replace(/%28/g,"(").replace(/%29/g,")").replace(/%2A/g,"*"))};rfc3986decode=i.rfc3986decode;i.success=function(t){return !t||(t>=200&&t<300)||t==304};var e=i.success;i.createStreamPatternFilter=function(u,v){var t="";return function(y,x){var w;t+=y;while(w=t.match(u)){var z=t.indexOf(w[0]);t=t.substring(z+w[0].length,t.length);v(w[0])}}};i.createStreamSeparatorFilter=function(u,v){var t="";return function(A,y){t+=A;var z=t.split(u),w=z.length;for(var x=0;x<w-1;x++){v(z[x])}if(y){v(z[w-1])}else{t=z[w-1]}}};function q(){return new XMLHttpRequest()}function n(w){var v={"X-Requested-With":"XMLHttpRequest",Accept:"text/plain, application/json, application/xml, text/javascript, text/xml, */*"},u={};for(var t in w._options.headers||{}){u[t]=w._options.headers[t]}for(var t in v){if(!(u.hasOwnProperty(t))){u[t]=v[t]}}if(w.overrideMimeType&&(navigator.userAgent.match(/Gecko\/(\d{4})/)||[0,2005])[1]<2005){u.Connection="close"}for(var t in u){if(u.hasOwnProperty(t)){w.setRequestHeader(t,u[t])}}}function s(v){var t=null,u=v._options;if(!u.method.match(/GET|DELETE|OPTIONS|HEAD/)){if(XML&&u.body instanceof (XML)){t=t.toXMLString();u.headers["Content-Type"]=u.headers["Content-Type"]||"application/xml; charset=utf-8"}else{if(u.body instanceof Object){t=JSON.stringify(t);u.headers["Content-Type"]=u.headers["Content-Type"]||"application/json; charset=utf-8"}else{t=u.body.toString();u.headers["Content-Type"]=u.headers["Content-Type"]||"text/plain; charset=utf-8"}}}return t}function b(w,v){var x=q();x._options=v;x._url=w;if(x._options.parameters){w+=(0>=w.indexOf("?")?"?":"&")+j(x._options.parameters)}x.onreadystatechange=function(){l(x)};x.open(v.method,w,true);n(x);var t=s(x);if(v.timeout&&v.timeout<Infinity){var u=Date.now();window.setTimeout(function(){x._options={};x.abort();if("function"==typeof(v.onTimeout)){d(v.onTimeout,[x,Date.now()-u])}},v.timeout)}x.send(t);return x}function d(u,t){try{u.apply(null,t)}catch(v){if("onException" in t[0]._options){t[0]._options.onException(v,t[0])}else{f.error("Unhandled exception on ajax readyStateChange",v,t)}}}function l(v){var u=v._options;if("function"==typeof(u.onInteractive)){if(o===v.readyState&&!v._poll){v._poll=window.setInterval(function(){d(k,[v,false])},u.interval);return}if(p==v.readyState){clearInterval(v._poll);d(k,[v,true])}}if("function"==typeof(u.onLoading)&&h===v.readyState){d(u.onLoading,[v]);return}if("function"==typeof(u.onLoaded)&&g===v.readyState){d(u.onLoaded,[v]);return}if(p===v.readyState){var t=v.status;if("function"==typeof(u["on"+t])){d(u["on"+t],[v])}if(e(t)&&"function"==typeof(u.onSuccess)){d(u.onSuccess,[v])}if(!e(t)&&"function"==typeof(u.onFailure)){d(u.onFailure,[v])}if("function"==typeof(u.onComplete)){d(u.onComplete,[v])}}}function k(x,v){var u=x.responseText,t=u.length;x._cursor=x._cursor||0;if(t>x._cursor){var w=u.substring(x._cursor,t);x._options.onInteractive(w,v);x._cursor=t}}i.Request=function c(v,u){if(!(this instanceof c)){f.warn("ajax.Request is a constructor, call with 'new' statement!");return new c(v,u)}var x,t=i.options;for(var w in t){if(!u.hasOwnProperty(w)){u[w]=t[w]}}this.getState=function(){return x.readyState};this.getXHR=function(){return x};this.getURL=function(){return v};x=b(v,u)};a.ajax=i})(require.modules);(function(a){
/*!
	 * mustache.js - Logic-less {{mustache}} templates with JavaScript
	 * http://github.com/janl/mustache.js
	 */
var b=(typeof module!=="undefined"&&module.exports)||{};(function(y){y.name="mustache.js";y.version="0.5.0-dev";y.tags=["{{","}}"];y.parse=o;y.compile=g;y.render=x;y.clearCache=w;y.to_html=function(C,A,B,D){var z=x(C,A,B);if(typeof D==="function"){D(z)}else{return z}};var u=Object.prototype.toString;var h=Array.isArray;var d=Array.prototype.forEach;var i=String.prototype.trim;var k;if(h){k=h}else{k=function(z){return u.call(z)==="[object Array]"}}var t;if(d){t=function(A,B,z){return d.call(A,B,z)}}else{t=function(C,D,B){for(var A=0,z=C.length;A<z;++A){D.call(B,C[A],A,C)}}}var m=/^\s*$/;function e(z){return m.test(z)}var r;if(i){r=function(z){return z==null?"":i.call(z)}}else{var p,j;if(e("\xA0")){p=/^\s+/;j=/\s+$/}else{p=/^[\s\xA0]+/;j=/[\s\xA0]+$/}r=function(z){return z==null?"":String(z).replace(p,"").replace(j,"")}}var f={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"};function q(z){return String(z).replace(/[&<>"'\/]/g,function(A){return f[A]||A})}function n(F,H,I,B){B=B||"<template>";var J=H.split("\n"),z=Math.max(I-3,0),C=Math.min(J.length,I+3),A=J.slice(z,C);var G;for(var D=0,E=A.length;D<E;++D){G=D+z+1;A[D]=(G===I?" >> ":"    ")+A[D]}F.template=H;F.line=I;F.file=B;F.message=[B+":"+I,A.join("\n"),"",F.message].join("\n");return F}function v(z,H,G){if(z==="."){return H[H.length-1]}var F=z.split(".");var D=F.length-1;var E=F[D];var I,A,C=H.length,B,J;while(C){J=H.slice(0);A=H[--C];B=0;while(B<D){A=A[F[B++]];if(A==null){break}J.push(A)}if(A&&typeof A==="object"&&E in A){I=A[E];break}}if(typeof I==="function"){I=I.call(J[J.length-1])}if(I==null){return G}return I}function l(C,z,G,B){var A="";var E=v(C,z);if(B){if(E==null||E===false||(k(E)&&E.length===0)){A+=G()}}else{if(k(E)){t(E,function(H){z.push(H);A+=G();z.pop()})}else{if(typeof E==="object"){z.push(E);A+=G();z.pop()}else{if(typeof E==="function"){var D=z[z.length-1];var F=function(H){return x(H,D)};A+=E.call(D,G(),F)||""}else{if(E){A+=G()}}}}}return A}function o(ab,D){D=D||{};var M=D.tags||y.tags,N=M[0],I=M[M.length-1];var A=['var buffer = "";',"\nvar line = 1;","\ntry {",'\nbuffer += "'];var H=[],ac=false,Z=false;var X=function(){if(ac&&!Z&&!D.space){while(H.length){A.splice(H.pop(),1)}}else{H=[]}ac=false;Z=false};var U=[],R,E,O;var W=function(ad){M=r(ad).split(/\s+/);E=M[0];O=M[M.length-1]};var L=function(ad){A.push('";',R,'\nvar partial = partials["'+r(ad)+'"];',"\nif (partial) {","\n  buffer += render(partial,stack[stack.length - 1],partials);","\n}",'\nbuffer += "')};var z=function(af,ad){var ae=r(af);if(ae===""){throw n(new Error("Section name may not be empty"),ab,K,D.file)}U.push({name:ae,inverted:ad});A.push('";',R,'\nvar name = "'+ae+'";',"\nvar callback = (function () {","\n  return function () {",'\n    var buffer = "";','\nbuffer += "')};var G=function(ad){z(ad,true)};var V=function(ae){var ad=r(ae);var ag=U.length!=0&&U[U.length-1].name;if(!ag||ad!=ag){throw n(new Error('Section named "'+ad+'" was never opened'),ab,K,D.file)}var af=U.pop();A.push('";',"\n    return buffer;","\n  };","\n})();");if(af.inverted){A.push("\nbuffer += renderSection(name,stack,callback,true);")}else{A.push("\nbuffer += renderSection(name,stack,callback);")}A.push('\nbuffer += "')};var Y=function(ad){A.push('";',R,'\nbuffer += lookup("'+r(ad)+'",stack,"");','\nbuffer += "')};var B=function(ad){A.push('";',R,'\nbuffer += escapeHTML(lookup("'+r(ad)+'",stack,""));','\nbuffer += "')};var K=1,aa,F;for(var S=0,T=ab.length;S<T;++S){if(ab.slice(S,S+N.length)===N){S+=N.length;aa=ab.substr(S,1);R="\nline = "+K+";";E=N;O=I;ac=true;switch(aa){case"!":S++;F=null;break;case"=":S++;I="="+I;F=W;break;case">":S++;F=L;break;case"#":S++;F=z;break;case"^":S++;F=G;break;case"/":S++;F=V;break;case"{":I="}"+I;case"&":S++;Z=true;F=Y;break;default:Z=true;F=B}var C=ab.indexOf(I,S);if(C===-1){throw n(new Error('Tag "'+N+'" was not closed properly'),ab,K,D.file)}var Q=ab.substring(S,C);if(F){F(Q)}var P=0;while(~(P=Q.indexOf("\n",P))){K++;P++}S=C+I.length-1;N=E;I=O}else{aa=ab.substr(S,1);switch(aa){case'"':case"\\":Z=true;A.push("\\"+aa);break;case"\r":break;case"\n":H.push(A.length);A.push("\\n");X();K++;break;default:if(e(aa)){H.push(A.length)}else{Z=true}A.push(aa)}}}if(U.length!=0){throw n(new Error('Section "'+U[U.length-1].name+'" was not closed properly'),ab,K,D.file)}X();A.push('";',"\nreturn buffer;","\n} catch (e) { throw {error: e, line: line}; }");var J=A.join("").replace(/buffer \+= "";\n/g,"");if(D.debug){if(typeof console!="undefined"&&console.log){console.log(J)}else{if(typeof print==="function"){print(J)}}}return J}function s(D,B){var A="view,partials,stack,lookup,escapeHTML,renderSection,render";var z=o(D,B);var C=new Function(A,z);return function(F,G){G=G||{};var E=[F];try{return C(F,G,E,v,q,l,x)}catch(H){throw n(H.error,D,H.line,B.file)}}}var c={};function w(){c={}}function g(A,z){z=z||{};if(z.cache!==false){if(!c[A]){c[A]=s(A,z)
}return c[A]}return s(A,z)}function x(B,z,A){return g(B)(z,A)}})(b);a.mustache=b})(require.modules);if("function"!=typeof(require)){throw"modules library required"}(function(a){var e=function(j){this.raw=j;this.records=[]};Object.extend(e.prototype,{raw:"",records:[],parse:function(){this.records=i(this.raw)}});Object.extend(e,{format:function(k,q){var p=require("mustache"),l=[],n=Array.prototype.map.call(arguments,function(r){return r}),m="<p>{{author}}. <em> {{title}}. </em> {{#booktitle}}In {{booktitle}}. {{/booktitle}}{{#pages}} pages {{pages}}, {{/pages}}{{#publisher}} {{publisher}}, {{/publisher}} {{year}}</p>";if(n.length>1){var o=n[n.length-1];if(b(o)){m=n.pop()}}if(n.length>1){l=n}else{if(n.length==1){if(b(n[0])){var j=new e(n[0]);j.parse();l=j.records}else{if(f(n[0])){l=n[0]}else{l=[n[0]]}}}else{n=[]}}return l.map(function(t){for(var s in t){if("editor"==s||"author"==s){t[s]=d(t[s])}else{if("_raw"==s){}else{t[s]=c(t[s])}}}return p.render(m,t)}).join("")}});function b(j){return"function"==typeof(j.substring)}function f(j){return"function"==typeof(j.slice)}function c(j){return j.replace(/^[\{\s]*/,"").replace(/[\s\}]*$/,"").replace(/\{?\\"\{?a\}*}/g,"ä").replace(/\{?\\"\{?o\}*}/g,"ö").replace(/\{?\\"\{?u\}*}/g,"ü").replace(/\{?\\"\{?A\}*}/g,"Ä").replace(/\{?\\"\{?O\}*}/g,"Ö").replace(/\{?\\"\{?U\}*}/g,"Ü").replace(/[~ ]-- /g," &ndash; ").replace(/[\n\r]{2,}/g,"<br/>")}function d(j){j=j.split(" and ");return j.map(function(k){return c(k)}).join(", ")}function i(n){var l=[],q="",p="",m=0,k=false,j="";for(var o=0;o<n.length;o++){q=n.charAt(o);if(0==m&&"@"==q){k=true}else{if(k&&"{"==q&&"\\"!=p){m++}else{if(k&&"}"==q&&"\\"!=p){m--;if(0>m){throw"More brackets were closed than opened"}if(0==m){k=false;l.push(g(j+q));j=""}}}}if(k){j+=q}p=q}if(k){throw"unterminated record: \n"+j}if(m){throw"unblanaced paranthesis: \n"+j}return l}function g(m){var j={_raw:m},l=0,o="";last="",key=false,value=false,buffer="",_void=null;var k=m.match(/@([^\{]+)\s*\{\s*([^,]+),/);if(null==k){return null}j._type=k[1];j._label=k[2];for(var n=k[0].length;n<m.length;n++){o=m.charAt(n);if(!key&&!value&&"="!=o){key=true}else{if(key&&!value&&0==l&&"="==o){key=buffer.trim().toLowerCase();buffer="";value=true;continue}else{if(value&&0==l&&","==o&&"\\"!=last){j[key]=buffer.trim();buffer="";key=false;value=false;continue}else{if((key||value)&&"{"==o&&"\\"!=last){l++}else{if((key||value)&&"}"==o&&"\\"!=last){l--;if(0>l){if(n==m.length-1){j[key]=(buffer+o).trim()}break}}}}}}if(key||value){buffer+=o;last=o}}return j}function h(j){}a.bibtex=e})(require.modules);var Ajax=require("ajax"),Bibtex=require("bibtex"),pattern="<li id='{{_label}}'>{{author}}. <em> {{{title}}}. </em> {{#booktitle}}In {{booktitle}}. {{/booktitle}}{{#pages}} pages {{pages}}, {{/pages}}{{#publisher}} {{publisher}}, {{/publisher}} {{year}}.<small>{{#abstract}} <a href='#{{_label}}' onclick='toggle(\"{{_label}}_abstract\");return false;'>abstract</a> |{{/abstract}}{{#url}} <a target='_top' href='{{url}}'>paper</a> |{{/url}} <a href='#{{_label}}' onclick='toggle(\"{{_label}}_bibtex\");return false;'>bibtex</a></small>{{#abstract}}<p class='toggle' style='display:none' id='{{_label}}_abstract' title='abstract'>{{{abstract}}}</p>{{/abstract}}<pre class='toggle' style='display:none' id='{{_label}}_bibtex' title='bibtex'>{{_raw}}</pre></li>",bibsrc=null,container=document.getElementById("bibliography");Array.prototype.forEach.call(document.getElementsByTagName("script"),function(b){var a=b.src.match(/minsa\.bibtex\.js\?(.*)/);if(a){bibsrc=a[1]}});if(null==bibsrc){alert("Unable to load publication list.");throw"Unable to load publication list"}function toggle(b){var a=document.getElementById(b);if(a){if(a.style.display=="none"||a.style.display==""){a.style.display="block"}else{a.style.display="none"}}}new Ajax.Request(bibsrc,{onSuccess:function(g){var c=new Bibtex(g.responseText),e=require("log");c.parse();c.records.reverse();var a={Conference:[],Workshop:[],Miscellaneous:[]};c.records.forEach(function(h){var b=(h.type||"").replace(/^[\{\s]*/,"").replace(/[\s\}]*$/,"");if(-1<["conference","conf","c"].indexOf(b)){a.Conference.push(h)}else{if(-1<["workshop","ws"].indexOf(b)){a.Workshop.push(h)}else{a.Miscellaneous.push(h)}}});if(0==a.Conference.length&&0==a.Workshop.length){var d=document.createElement("ul");d.className="bib";d.innerHTML=Bibtex.format(a.Miscellaneous,pattern);container.appendChild(d)}else{for(t in a){if(a[t].length>0){var f=document.createElement("h3");f.innerHTML=t;var d=document.createElement("ul");d.className="bib";d.innerHTML=Bibtex.format(a[t],pattern);container.appendChild(f);container.appendChild(d)}}}}});