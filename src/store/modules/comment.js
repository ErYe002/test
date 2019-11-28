import { COMMENT_ADD_COMMENTEDID, COMMENT_CLEAR_COMMENTEDID} from '@/store/mutations-type'

const state = {
    commentedId:''
}

const mutations = {
    [COMMENT_ADD_COMMENTEDID](state,id){
        state.commentedId=id;
    },
    [COMMENT_CLEAR_COMMENTEDID](state){
        state.commentedId='';
    }
}

const actions = {
    setCommentedId({commit},id){
        commit(COMMENT_ADD_COMMENTEDID,id);
    },
    clearCommentedId({commit}){
        commit(COMMENT_CLEAR_COMMENTEDID);
    }
}
export default {
    state,
    mutations,
    actions
}

