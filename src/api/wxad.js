import http from '@/utils/request.js';

const api = {
  //获取access_token以及user_action_set_id
  getAccountToken() {
    return http.getByNoLoading('Wechart/WeChatOfficialAccountToken');
  },
  //回传行为参数
  wxadCallbckData(
    access_token,
    WebUserActionSetId,
    url,
    click_id,
    amount,
    action_type
  ) {
    let data = { 
            "user_action_set_id": WebUserActionSetId,
            "actions":[
                {
                    "url":"http://www.qq.com/"+url,
                    "action_type":action_type,
                    "trace":{
                        "click_id":"『"+click_id+"』"
                    },
                    "action_param":{
                        "value": amount,
                    }
                }
            ]
        }
    if(action_type=="CONFIRM_EFFECTIVE_LEADS"){//新用户注册次数回传数据
        data = { 
            "user_action_set_id": WebUserActionSetId,
            "actions":[
                {
                    "url":"http://www.qq.com/"+url,
                    "action_type":action_type,
                    "trace":{
                        "click_id":"『"+click_id+"』"
                    },
                    "action_param":{
                        "leads_type": "RESERVE"
                    }
                }
            ]
        }
    }

    return http.postByNoErrorTips(
      `https://api.weixin.qq.com/marketing/user_actions/add?version=v1.0&access_token=${access_token}`,
      data,
      {
        'content-type': 'application/json'
      }
    );
  }
};
export default api;