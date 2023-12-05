"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[1485],{"./node_modules/@chakra-ui/popover/dist/chunk-3O5UWOX6.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{x:()=>PopoverTrigger});var _chunk_FOAN3JQV_mjs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@chakra-ui/popover/dist/chunk-FOAN3JQV.mjs"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js");function PopoverTrigger(props){const child=react__WEBPACK_IMPORTED_MODULE_0__.Children.only(props.children),{getTriggerProps}=(0,_chunk_FOAN3JQV_mjs__WEBPACK_IMPORTED_MODULE_1__.lp)();return(0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(child,getTriggerProps(child.props,child.ref))}PopoverTrigger.displayName="PopoverTrigger"},"./node_modules/@chakra-ui/popover/dist/chunk-4OGHDZEB.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{J:()=>Popover});var react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),dist=__webpack_require__("./node_modules/@chakra-ui/react-use-event-listener/dist/index.mjs"),chunk_3XANSPY5=__webpack_require__("./node_modules/@chakra-ui/dom-utils/dist/chunk-3XANSPY5.mjs");var isDom=()=>"undefined"!=typeof window;var pt=v=>isDom()&&v.test(function getPlatform(){var _a;const agent=navigator.userAgentData;return null!=(_a=null==agent?void 0:agent.platform)?_a:navigator.platform}()),isSafari=()=>{return pt(/mac|iphone|ipad|ipod/i)&&(v=/apple/i,isDom()&&v.test(navigator.vendor));var v};var chunk_ROURZMX4=__webpack_require__("./node_modules/@chakra-ui/dom-utils/dist/chunk-ROURZMX4.mjs"),dom_utils_dist=__webpack_require__("./node_modules/@chakra-ui/dom-utils/dist/index.mjs"),react_use_safe_layout_effect_dist=__webpack_require__("./node_modules/@chakra-ui/react-use-safe-layout-effect/dist/index.mjs"),react_use_update_effect_dist=__webpack_require__("./node_modules/@chakra-ui/react-use-update-effect/dist/index.mjs");function useFocusOnHide(containerRef,options){const{shouldFocus:shouldFocusProp,visible,focusRef}=options,shouldFocus=shouldFocusProp&&!visible;(0,react_use_update_effect_dist.r)((()=>{if(!shouldFocus)return;if(function preventReturnFocus(containerRef){const el=containerRef.current;if(!el)return!1;const activeElement=(0,chunk_3XANSPY5.vY)(el);return!!activeElement&&!el.contains(activeElement)&&!!(0,chunk_ROURZMX4.Wq)(activeElement)}(containerRef))return;const el=(null==focusRef?void 0:focusRef.current)||containerRef.current;let rafId;return el?(rafId=requestAnimationFrame((()=>{el.focus({preventScroll:!0})})),()=>{cancelAnimationFrame(rafId)}):void 0}),[shouldFocus,containerRef,focusRef])}var defaultOptions={preventScroll:!0,shouldFocus:!1};var react_use_disclosure_dist=__webpack_require__("./node_modules/@chakra-ui/react-use-disclosure/dist/index.mjs"),chunk_7PJKT2BG=__webpack_require__("./node_modules/@chakra-ui/popper/dist/chunk-7PJKT2BG.mjs"),chunk_WRZEGNKC=__webpack_require__("./node_modules/@chakra-ui/popper/dist/chunk-WRZEGNKC.mjs"),react_use_merge_refs_dist=__webpack_require__("./node_modules/@chakra-ui/react-use-merge-refs/dist/index.mjs"),shared_utils_dist=__webpack_require__("./node_modules/@chakra-ui/shared-utils/dist/index.mjs");var TRIGGER={click:"click",hover:"hover"};function usePopover(props={}){const{closeOnBlur=!0,closeOnEsc=!0,initialFocusRef,id,returnFocusOnClose=!0,autoFocus=!0,arrowSize,arrowShadowColor,trigger=TRIGGER.click,openDelay=200,closeDelay=200,isLazy,lazyBehavior="unmount",computePositionOnMount,...popperProps}=props,{isOpen,onClose,onOpen,onToggle}=(0,react_use_disclosure_dist.q)(props),anchorRef=(0,react.useRef)(null),triggerRef=(0,react.useRef)(null),popoverRef=(0,react.useRef)(null),isHoveringRef=(0,react.useRef)(!1),hasBeenOpened=(0,react.useRef)(!1);isOpen&&(hasBeenOpened.current=!0);const[hasHeader,setHasHeader]=(0,react.useState)(!1),[hasBody,setHasBody]=(0,react.useState)(!1),uuid=(0,react.useId)(),uid=null!=id?id:uuid,[triggerId,popoverId,headerId,bodyId]=["popover-trigger","popover-content","popover-header","popover-body"].map((id2=>`${id2}-${uid}`)),{referenceRef,getArrowProps,getPopperProps,getArrowInnerProps,forceUpdate}=(0,chunk_7PJKT2BG.D)({...popperProps,enabled:isOpen||!!computePositionOnMount}),animated=function useAnimationState(props){const{isOpen,ref}=props,[mounted,setMounted]=(0,react.useState)(isOpen),[once,setOnce]=(0,react.useState)(!1);return(0,react.useEffect)((()=>{once||(setMounted(isOpen),setOnce(!0))}),[isOpen,once,mounted]),(0,dist.O)((()=>ref.current),"animationend",(()=>{setMounted(isOpen)})),{present:!(!isOpen&&!mounted),onComplete(){var _a;const evt=new((0,chunk_3XANSPY5.kR)(ref.current).CustomEvent)("animationend",{bubbles:!0});null==(_a=ref.current)||_a.dispatchEvent(evt)}}}({isOpen,ref:popoverRef});!function useFocusOnPointerDown(props){const{ref,elements,enabled}=props,doc=()=>{var _a,_b;return null!=(_b=null==(_a=ref.current)?void 0:_a.ownerDocument)?_b:document};(0,dist.O)(doc,"pointerdown",(event=>{if(!isSafari()||!enabled)return;const target=event.target,isValidTarget=(null!=elements?elements:[ref]).some((elementOrRef=>{const el=function isRefObject(val){return"current"in val}(elementOrRef)?elementOrRef.current:elementOrRef;return(null==el?void 0:el.contains(target))||el===target}));doc().activeElement!==target&&isValidTarget&&(event.preventDefault(),target.focus())}))}({enabled:isOpen,ref:triggerRef}),useFocusOnHide(popoverRef,{focusRef:triggerRef,visible:isOpen,shouldFocus:returnFocusOnClose&&trigger===TRIGGER.click}),function useFocusOnShow(target,options=defaultOptions){const{focusRef,preventScroll,shouldFocus,visible}=options,element=function dist_isRefObject(val){return"current"in val}(target)?target.current:target,autoFocusValue=shouldFocus&&visible,autoFocusRef=(0,react.useRef)(autoFocusValue),lastVisibleRef=(0,react.useRef)(visible);(0,react_use_safe_layout_effect_dist.G)((()=>{!lastVisibleRef.current&&visible&&(autoFocusRef.current=autoFocusValue),lastVisibleRef.current=visible}),[visible,autoFocusValue]);const onFocus=(0,react.useCallback)((()=>{if(visible&&element&&autoFocusRef.current&&(autoFocusRef.current=!1,!element.contains(document.activeElement)))if(null==focusRef?void 0:focusRef.current)requestAnimationFrame((()=>{var _a;null==(_a=focusRef.current)||_a.focus({preventScroll})}));else{const tabbableEls=(0,dom_utils_dist.t5)(element);tabbableEls.length>0&&requestAnimationFrame((()=>{tabbableEls[0].focus({preventScroll})}))}}),[visible,preventScroll,element,focusRef]);(0,react_use_update_effect_dist.r)((()=>{onFocus()}),[onFocus]),(0,dist.O)(element,"transitionend",onFocus)}(popoverRef,{focusRef:initialFocusRef,visible:isOpen,shouldFocus:autoFocus&&trigger===TRIGGER.click});const shouldRenderChildren=function lazyDisclosure(options){const{wasSelected,enabled,isSelected,mode="unmount"}=options;return!enabled||!!isSelected||!("keepMounted"!==mode||!wasSelected)}({wasSelected:hasBeenOpened.current,enabled:isLazy,mode:lazyBehavior,isSelected:animated.present}),getPopoverProps=(0,react.useCallback)(((props2={},_ref=null)=>{const popoverProps={...props2,style:{...props2.style,transformOrigin:chunk_WRZEGNKC.Dq.transformOrigin.varRef,[chunk_WRZEGNKC.Dq.arrowSize.var]:arrowSize?`${arrowSize}px`:void 0,[chunk_WRZEGNKC.Dq.arrowShadowColor.var]:arrowShadowColor},ref:(0,react_use_merge_refs_dist.lq)(popoverRef,_ref),children:shouldRenderChildren?props2.children:null,id:popoverId,tabIndex:-1,role:"dialog",onKeyDown:(0,shared_utils_dist.v0)(props2.onKeyDown,(event=>{closeOnEsc&&"Escape"===event.key&&onClose()})),onBlur:(0,shared_utils_dist.v0)(props2.onBlur,(event=>{const relatedTarget=getRelatedTarget(event),targetIsPopover=contains(popoverRef.current,relatedTarget),targetIsTrigger=contains(triggerRef.current,relatedTarget);isOpen&&closeOnBlur&&(!targetIsPopover&&!targetIsTrigger)&&onClose()})),"aria-labelledby":hasHeader?headerId:void 0,"aria-describedby":hasBody?bodyId:void 0};return trigger===TRIGGER.hover&&(popoverProps.role="tooltip",popoverProps.onMouseEnter=(0,shared_utils_dist.v0)(props2.onMouseEnter,(()=>{isHoveringRef.current=!0})),popoverProps.onMouseLeave=(0,shared_utils_dist.v0)(props2.onMouseLeave,(event=>{null!==event.nativeEvent.relatedTarget&&(isHoveringRef.current=!1,setTimeout((()=>onClose()),closeDelay))}))),popoverProps}),[shouldRenderChildren,popoverId,hasHeader,headerId,hasBody,bodyId,trigger,closeOnEsc,onClose,isOpen,closeOnBlur,closeDelay,arrowShadowColor,arrowSize]),getPopoverPositionerProps=(0,react.useCallback)(((props2={},forwardedRef=null)=>getPopperProps({...props2,style:{visibility:isOpen?"visible":"hidden",...props2.style}},forwardedRef)),[isOpen,getPopperProps]),getAnchorProps=(0,react.useCallback)(((props2,_ref=null)=>({...props2,ref:(0,react_use_merge_refs_dist.lq)(_ref,anchorRef,referenceRef)})),[anchorRef,referenceRef]),openTimeout=(0,react.useRef)(),closeTimeout=(0,react.useRef)(),maybeReferenceRef=(0,react.useCallback)((node=>{null==anchorRef.current&&referenceRef(node)}),[referenceRef]),getTriggerProps=(0,react.useCallback)(((props2={},_ref=null)=>{const triggerProps={...props2,ref:(0,react_use_merge_refs_dist.lq)(triggerRef,_ref,maybeReferenceRef),id:triggerId,"aria-haspopup":"dialog","aria-expanded":isOpen,"aria-controls":popoverId};return trigger===TRIGGER.click&&(triggerProps.onClick=(0,shared_utils_dist.v0)(props2.onClick,onToggle)),trigger===TRIGGER.hover&&(triggerProps.onFocus=(0,shared_utils_dist.v0)(props2.onFocus,(()=>{void 0===openTimeout.current&&onOpen()})),triggerProps.onBlur=(0,shared_utils_dist.v0)(props2.onBlur,(event=>{const relatedTarget=getRelatedTarget(event),isValidBlur=!contains(popoverRef.current,relatedTarget);isOpen&&closeOnBlur&&isValidBlur&&onClose()})),triggerProps.onKeyDown=(0,shared_utils_dist.v0)(props2.onKeyDown,(event=>{"Escape"===event.key&&onClose()})),triggerProps.onMouseEnter=(0,shared_utils_dist.v0)(props2.onMouseEnter,(()=>{isHoveringRef.current=!0,openTimeout.current=window.setTimeout((()=>onOpen()),openDelay)})),triggerProps.onMouseLeave=(0,shared_utils_dist.v0)(props2.onMouseLeave,(()=>{isHoveringRef.current=!1,openTimeout.current&&(clearTimeout(openTimeout.current),openTimeout.current=void 0),closeTimeout.current=window.setTimeout((()=>{!1===isHoveringRef.current&&onClose()}),closeDelay)}))),triggerProps}),[triggerId,isOpen,popoverId,trigger,maybeReferenceRef,onToggle,onOpen,closeOnBlur,onClose,openDelay,closeDelay]);(0,react.useEffect)((()=>()=>{openTimeout.current&&clearTimeout(openTimeout.current),closeTimeout.current&&clearTimeout(closeTimeout.current)}),[]);const getHeaderProps=(0,react.useCallback)(((props2={},ref=null)=>({...props2,id:headerId,ref:(0,react_use_merge_refs_dist.lq)(ref,(node=>{setHasHeader(!!node)}))})),[headerId]),getBodyProps=(0,react.useCallback)(((props2={},ref=null)=>({...props2,id:bodyId,ref:(0,react_use_merge_refs_dist.lq)(ref,(node=>{setHasBody(!!node)}))})),[bodyId]);return{forceUpdate,isOpen,onAnimationComplete:animated.onComplete,onClose,getAnchorProps,getArrowProps,getArrowInnerProps,getPopoverPositionerProps,getPopoverProps,getTriggerProps,getHeaderProps,getBodyProps}}function contains(parent,child){return parent===child||(null==parent?void 0:parent.contains(child))}function getRelatedTarget(event){var _a;const activeEl=event.currentTarget.ownerDocument.activeElement;return null!=(_a=event.relatedTarget)?_a:activeEl}var chunk_FOAN3JQV=__webpack_require__("./node_modules/@chakra-ui/popover/dist/chunk-FOAN3JQV.mjs"),chunk_T2VHL7RE=__webpack_require__("./node_modules/@chakra-ui/system/dist/chunk-T2VHL7RE.mjs"),styled_system_dist=__webpack_require__("./node_modules/@chakra-ui/styled-system/dist/index.mjs"),chunk_NLMMK76H=__webpack_require__("./node_modules/@chakra-ui/system/dist/chunk-NLMMK76H.mjs"),jsx_runtime=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js");function Popover(props){const styles=(0,chunk_T2VHL7RE.jC)("Popover",props),{children,...rest}=(0,styled_system_dist.Lr)(props),context=usePopover({...rest,direction:(0,chunk_NLMMK76H.F)().direction});return(0,jsx_runtime.jsx)(chunk_FOAN3JQV.H2,{value:context,children:(0,jsx_runtime.jsx)(chunk_FOAN3JQV.WG,{value:styles,children:(0,shared_utils_dist.Pu)(children,{isOpen:context.isOpen,onClose:context.onClose,forceUpdate:context.forceUpdate})})})}Popover.displayName="Popover"},"./node_modules/@chakra-ui/popover/dist/chunk-6YK4VVQO.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Q:()=>PopoverArrow});var _chunk_FOAN3JQV_mjs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@chakra-ui/popover/dist/chunk-FOAN3JQV.mjs"),_chakra_ui_system__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@chakra-ui/system/dist/chunk-3LE6AY5Q.mjs"),_chakra_ui_shared_utils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@chakra-ui/shared-utils/dist/index.mjs"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),resolveVar=(scale,value)=>value?`${scale}.${value}, ${value}`:void 0;function PopoverArrow(props){var _a;const{bg,bgColor,backgroundColor,shadow,boxShadow,shadowColor}=props,{getArrowProps,getArrowInnerProps}=(0,_chunk_FOAN3JQV_mjs__WEBPACK_IMPORTED_MODULE_1__.lp)(),styles=(0,_chunk_FOAN3JQV_mjs__WEBPACK_IMPORTED_MODULE_1__.SV)(),arrowBg=null!=(_a=null!=bg?bg:bgColor)?_a:backgroundColor,arrowShadow=null!=shadow?shadow:boxShadow;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_chakra_ui_system__WEBPACK_IMPORTED_MODULE_2__.m.div,{...getArrowProps(),className:"chakra-popover__arrow-positioner",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_chakra_ui_system__WEBPACK_IMPORTED_MODULE_2__.m.div,{className:(0,_chakra_ui_shared_utils__WEBPACK_IMPORTED_MODULE_3__.cx)("chakra-popover__arrow",props.className),...getArrowInnerProps(props),__css:{"--popper-arrow-shadow-color":resolveVar("colors",shadowColor),"--popper-arrow-bg":resolveVar("colors",arrowBg),"--popper-arrow-shadow":resolveVar("shadows",arrowShadow),...styles.arrow}})})}PopoverArrow.displayName="PopoverArrow"},"./node_modules/@chakra-ui/popover/dist/chunk-FOAN3JQV.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{H2:()=>PopoverProvider,SV:()=>usePopoverStyles,WG:()=>PopoverStylesProvider,lp:()=>usePopoverContext});var _chakra_ui_react_context__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@chakra-ui/react-context/dist/index.mjs"),[PopoverProvider,usePopoverContext]=(0,_chakra_ui_react_context__WEBPACK_IMPORTED_MODULE_0__.k)({name:"PopoverContext",errorMessage:"usePopoverContext: `context` is undefined. Seems you forgot to wrap all popover components within `<Popover />`"}),[PopoverStylesProvider,usePopoverStyles]=(0,_chakra_ui_react_context__WEBPACK_IMPORTED_MODULE_0__.k)({name:"PopoverStylesContext",errorMessage:"usePopoverStyles returned is 'undefined'. Seems you forgot to wrap the components in \"<Popover />\" "})},"./node_modules/@chakra-ui/popover/dist/chunk-KVBLLJMP.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{y:()=>PopoverContent});var chunk_FOAN3JQV=__webpack_require__("./node_modules/@chakra-ui/popover/dist/chunk-FOAN3JQV.mjs"),chunk_3LE6AY5Q=__webpack_require__("./node_modules/@chakra-ui/system/dist/chunk-3LE6AY5Q.mjs"),chunk_QEVFQ4EU=__webpack_require__("./node_modules/@chakra-ui/system/dist/chunk-QEVFQ4EU.mjs"),motion=__webpack_require__("./node_modules/framer-motion/dist/es/render/dom/motion.mjs"),jsx_runtime=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js");function mergeVariants(variants){if(variants)return{enter:{...variants.enter,visibility:"visible"},exit:{...variants.exit,transitionEnd:{visibility:"hidden"}}}}var scaleFade={exit:{opacity:0,scale:.95,transition:{duration:.1,ease:[.4,0,1,1]}},enter:{scale:1,opacity:1,transition:{duration:.15,ease:[0,0,.2,1]}}},MotionSection=(0,chunk_3LE6AY5Q.m)(motion.E.section),PopoverTransition=(0,chunk_QEVFQ4EU.G)((function PopoverTransition2(props,ref){const{variants=scaleFade,...rest}=props,{isOpen}=(0,chunk_FOAN3JQV.lp)();return(0,jsx_runtime.jsx)(MotionSection,{ref,variants:mergeVariants(variants),initial:!1,animate:isOpen?"enter":"exit",...rest})}));PopoverTransition.displayName="PopoverTransition";var dist=__webpack_require__("./node_modules/@chakra-ui/shared-utils/dist/index.mjs"),PopoverContent=(0,chunk_QEVFQ4EU.G)((function PopoverContent2(props,ref){const{rootProps,motionProps,...contentProps}=props,{getPopoverProps,getPopoverPositionerProps,onAnimationComplete}=(0,chunk_FOAN3JQV.lp)(),styles=(0,chunk_FOAN3JQV.SV)(),contentStyles={position:"relative",display:"flex",flexDirection:"column",...styles.content};return(0,jsx_runtime.jsx)(chunk_3LE6AY5Q.m.div,{...getPopoverPositionerProps(rootProps),__css:styles.popper,className:"chakra-popover__popper",children:(0,jsx_runtime.jsx)(PopoverTransition,{...motionProps,...getPopoverProps(contentProps,ref),onAnimationComplete:(0,dist.PP)(onAnimationComplete,contentProps.onAnimationComplete),className:(0,dist.cx)("chakra-popover__content",props.className),__css:contentStyles})})}));PopoverContent.displayName="PopoverContent"}}]);