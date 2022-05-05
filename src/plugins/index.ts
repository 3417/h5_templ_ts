import $popup from "../components/mv_popup/index";
const provideCpm:any = {
    $popup
}

export default (app:any) =>{
    Object.keys(provideCpm).forEach(cps=>{
        app.provide(cps,provideCpm[cps])
    })
}