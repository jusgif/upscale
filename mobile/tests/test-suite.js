function runUpscaylMobileTests(){
 const tests=[];
 const check=(name,ok,detail="")=>tests.push({name,passed:!!ok,error:ok?null:(detail||"check failed")});
 const selectors=["#file","#preview","#modelStatus","#prepare","#scale","#quality","#go","#progress","#bar","#status","#result","#save"];
 for(const s of selectors)check("Required UI element "+s,!!document.querySelector(s));
 check("Page title is Upscayl Mobile",document.title==="Upscayl Mobile",document.title);
 check("English document language",document.documentElement.lang==="en");
 check("PWA manifest linked",!!document.querySelector('link[rel="manifest"][href="./manifest.webmanifest"]'));
 check("Service worker registration present",document.documentElement.innerHTML.includes("serviceWorker"));
 check("Real-ESRGAN ONNX model configured",document.documentElement.innerHTML.includes("skillsafe-ai/realesrgan-x4plus/resolve/main/model.onnx"));
 check("ONNX Runtime Web configured",document.documentElement.innerHTML.includes("onnxruntime-web@"));
 check("API key UI removed",!document.querySelector("#key")&&!document.documentElement.innerHTML.includes("api.upscayl.org"));
 check("No cloud task endpoints",!document.documentElement.innerHTML.includes("/start-task")&&!document.documentElement.innerHTML.includes("/get-task-status"));
 check("Image input accepts images",document.querySelector("#file")?.accept==="image/*");
 check("Output scales 2x 3x 4x",["2","3","4"].every(v=>Array.from(document.querySelector("#scale").options).some(o=>o.value===v)));
 check("Upscale button disabled before selection/model",document.querySelector("#go").disabled);
 check("Progress initially hidden",getComputedStyle(document.querySelector("#progress")).display==="none");
 check("Result image initially hidden",getComputedStyle(document.querySelector("#result")).display==="none");
 const failures=tests.filter(t=>!t.passed);
 return {passed:tests.length-failures.length,total:tests.length,passRate:Number(((tests.length-failures.length)/tests.length*100).toFixed(1)),failures,results:{static:tests}};
}
window.runUpscaylMobileTests=runUpscaylMobileTests;
