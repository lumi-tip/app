"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[1294],{"./node_modules/@codemirror/legacy-modes/mode/haskell.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function switchState(source,setState,f){return setState(f),f(source,setState)}__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{haskell:()=>haskell});var smallRE=/[a-z_]/,largeRE=/[A-Z]/,digitRE=/\d/,hexitRE=/[0-9A-Fa-f]/,octitRE=/[0-7]/,idRE=/[a-z_A-Z0-9'\xa1-\uffff]/,symbolRE=/[-!#$%&*+.\/<=>?@\\^|~:]/,specialRE=/[(),;[\]`{}]/,whiteCharRE=/[ \t\v\f]/;function normal(source,setState){if(source.eatWhile(whiteCharRE))return null;var ch=source.next();if(specialRE.test(ch)){if("{"==ch&&source.eat("-")){var t="comment";return source.eat("#")&&(t="meta"),switchState(source,setState,ncomment(t,1))}return null}if("'"==ch)return source.eat("\\"),source.next(),source.eat("'")?"string":"error";if('"'==ch)return switchState(source,setState,stringLiteral);if(largeRE.test(ch))return source.eatWhile(idRE),source.eat(".")?"qualifier":"type";if(smallRE.test(ch))return source.eatWhile(idRE),"variable";if(digitRE.test(ch)){if("0"==ch){if(source.eat(/[xX]/))return source.eatWhile(hexitRE),"integer";if(source.eat(/[oO]/))return source.eatWhile(octitRE),"number"}source.eatWhile(digitRE);t="number";return source.match(/^\.\d+/)&&(t="number"),source.eat(/[eE]/)&&(t="number",source.eat(/[-+]/),source.eatWhile(digitRE)),t}return"."==ch&&source.eat(".")?"keyword":symbolRE.test(ch)?"-"==ch&&source.eat(/-/)&&(source.eatWhile(/-/),!source.eat(symbolRE))?(source.skipToEnd(),"comment"):(source.eatWhile(symbolRE),"variable"):"error"}function ncomment(type,nest){return 0==nest?normal:function(source,setState){for(var currNest=nest;!source.eol();){var ch=source.next();if("{"==ch&&source.eat("-"))++currNest;else if("-"==ch&&source.eat("}")&&0==--currNest)return setState(normal),type}return setState(ncomment(type,currNest)),type}}function stringLiteral(source,setState){for(;!source.eol();){var ch=source.next();if('"'==ch)return setState(normal),"string";if("\\"==ch){if(source.eol()||source.eat(whiteCharRE))return setState(stringGap),"string";source.eat("&")||source.next()}}return setState(normal),"error"}function stringGap(source,setState){return source.eat("\\")?switchState(source,setState,stringLiteral):(source.next(),setState(normal),"error")}var wellKnownWords=function(){var wkw={};function setType(t){return function(){for(var i=0;i<arguments.length;i++)wkw[arguments[i]]=t}}return setType("keyword")("case","class","data","default","deriving","do","else","foreign","if","import","in","infix","infixl","infixr","instance","let","module","newtype","of","then","type","where","_"),setType("keyword")("..",":","::","=","\\","<-","->","@","~","=>"),setType("builtin")("!!","$!","$","&&","+","++","-",".","/","/=","<","<*","<=","<$>","<*>","=<<","==",">",">=",">>",">>=","^","^^","||","*","*>","**"),setType("builtin")("Applicative","Bool","Bounded","Char","Double","EQ","Either","Enum","Eq","False","FilePath","Float","Floating","Fractional","Functor","GT","IO","IOError","Int","Integer","Integral","Just","LT","Left","Maybe","Monad","Nothing","Num","Ord","Ordering","Rational","Read","ReadS","Real","RealFloat","RealFrac","Right","Show","ShowS","String","True"),setType("builtin")("abs","acos","acosh","all","and","any","appendFile","asTypeOf","asin","asinh","atan","atan2","atanh","break","catch","ceiling","compare","concat","concatMap","const","cos","cosh","curry","cycle","decodeFloat","div","divMod","drop","dropWhile","either","elem","encodeFloat","enumFrom","enumFromThen","enumFromThenTo","enumFromTo","error","even","exp","exponent","fail","filter","flip","floatDigits","floatRadix","floatRange","floor","fmap","foldl","foldl1","foldr","foldr1","fromEnum","fromInteger","fromIntegral","fromRational","fst","gcd","getChar","getContents","getLine","head","id","init","interact","ioError","isDenormalized","isIEEE","isInfinite","isNaN","isNegativeZero","iterate","last","lcm","length","lex","lines","log","logBase","lookup","map","mapM","mapM_","max","maxBound","maximum","maybe","min","minBound","minimum","mod","negate","not","notElem","null","odd","or","otherwise","pi","pred","print","product","properFraction","pure","putChar","putStr","putStrLn","quot","quotRem","read","readFile","readIO","readList","readLn","readParen","reads","readsPrec","realToFrac","recip","rem","repeat","replicate","return","reverse","round","scaleFloat","scanl","scanl1","scanr","scanr1","seq","sequence","sequence_","show","showChar","showList","showParen","showString","shows","showsPrec","significand","signum","sin","sinh","snd","span","splitAt","sqrt","subtract","succ","sum","tail","take","takeWhile","tan","tanh","toEnum","toInteger","toRational","truncate","uncurry","undefined","unlines","until","unwords","unzip","unzip3","userError","words","writeFile","zip","zip3","zipWith","zipWith3"),wkw}();const haskell={name:"haskell",startState:function(){return{f:normal}},copyState:function(s){return{f:s.f}},token:function(stream,state){var t=state.f(stream,(function(s){state.f=s})),w=stream.current();return wellKnownWords.hasOwnProperty(w)?wellKnownWords[w]:t},languageData:{commentTokens:{line:"--",block:{open:"{-",close:"-}"}}}}}}]);