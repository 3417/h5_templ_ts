import {Button} from 'vant';
import 'vant/es/toast/style';
export default (app:any) =>{
    app.use(Button)
}

/**
 * vant需要手动引入的组件
 * 
 * 
 // Toast
import { showToast } from 'vant';
import 'vant/es/toast/style';

// Dialog
import { showDialog } from 'vant';
import 'vant/es/dialog/style';

// Notify
import { showNotify } from 'vant';
import 'vant/es/notify/style';

// ImagePreview
import { showImagePreview } from 'vant';
import 'vant/es/image-preview/style';
 * 
 * 
 * 
 * 
 * */ 