import {createStore} from 'vuex'

	const store=createStore({
	state(){		//danh sách các biến
	return{
        user:{
			islogin:true,
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
		Setlogin(state,payload){

		}
		},
	actions:{		//dùng để tương tác với mutations
		fetch({commit},{pram2}){	
				//code trong này
				//var payload=....
				//
				commit("Setdata",payload)		//thực hiện commit lên theo cú pháp: commit("tên hàm",data gửi vào)
				},
	}
	});

	export default store;