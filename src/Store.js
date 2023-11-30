import {createStore} from 'vuex'
import createPersistedState from "vuex-persistedstate";
	const store=createStore({
	plugins: [createPersistedState()],
	state(){	//danh sách các biến
	return{
        user:{
			jwtToken:null,
			isAdmin:false
		},
		count:0,
		data:null
		};
	},
	mutations:{		//danh sách các hàm
		increment(state){
			state.count++;
			},
		Setdata(state,payload){
			state.data=payload
			},
		SetLoginUser(state,token){
			state.user.jwtToken=token
			state.user.isAdmin=false
			
		},
		SetLoginAdmin(state,token){
			state.user.jwtToken=token
			state.user.isAdmin=true
		}
		},
	actions:{		//dùng để tương tác với mutations
		fetch({commit},{pram2}){	
				commit("Setdata",payload)		//thực hiện commit lên theo cú pháp: commit("tên hàm",data gửi vào)
				},
		SetLoginAdmin({commit}){
			commit("SetLoginAdmin",islogin)
		},
		SetLoginUser({commit},token){
			commit("SetLoginUser",token)
		},
	}
	});

	export default store;