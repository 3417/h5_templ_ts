
// 全局动态引入图片方法
export const getImageUrl = (url:string):string=>{
    return new URL(`../assets/imgs/${url}`,import.meta.url).href;
}