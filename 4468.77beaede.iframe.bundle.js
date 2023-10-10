"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[4468],{"./src/js_modules/moduleMap/modalInfo.jsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>modalInfo});var esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),objectWithoutProperties=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),react=__webpack_require__("./node_modules/react/index.js"),chunk_7NLW6UB6=__webpack_require__("./node_modules/@chakra-ui/color-mode/dist/chunk-7NLW6UB6.mjs"),chunk_UUGUEMMH=__webpack_require__("./node_modules/@chakra-ui/modal/dist/chunk-UUGUEMMH.mjs"),chunk_OWW5MU75=__webpack_require__("./node_modules/@chakra-ui/modal/dist/chunk-OWW5MU75.mjs"),chunk_66WFFNY3=__webpack_require__("./node_modules/@chakra-ui/modal/dist/chunk-66WFFNY3.mjs"),chunk_YBA5A33G=__webpack_require__("./node_modules/@chakra-ui/modal/dist/chunk-YBA5A33G.mjs"),chunk_YLPWWAYV=__webpack_require__("./node_modules/@chakra-ui/modal/dist/chunk-YLPWWAYV.mjs"),chunk_PVJ72NKC=__webpack_require__("./node_modules/@chakra-ui/modal/dist/chunk-PVJ72NKC.mjs"),chunk_6CSUKJP7=__webpack_require__("./node_modules/@chakra-ui/layout/dist/chunk-6CSUKJP7.mjs"),chunk_YTV6DHKL=__webpack_require__("./node_modules/@chakra-ui/layout/dist/chunk-YTV6DHKL.mjs"),chunk_6ZNYZUDD=__webpack_require__("./node_modules/@chakra-ui/form-control/dist/chunk-6ZNYZUDD.mjs"),chunk_GYFRIY2Z=__webpack_require__("./node_modules/@chakra-ui/input/dist/chunk-GYFRIY2Z.mjs"),chunk_3GP7MWMA=__webpack_require__("./node_modules/@chakra-ui/form-control/dist/chunk-3GP7MWMA.mjs"),chunk_YI7XFFAC=__webpack_require__("./node_modules/@chakra-ui/modal/dist/chunk-YI7XFFAC.mjs"),chunk_NAA7TEES=__webpack_require__("./node_modules/@chakra-ui/button/dist/chunk-NAA7TEES.mjs"),useTranslation=__webpack_require__("./node_modules/next-translate/lib/esm/useTranslation.js"),formik_esm=__webpack_require__("./node_modules/formik/dist/formik.esm.js"),prop_types=__webpack_require__("./node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),Text=__webpack_require__("./src/common/components/Text.jsx"),index_esm=__webpack_require__("./node_modules/yup/index.esm.js"),regex=__webpack_require__("./src/utils/regex.js"),subscribe=index_esm.Ry().shape({email:index_esm.Z_().matches(regex.Do,"Invalid email").required("Email is required")});const validationSchemas={register:index_esm.Ry().shape({first_name:index_esm.Z_().min(2,"Too Short!").max(50,"Too Long!").required("First name is required"),last_name:index_esm.Z_().min(2,"Too Short!").max(50,"Too Long!").required("Last name is required"),email:index_esm.Z_().email("Invalid email").required("Email is required"),phone:index_esm.Z_().matches(regex.m7,"Invalid phone number")}),handleProfile:index_esm.Ry().shape({first_name:index_esm.Z_().min(2,"Too Short!").max(50,"Too Long!").required("First name is required"),last_name:index_esm.Z_().min(2,"Too Short!").max(50,"Too Long!").required("Last name is required"),email:index_esm.Z_().email("Invalid email").required("Email is required"),phone:index_esm.Z_().matches(regex.m7,"Invalid phone number")}),login:index_esm.Ry().shape({password:index_esm.Z_().required("Password is required"),email:index_esm.Z_().email("Invalid email").required("Password is required")}),leadForm:index_esm.Ry().shape({full_name:index_esm.Z_().min(10,"Too Short!").max(50,"Too Long!").required("Full name is required"),email:index_esm.Z_().email("Invalid email").required("Email is required")}),subscribe,projectUrlValidation:index_esm.Ry().shape({githubUrl:index_esm.Z_().matches(regex.HQ,"Invalid Url").required("Url is required")}),signup:index_esm.Ry().shape({firstName:index_esm.Z_().min(2,"Too Short!").max(50,"Too Long!").required("First name is required"),lastName:index_esm.Z_().min(2,"Too Short!").max(50,"Too Long!").required("Last name is required"),email:index_esm.Z_().email("Invalid email").required("Email is required"),confirmEmail:index_esm.Z_().oneOf([index_esm.iH("email"),null],"Emails don't match").required("Confirm Email is required")})};var MarkDownParser=__webpack_require__("./src/common/components/MarkDownParser/index.jsx"),Icon=__webpack_require__("./src/common/components/Icon/index.jsx"),iconDict=__webpack_require__("./src/common/utils/iconDict.json"),_excluded=["isOpen","onClose","actionHandler","rejectHandler","forceHandler","disableHandler","title","description","teacherFeedback","linkInfo","linkText","link","handlerText","closeText","cancelColorButton","handlerColorButton","rejectData","sendProject","currentTask","type","closeButtonVariant","htmlDescription","markdownDescription","attachment","disableInput","descriptionStyle","footerStyle","closeButtonStyles","buttonHandlerStyles","headerStyles","disableCloseButton","childrenDescription","maxWidth","forceHandlerAndClose"],__jsx=react.createElement;function ModalInfo(_ref){var isOpen=_ref.isOpen,onClose=_ref.onClose,actionHandler=_ref.actionHandler,rejectHandler=_ref.rejectHandler,forceHandler=_ref.forceHandler,disableHandler=_ref.disableHandler,title=_ref.title,description=_ref.description,teacherFeedback=_ref.teacherFeedback,linkInfo=_ref.linkInfo,linkText=_ref.linkText,link=_ref.link,handlerText=_ref.handlerText,closeText=_ref.closeText,cancelColorButton=_ref.cancelColorButton,handlerColorButton=_ref.handlerColorButton,rejectData=_ref.rejectData,sendProject=_ref.sendProject,currentTask=_ref.currentTask,type=_ref.type,closeButtonVariant=_ref.closeButtonVariant,htmlDescription=_ref.htmlDescription,markdownDescription=_ref.markdownDescription,attachment=_ref.attachment,disableInput=_ref.disableInput,descriptionStyle=_ref.descriptionStyle,footerStyle=_ref.footerStyle,closeButtonStyles=_ref.closeButtonStyles,buttonHandlerStyles=_ref.buttonHandlerStyles,headerStyles=_ref.headerStyles,disableCloseButton=_ref.disableCloseButton,childrenDescription=_ref.childrenDescription,maxWidth=_ref.maxWidth,forceHandlerAndClose=_ref.forceHandlerAndClose,rest=(0,objectWithoutProperties.Z)(_ref,_excluded),t=(0,useTranslation.Z)("dashboard").t,_useState=(0,react.useState)(link),githubUrl=_useState[0],setGithubUrl=_useState[1],_useState2=(0,react.useState)(!1),isSubmitting=_useState2[0],setIsSubmitting=_useState2[1],_useState3=(0,react.useState)(!1),confirmRejection=_useState3[0],setConfirmRejection=_useState3[1],commonBorderColor=(0,chunk_7NLW6UB6.ff)("gray.200","gray.500"),commonTextColor=(0,chunk_7NLW6UB6.ff)("gray.600","gray.200"),commonInputColor=(0,chunk_7NLW6UB6.ff)("gray.default","gray.300"),commonInputActiveColor=(0,chunk_7NLW6UB6.ff)("gray.800","gray.100"),commonHighlightColor=(0,chunk_7NLW6UB6.ff)("gray.250","darkTheme");return __jsx(react.Fragment,null,__jsx(chunk_UUGUEMMH.u_,(0,esm_extends.Z)({blockScrollOnMount:!1,closeOnOverlayClick:!forceHandler,isOpen,onClose},rest),__jsx(chunk_OWW5MU75.Z,null),__jsx(chunk_66WFFNY3.h,{maxWidth:maxWidth||"md",borderRadius:"6px",style:{marginTop:"10vh"}},__jsx(chunk_YBA5A33G.x,(0,esm_extends.Z)({borderBottom:1,borderStyle:"solid",borderColor:commonBorderColor},headerStyles),title),!forceHandler&&__jsx(chunk_YLPWWAYV.o,null),__jsx(chunk_PVJ72NKC.f,null,description&&__jsx(Text.Z,(0,esm_extends.Z)({size:"l",fontWeight:"400",color:commonTextColor,margin:"10px 0 0 0"},descriptionStyle),description),markdownDescription&&__jsx(chunk_6CSUKJP7.xu,{height:"100%",margin:"0 rem auto 0 auto",transition:"background 0.2s ease-in-out",borderRadius:"3px",maxWidth:"1280px",background:(0,chunk_7NLW6UB6.ff)("white","dark"),width:{base:"100%",md:"auto"},className:"markdown-body ".concat((0,chunk_7NLW6UB6.ff)("light","dark"))},__jsx(MarkDownParser.Z,{content:markdownDescription})),htmlDescription&&__jsx(Text.Z,{size:"l",fontWeight:"400",color:commonTextColor,margin:"10px 0 0 0",dangerouslySetInnerHTML:{__html:htmlDescription}}),childrenDescription&&childrenDescription,teacherFeedback&&__jsx(chunk_6CSUKJP7.xu,{margin:"15px 0 0 0",padding:"12px 16px",background:commonHighlightColor,display:"flex",flexDirection:"column",gridGap:"0px"},__jsx(Text.Z,{size:"l",fontWeight:"700",color:(0,chunk_7NLW6UB6.ff)("gray.800","gray.light")},t("modalInfo.rejected.teacher-feedback")),__jsx(Text.Z,{size:"l",fontWeight:"500",color:commonTextColor,margin:"0"},teacherFeedback)),Array.isArray(attachment)&&attachment.length>0?__jsx(chunk_6CSUKJP7.xu,{mt:"10px"},__jsx(Text.Z,{size:"l",mb:"8px"},t("modalInfo.files-sended-to-teacher")),__jsx(chunk_6CSUKJP7.xu,{display:"flex",flexDirection:"column",gridGap:"8px",maxHeight:"135px",overflowY:"auto"},attachment.map((function(file){var extension=file.name.split(".").pop(),isImage=["jpg","jpeg","png","gif","svg"].includes(extension),icon=iconDict.includes(extension)?extension:"file";return __jsx(chunk_6CSUKJP7.xu,{key:"".concat(file.id,"-").concat(file.name),display:"flex"},__jsx(Icon.Z,{icon:isImage?"image":icon,width:"22px",height:"22px"}),__jsx(chunk_YTV6DHKL.r,{href:file.url,target:"_blank",rel:"noopener noreferrer",color:"blue.500",margin:"0 0 0 10px"},file.name))})))):__jsx(react.Fragment,null,!disableInput&&!disableHandler&&link&&__jsx(chunk_6CSUKJP7.xu,{padding:"18px 0 0 0"},__jsx(formik_esm.J9,{initialValues:{githubUrl:link},onSubmit:function onSubmit(){setIsSubmitting(!0),""!==githubUrl&&(sendProject({task:currentTask,githubUrl,taskStatus:"DONE"}),setIsSubmitting(!1),onClose())},validationSchema:validationSchemas.projectUrlValidation},(function(){return __jsx(formik_esm.l0,null,__jsx(formik_esm.gN,{name:"githubUrl"},(function(_ref2){var field=_ref2.field,form=_ref2.form;return setGithubUrl(form.values.githubUrl),__jsx(chunk_6ZNYZUDD.NI,{isInvalid:form.errors.githubUrl&&form.touched.githubUrl},__jsx(chunk_GYFRIY2Z.I,(0,esm_extends.Z)({},field,{type:"text",color:commonInputColor,_focus:{color:commonInputActiveColor},_hover:{color:commonInputActiveColor},id:"githubUrl",placeholder:"https://github.com/..."})),__jsx(chunk_3GP7MWMA.J1,{marginTop:"10px"},form.errors.githubUrl))})))}))),disableInput&&(linkText||link)&&__jsx(chunk_6CSUKJP7.xu,{padding:"18px 0 0 0"},__jsx(Text.Z,{size:"l",fontWeight:"bold",color:commonTextColor},linkInfo),__jsx(chunk_YTV6DHKL.r,{href:link,color:(0,chunk_7NLW6UB6.ff)("blue.default","blue.300"),target:"_blank",rel:"noopener noreferrer"},linkText||link)))),__jsx(chunk_YI7XFFAC.m,(0,esm_extends.Z)({justifyContent:"space-evenly"},footerStyle),"taskHandler"===type?__jsx(chunk_6CSUKJP7.xu,{width:"100%",display:"flex",justifyContent:"space-between"},!disableCloseButton&&__jsx(chunk_NAA7TEES.z,{fontSize:"13px",variant:closeButtonVariant,onClick:actionHandler,textTransform:"uppercase"},closeText||t("common:close")),__jsx(chunk_NAA7TEES.z,{fontSize:"13px",isDisabled:Array.isArray(attachment)&&attachment.length>0||isSubmitting||disableHandler,isLoading:isSubmitting,onClick:function onClick(){return function resubmitHandler(){setIsSubmitting(!0),""!==githubUrl?(sendProject({task:currentTask,githubUrl,taskStatus:"DONE"}),setIsSubmitting(!1),onClose()):setIsSubmitting(!1)}()},variant:"default",textTransform:"uppercase"},handlerText)):__jsx(react.Fragment,null,!disableCloseButton&&__jsx(chunk_NAA7TEES.z,(0,esm_extends.Z)({fontSize:"13px",variant:closeButtonVariant,colorScheme:cancelColorButton,mr:3,onClick:function onClick(){return function rejectFunction(){forceHandler&&!forceHandlerAndClose?setConfirmRejection(!0):onClose()}()},textTransform:"uppercase"},closeButtonStyles),closeText||t("common:close")),!disableHandler&&__jsx(chunk_NAA7TEES.z,(0,esm_extends.Z)({fontSize:"13px",onClick:actionHandler,colorScheme:handlerColorButton,textTransform:"uppercase"},buttonHandlerStyles),handlerText))))),confirmRejection&&__jsx(chunk_UUGUEMMH.u_,{isOpen:confirmRejection,isCentered:!0},__jsx(chunk_OWW5MU75.Z,null),__jsx(chunk_66WFFNY3.h,null,__jsx(chunk_YBA5A33G.x,{borderBottom:1,borderStyle:"solid",borderColor:commonBorderColor},rejectData.title),__jsx(chunk_YI7XFFAC.m,null,__jsx(chunk_NAA7TEES.z,{fontSize:"13px",colorScheme:"red",mr:3,onClick:function onClick(){return setConfirmRejection(!1)},textTransform:"uppercase"},rejectData.closeText),(!disableHandler||forceHandler)&&__jsx(chunk_NAA7TEES.z,{fontSize:"13px",colorScheme:"blue",onClick:function onClick(){rejectHandler(),setConfirmRejection(!1)},textTransform:"uppercase"},rejectData.handlerText)))))}ModalInfo.propTypes={isOpen:prop_types_default().bool,onClose:prop_types_default().func.isRequired,actionHandler:prop_types_default().func,rejectHandler:prop_types_default().func,forceHandler:prop_types_default().bool,disableHandler:prop_types_default().bool,disableInput:prop_types_default().bool,title:prop_types_default().string,description:prop_types_default().string,teacherFeedback:prop_types_default().string,linkInfo:prop_types_default().string,linkText:prop_types_default().string,link:prop_types_default().string,handlerText:prop_types_default().string,closeText:prop_types_default().string,handlerColorButton:prop_types_default().string,cancelColorButton:prop_types_default().string,rejectData:prop_types_default().objectOf(prop_types_default().string),sendProject:prop_types_default().func,currentTask:prop_types_default().objectOf(prop_types_default().oneOfType([prop_types_default().any])),type:prop_types_default().string,closeButtonVariant:prop_types_default().string,htmlDescription:prop_types_default().string,markdownDescription:prop_types_default().string,attachment:prop_types_default().arrayOf(prop_types_default().objectOf(prop_types_default().oneOfType([prop_types_default().any]))),descriptionStyle:prop_types_default().objectOf(prop_types_default().oneOfType([prop_types_default().any])),footerStyle:prop_types_default().objectOf(prop_types_default().oneOfType([prop_types_default().any])),closeButtonStyles:prop_types_default().objectOf(prop_types_default().oneOfType([prop_types_default().any])),buttonHandlerStyles:prop_types_default().objectOf(prop_types_default().oneOfType([prop_types_default().any])),headerStyles:prop_types_default().objectOf(prop_types_default().oneOfType([prop_types_default().any])),disableCloseButton:prop_types_default().bool,childrenDescription:prop_types_default().node,maxWidth:prop_types_default().string,forceHandlerAndClose:prop_types_default().bool},ModalInfo.defaultProps={isOpen:!1,actionHandler:function actionHandler(){},rejectHandler:function rejectHandler(){},forceHandler:!1,disableHandler:!1,title:"Review status",description:"",teacherFeedback:"",linkInfo:"",disableInput:!1,linkText:"",link:"",handlerText:"Remove delivery",closeText:"",handlerColorButton:"blue",cancelColorButton:"red",rejectData:{},sendProject:function sendProject(){},currentTask:{},type:"default",closeButtonVariant:"danger",htmlDescription:"",markdownDescription:"",attachment:[],descriptionStyle:{},footerStyle:{},closeButtonStyles:{},buttonHandlerStyles:{},headerStyles:{},disableCloseButton:!1,childrenDescription:null,maxWidth:"md",forceHandlerAndClose:!1},ModalInfo.__docgenInfo={description:"",methods:[],displayName:"ModalInfo",props:{isOpen:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},actionHandler:{defaultValue:{value:"() => {}",computed:!1},description:"",type:{name:"func"},required:!1},rejectHandler:{defaultValue:{value:"() => {}",computed:!1},description:"",type:{name:"func"},required:!1},forceHandler:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},disableHandler:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},title:{defaultValue:{value:"'Review status'",computed:!1},description:"",type:{name:"string"},required:!1},description:{defaultValue:{value:"''",computed:!1},description:"",type:{name:"string"},required:!1},teacherFeedback:{defaultValue:{value:"''",computed:!1},description:"",type:{name:"string"},required:!1},linkInfo:{defaultValue:{value:"''",computed:!1},description:"",type:{name:"string"},required:!1},disableInput:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},linkText:{defaultValue:{value:"''",computed:!1},description:"",type:{name:"string"},required:!1},link:{defaultValue:{value:"''",computed:!1},description:"",type:{name:"string"},required:!1},handlerText:{defaultValue:{value:"'Remove delivery'",computed:!1},description:"",type:{name:"string"},required:!1},closeText:{defaultValue:{value:"''",computed:!1},description:"",type:{name:"string"},required:!1},handlerColorButton:{defaultValue:{value:"'blue'",computed:!1},description:"",type:{name:"string"},required:!1},cancelColorButton:{defaultValue:{value:"'red'",computed:!1},description:"",type:{name:"string"},required:!1},rejectData:{defaultValue:{value:"{}",computed:!1},description:"",type:{name:"objectOf",value:{name:"string"}},required:!1},sendProject:{defaultValue:{value:"() => {}",computed:!1},description:"",type:{name:"func"},required:!1},currentTask:{defaultValue:{value:"{}",computed:!1},description:"",type:{name:"objectOf",value:{name:"union",value:[{name:"any"}]}},required:!1},type:{defaultValue:{value:"'default'",computed:!1},description:"",type:{name:"string"},required:!1},closeButtonVariant:{defaultValue:{value:"'danger'",computed:!1},description:"",type:{name:"string"},required:!1},htmlDescription:{defaultValue:{value:"''",computed:!1},description:"",type:{name:"string"},required:!1},markdownDescription:{defaultValue:{value:"''",computed:!1},description:"",type:{name:"string"},required:!1},attachment:{defaultValue:{value:"[]",computed:!1},description:"",type:{name:"arrayOf",value:{name:"objectOf",value:{name:"union",value:[{name:"any"}]}}},required:!1},descriptionStyle:{defaultValue:{value:"{}",computed:!1},description:"",type:{name:"objectOf",value:{name:"union",value:[{name:"any"}]}},required:!1},footerStyle:{defaultValue:{value:"{}",computed:!1},description:"",type:{name:"objectOf",value:{name:"union",value:[{name:"any"}]}},required:!1},closeButtonStyles:{defaultValue:{value:"{}",computed:!1},description:"",type:{name:"objectOf",value:{name:"union",value:[{name:"any"}]}},required:!1},buttonHandlerStyles:{defaultValue:{value:"{}",computed:!1},description:"",type:{name:"objectOf",value:{name:"union",value:[{name:"any"}]}},required:!1},headerStyles:{defaultValue:{value:"{}",computed:!1},description:"",type:{name:"objectOf",value:{name:"union",value:[{name:"any"}]}},required:!1},disableCloseButton:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},childrenDescription:{defaultValue:{value:"null",computed:!1},description:"",type:{name:"node"},required:!1},maxWidth:{defaultValue:{value:"'md'",computed:!1},description:"",type:{name:"string"},required:!1},forceHandlerAndClose:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},onClose:{description:"",type:{name:"func"},required:!0}}};const modalInfo=(0,react.memo)(ModalInfo)},"./src/utils/regex.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Do:()=>email,HQ:()=>url,m7:()=>phone});var email=/^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@(?!mailinator|leonvero|ichkoch|naymeo|naymio)[a-zA-Z0-9]*\.[a-zA-Z](-?[a-zA-Z0-9])*.*[a-zA-Z]+$/,phone=/^(?!(\d{2,})\1+)(?!(\d+)\2{3,})(\+\d{1,3})?(\d{8,10})$/,url=/((https?):\/\/)?(www.)?[a-z0-9]+(\.[com|io]{2,}){1,3}(#?\/[a-zA-Z0-9-_#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/}}]);