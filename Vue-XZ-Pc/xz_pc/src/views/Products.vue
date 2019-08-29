<template>
<main id="main" class="container">
    <div class="pb-2 text-center">
      <img class="d-block mx-auto mb-4 w-100" src="img/index/index_guild.png">
    </div>
    <div class="row">
      <div class="col-md-9">
        <h5 class="mb-3 p-2 text-muted">笔记本电脑</h5>
        <div id="plist" class="row bg-white ml-1 mr-1 pt-2 pl-2">
          <div class="col-md-4 p-1" v-for="p in res.data">
            <div class="card mb-4 box-shadow pr-2 pl-2">
              <router-link :to="`/details/${p.lid}`">
                <img class="card-img-top" :src="p.md">
              </router-link>
              <div class="card-body p-0">
                <h5 class="text-primary">￥{{p.price.toFixed(2)}}</h5>
                <p class="card-text">
                  <router-link :to="`/details/${p.lid}`" class="text-muted small" :title="`${p.title}`">{{p.title}}</router-link>
                </p>
                <div class="d-flex justify-content-between align-items-center p-2 pt-0">
                  <xz-counter @task="getNum"></xz-counter>
                  <a class="btn btn-primary float-right ml-1 pl-1 pr-1" href="#"
                  	@click.prevent="addCart(p.lid)">加入购物车</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h6 class="mb-3 p-2 text-muted small">
          <nav aria-label="Page navigation example">
            <ul class="pagination mb-0 justify-content-end">
              <li :class="`page-item ${toPrevIsAble?'':'disabled'}`"><a class="page-link bg-transparent" href="#" @click.prevent="toPrevPage">上一页</a></li>
              <li :class="`page-item  ${i-1==parseInt(res.pno)?' bg-light':''}`" v-for="i in res.pageCount"><a class="page-link bg-transparent" href="#" @click.prevent="skip(i-1)">{{i}}</a></li>
              <li :class="`page-item ${toNextIsAble?'':'disabled'}`"><a class="page-link bg-transparent" href="#" @click.prevent="toNextPage">下一页</a></li>
            </ul>
          </nav>
        </h6>
      </div>
      <div class="col-md-3 pl-0">
        <h5 class="justify-content-between align-items-center mb-1 text-muted p-2">
          <img src="img/foodstore/foodstore_icon2.png" alt=""> 商家公告
        </h5>
        <div class="bg-white small p-4 text-muted mb-3">
          <p>本店推出全网最低价套餐，保证比其他平台的价格要低！</p>
          <p>不要葱、姜、蒜等这些忌口暂时无法坐不了，敬请谅解！</p>
          <p>晚上10点以后订餐需另加送餐费2元！谢谢合作！</p>
        </div>
        <ul id="cart" class="list-group mb-3">
        <!-- <ul id="cart" class="list-group mb-3 position-fixed"> -->
          <li class="p-0 list-group-item d-flex justify-content-between lh-condensed">
            <h6 class="w-100 d-flex justify-content-between align-items-center mb-0 text-muted p-2 "> 购物车<a class="btn btn-link text-muted" href="#">清空</a>
            </h6>
          </li>
          <li class="p-0 list-group-item d-flex justify-content-between lh-condensed" v-for="c in cartProducts">
            <div class="input-group input-group-sm mt-1 mb-1">
              <div class="input-group-prepend">
                <span class="input-group-text text-truncate bg-white p-1 border-0 d-inline-block ml-2" :title="c.title">{{c.title}}</span>
                <button class="btn btn-outline-secondary p-0 border-0" type="button"    @click="cartChange(-1,c)">-</button>
              </div>
              <input type="text" class="form-control p-1" aria-label="Small" :value="c.count" aria-describedby="inputGroup-sizing-sm">
              <div class="input-group-append">
                <button class="btn btn-outline-secondary p-0 border-0" type="button" @click="cartChange(+1,c)">+</button>
                <span class="input-group-text bg-white border-0 p-0 pl-1 ml-3">¥{{(c.price*c.count).toFixed(2)}}</span>
              </div>
            </div>
          </li>
          <li class="p-0 list-group-item bg-secondary text-right">
            <img class="mb-2" src="img/foodstore/foodstore_car_2.png" alt="">
            <h4 class="d-inline-block text-white pt-2 m-0">￥{{total.toFixed(2)}}</h4>
            <a class="btn btn-lg btn-primary float-right ml-1 pl-0 pr-0" href="#" @click="goCart">去结算</a>
          </li>
        </ul>
      </div>
  </div>
  </main>
</template>

<script>
	import Num from '@/components/Num.vue'
    export default {
    	data:function(){
    		return {
    			res:{},
    			toPrevIsAble:false,
    			toNextIsAble:true,
    			total:0,
    			cartProducts:[],
    			count:1,
    			isLogin:false
    		}
    	},
    	props:["kw"],
    	mounted(){
    		this.axios.get('http://localhost:3000/products',{
    			params:{
    				kw:this.kw,
    				pno:0
    			}
    		}).then(res=>{
    			this.res=res.data;
    			this.reload();
    		})
    		this.axios.get('http://localhost:3000/users/islogin').then(res=>{
    				if(res.data.ok==1)
    				this.isLogin=true; 
    	})
    	},
    	methods:{
    		addCart(lid){
    			this.axios.get('http://localhost:3000/users/islogin').then(res=>{
    				if(res.data.ok==0){
    					alert("暂未登录，请先登录！");
    					var path=this.$route.path;
			  			if(path=='/')
			  			 path="/index";
			  			this.$router.push('/login/'+encodeURIComponent(path.slice(1)));
    				}
    				else{
    				this.isLogin=true;
                       this.axios.get('http://localhost:3000/cartItems/add',{
                       	params:{
                       		lid:lid,count:this.count
                       	}
                       }).then(res=>{
                       	  this.reload();
                       })
    				}
    				
    			})
    		},
    		reload(){
    			this.axios.get('http://localhost:3000/cartItems').then(res=>{
    				  this.total=0;
                      this.cartProducts=res.data;
                      for(var item of this.cartProducts){
	                      var price=parseInt(item.price);
	                      var count=parseInt(item.count);
	                      this.total += price*count;
                      }
    			})
    		},
            skip(page){
            	this.axios.get('http://localhost:3000/products',{
            		params:{
            			kw:this.kw,
            			pno:page
            		}
            	}).then(res=>{
            		this.res=res.data;
                    if(this.res.pno==0){
                    this.toPrevIsAble=false;
                    this.toNextIsAble=true;
                    }
	                if(this.res.pno==this.res.pageCount-1){
	                	   this.toNextIsAble=false;
	            	       this.toPrevIsAble=true;	
	                }

            	})
            },
              toPrevPage(){
	            this.res.pno--;
	            if(this.res.pno>=0){
	            this.axios.get('http://localhost:3000/products',{
	            		params:{
	            			kw:this.kw,
	            			pno:this.res.pno
	            		}
	            	}).then(res=>{
	            		this.res=res.data;
	            		this.toNextIsAble=true;
	            	})
	            }
	           if(this.res.pno==0)
	            	this.toPrevIsAble=false;
            },
            toNextPage(){
            	this.res.pno++;
	            if(this.res.pno<this.res.pageCount){
	            this.axios.get('http://localhost:3000/products',{
	            		params:{
	            			kw:this.kw,
	            			pno:this.res.pno
	            		}
	            	}).then(res=>{
	            		this.res=res.data;
	            		this.toPrevIsAble=true;
	            	})
	            }
	              if(this.res.pno==this.res.pageCount-1)
	            	this.toNextIsAble=false;
            },
            cartChange(i,c){
            	if(i===-1){
            			c.count--;
            	}
            	else if(i===1){
            		c.count++;
            	}
            	if(c.count===0){
            		confirm("确认删除该商品吗?");
            	}
            	this.axios.get('http://localhost:3000/cartItems/update',{
            		params:{iid:c.iid,count:c.count}
            	}).then(res=>{
            		this.reload();
            	})
            },
            getNum(count){
    		  if(count===undefined)  //如果num为undefined那就说明子组件没点加减
                  this.count=1;
               else 
                  this.count=count;      
            },
            goCart(){
              if(!this.isLogin){
				alert("暂未登录，请先登录！");
				var path=this.$route.path;
				if(path=='/')
				 path="/index";
				this.$router.push('/login/'+encodeURIComponent(path.slice(1)));
				}
              else{
              	this.$router.push('/cart');
              }
            }
    	},
    	components:{
    		'xz-counter':Num
    	}
    }
</script>

<style scoped>
/*定制小购物车部分样式*/
#main>div.row>div>h5, #main>div.row>div>h6, #cart>li:first-child>h6{
  background:linear-gradient(to bottom,#f0f0f0,#e0e0e0);
}
#cart .input-group-text{
  width:90px;
}
#cart input.form-control{
  width:25px!important;
  flex:none;
}
#cart .input-group .btn, #plist button.btn{
  width:20px;
  background:linear-gradient(to bottom,#f0f0f0,#e0e0e0);
}
#cart .input-group-append>.input-group-text{
  width:80px;
}
#cart.position-fixed{
  top:100px; right:100px
}

/*定制商品列表部分的样式*/
/*#plist button.btn{
}*/
#plist input.form-control{
  width:30px;
}
#plist+h6 .page-link{
  border-color:#bbb
}
#plist+h6 .page-link:hover{
  border-color:#007bff;
}
#plist+h6 .page-item.disabled{
  opacity:0.5;
}
</style>