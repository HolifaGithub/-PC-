<template>
	<div class="container">
  <header id="header">
  	<nav class="navbar navbar-light  ">
      <router-link class="navbar-brand" to="/">
        <img src="img/header/logo.png" alt="">
      </router-link>
      <div class="form-inline  w-50">
          <input type="text" class="form-control p-0 w-75 ml-5 py-1 mt-3" placeholder="请输入你要搜索的内容" aria-label="Recipient's username" aria-describedby="basic-addon2" v-model="kw" @keyup.13="search" >
          <div class="input-group-append h-25 mt-3">
            <img class="btn p-0" @click="search" src="img/header/search.png">
          </div>
        </div>
      <nav id="signout" class="mt-2 mr-md-2 small ml-0" v-if="!islogin">
        <a class="p-1 text-muted" href="register.html">注册</a>
        <b class="p-1 text-muted" >|</b>
        <a class="p-1 text-muted" @click.prevent="login" href="#">登录</a>
      </nav>
      <nav id="signin" class="mt-2 mr-md-3 small mr-5" v-else="">
        <a class="p-1" href="#" title="我的收藏">
          <img src="img/header/care.png">
        </a>
        <b class="p-1">|</b>
        <a class="p-1" href="#" title="我的订单">
          <img src="img/header/order.png">
        </a>
        <b class="p-1">|</b>
        <a class="p-1" href="cart.html" title="我的购物车">
          <img src="img/header/shop_car.png" alt="">
        </a>
        <a class="p-1 text-muted" href="#">Welcome <span id="uname">{{uname}}</span></a>
        <a class="p-1 text-muted" @click.prevent="signout" href="javascript:;">注销</a>
      </nav>
    </nav>
    <ul class="nav nav-pills">
      <li class="nav-item">
        <a class="nav-link text-muted active" href="index.html">首页</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-muted" href="#">学习用品</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-muted" href="#">私人定制</a>
      </li>
    </ul>
  </header>
 </div>
</template>

<script>
  export default {
  	data:function(){
  		return {
  			kw:'',
  			islogin:false,
  			uname:''
  		}
  	},
  	methods:{
  		search(){
  			 this.$router.push('/products/'+this.kw);
  			 location.reload();
  		},
  		login(){
  			var path=this.$route.path;
  			if(path=='/')
  			 path="/index";
  			this.$router.push('/login/'+encodeURIComponent(path.slice(1)));
  		},
  		judgeLogin(){
  			this.axios.get('http://localhost:3000/users/islogin').then(res=>{
  			if(res.data.ok==0)
  			   this.islogin=false;
  			else 
  			   this.islogin=true;
  			   this.uname=res.data.uname;
  		})
  		},
  		signout(){
  			this.axios.get('http://localhost:3000/users/signout');
  			location.reload();
  		}
  	},
  	mounted(){
       this.judgeLogin();
  	} 	
  }
</script>

<style scoped>
/*定制搜索框的大小*/
#header>.navbar>.form-inline>.input-group>input{
  width:300px;
}
/*定制主导航当前导航项的字体颜色*/
#header>.nav .nav-link.active,
#header>.nav .nav-link:hover{
  background:none;
  font-weight:bold;
}
</style>