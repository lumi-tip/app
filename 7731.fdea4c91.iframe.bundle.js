"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[7731],{"./node_modules/@codemirror/legacy-modes/mode/mbox.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{mbox:()=>mbox});var rfc2822=["From","Sender","Reply-To","To","Cc","Bcc","Message-ID","In-Reply-To","References","Resent-From","Resent-Sender","Resent-To","Resent-Cc","Resent-Bcc","Resent-Message-ID","Return-Path","Received"],rfc2822NoEmail=["Date","Subject","Comments","Keywords","Resent-Date"],whitespace=/^[ \t]/,separator=/^From /,rfc2822Header=new RegExp("^("+rfc2822.join("|")+"): "),rfc2822HeaderNoEmail=new RegExp("^("+rfc2822NoEmail.join("|")+"): "),header=/^[^:]+:/,email=/^[^ ]+@[^ ]+/,untilEmail=/^.*?(?=[^ ]+?@[^ ]+)/,bracketedEmail=/^<.*?>/,untilBracketedEmail=/^.*?(?=<.*>)/;const mbox={name:"mbox",startState:function(){return{inSeparator:!1,inHeader:!1,emailPermitted:!1,header:null,inHeaders:!1}},token:function readToken(stream,state){if(stream.sol()){if(state.inSeparator=!1,state.inHeader&&stream.match(whitespace))return null;if(state.inHeader=!1,state.header=null,stream.match(separator))return state.inHeaders=!0,state.inSeparator=!0,"atom";var match,emailPermitted=!1;return(match=stream.match(rfc2822HeaderNoEmail))||(emailPermitted=!0)&&(match=stream.match(rfc2822Header))?(state.inHeaders=!0,state.inHeader=!0,state.emailPermitted=emailPermitted,state.header=match[1],"atom"):state.inHeaders&&(match=stream.match(header))?(state.inHeader=!0,state.emailPermitted=!0,state.header=match[1],"atom"):(state.inHeaders=!1,stream.skipToEnd(),null)}if(state.inSeparator)return stream.match(email)?"link":(stream.match(untilEmail)||stream.skipToEnd(),"atom");if(state.inHeader){var style=function styleForHeader(header){return"Subject"===header?"header":"string"}(state.header);if(state.emailPermitted){if(stream.match(bracketedEmail))return style+" link";if(stream.match(untilBracketedEmail))return style}return stream.skipToEnd(),style}return stream.skipToEnd(),null},blankLine:function(state){state.inHeaders=state.inSeparator=state.inHeader=!1},languageData:{autocomplete:rfc2822.concat(rfc2822NoEmail)}}}}]);