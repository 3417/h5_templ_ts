// import vshow3 from "../components/layer/index";
const provideCpms:any = {
    // vshow3
}
/**
 * provide 方式注册需要使用 inject方式获取
 * eg:
 *  app.provide('name',cps);
 *  const cps = inject('name');
 *  
 * */ 
export default (app:any) =>{
    Object.keys(provideCpms).forEach(cps=>{
        app.provide(cps,provideCpms[cps])
    })
}