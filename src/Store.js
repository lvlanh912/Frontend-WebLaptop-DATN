import {createStore} from 'vuex'
import createPersistedState from "vuex-persistedstate";
import {GetCart,DeleteMySession} from './modules/home/HomeAPI.js'
import axios from 'axios';
	const store=createStore({
	plugins: [createPersistedState()],
	state(){	//danh sách các biến
	return{
        user:{
			items_checkout:[],
			cartCount:1,
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
		//thêm sản phẩm vào để kiểm tra khi đặt hàng
		SetItemCheckout(state,payload){
			state.user.items_checkout=payload
		},
		Setdata(state,payload){
			state.data=payload
			},
		async SetTotalItemCart(state,cartValue){
			state.user.cartCount= cartValue
		},
		
	 SetLoginUser(state,token){
			state.user.jwtToken='Bearer '+ token
			state.user.isAdmin=false
			axios.defaults.headers.common['Authorization'] =state.user.jwtToken;
			
			
		},
		SetLoginAdmin(state,token){
			state.user.jwtToken='Bearer '+ token
			state.user.isAdmin=true
			axios.defaults.headers.common['Authorization'] = state.user.jwtToken;
		},
		Logout(state){
			console.log('đăng xuất')
			state.user.jwtToken=null
			state.user.isAdmin=false
			axios.defaults.headers.common['Authorization'] = '';
			state.user.cartCount=null
		}
		},
	actions:{		//dùng để tương tác với mutations
		fetch({commit},{pram2}){	
				commit("Setdata",payload)		//thực hiện commit lên theo cú pháp: commit("tên hàm",data gửi vào)
				},
		SetLoginAdmin({commit},token){
			commit("SetLoginAdmin",token)
		},
		async SetLoginUser ({commit},token){
			commit("SetLoginUser",token)
			let cart=await GetCart()
			commit("SetTotalItemCart",cart.items.length)
		},
	 	Logout({commit}){
			 DeleteMySession()
			commit("Logout")
		},
		async UpdateTotalCart({commit}){
			let cart=await GetCart()
			commit("SetTotalItemCart",cart.items.length)
		},
		SetItemCheckout({commit},items){
			commit("SetItemCheckout",items)
		}
	}
	});
	export default store;