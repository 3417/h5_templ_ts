// import vshow3 from "../components/layer/index";
const provideCpms:any = {
    // vshow3
}

export default (app:any) =>{
    Object.keys(provideCpms).forEach(cps=>{
        app.provide(cps,provideCpms[cps])
    })
}