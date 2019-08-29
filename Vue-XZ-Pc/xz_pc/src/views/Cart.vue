<template>
 <div id="main" class="container">
         	<div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-transparent border-bottom box-shadow">
         		<h5 class="font-weight-bold mr-md-auto">购物车</h5>
         		<nav class="my-2 my-md-0 mr-md-3">
         			<span class="p-2 text-dark small">已选</span>
         			<span class="p-2 text-primary font-weight-bold">{{allCount}}</span>
         			<span class="p-2 text-dark small">件商品 合计(不计运费)</span>
         			<span class="p-2 text-primary font-weight-bold">¥{{total.toFixed(2)}}</span>
         		</nav>
            </div>
            
            <table id="table" class="table bg-transparent">
            	<thead>
            		<tr class="small text-muted text-center">
            			<th class="text-left">
            				<img src="img/cart/product_normal.png"/>
            				<span class="btn btn-sm text-muted pl-1">全选</span>
            			</th>
            			<th class="align-middle py-1 my_width">商品</th>
            			<th class="align-middle py-1">单价(元)</th>
            			<th class="align-middle py-1">数量</th>
            			<th class="align-middle py-1">金额</th>
            			<th class="align-middle py-1">操作</th>
            		</tr>
            	</thead>
            </table>
         	
         	<div class="container">
         		<div class="row bg-white mb-3" v-for="c in cartProducts">
         			<div class="col-md-1 text-center border">
         				<img src="img/cart/product_true.png" alt="" :data-iid="c.iid" class="mt-5"/>
         			</div>
         			<div class="col-md-5 border text-left">
         				<div class="row">
         					<div class="col-md-2 ">
         						<a href="product_details.html?lid=19">
         					    <img :src="c.sm" class="mt-3"/>
         						</a>
         					</div>
         					<div class="col-md-10">
         						<a href="product_details.html?lid=19" class="text-dark my_font-small">{{c.title}}
         						</a>
         						<div>
         							{{c.spec}}
         						</div>
         					</div>
         				</div>
         			</div>
         			<div class="col-md-2 text-center">
         				<h6 class=" text-primary mt-4">阿甲专享价</h6>
         				<p>&yen;{{c.price}}</p>
         			</div>
         			<div class="col-md-1 border text-center px-0 py-4">
         				<button class="btn btn-secondary btn-sm">-</button>
         				<input type="text" :value="c.count" class="w-25 text-center"/>
         				<button class="btn btn-secondary btn-sm">+</button>
         			</div>
         			<div class="col-md-2 text-center py-4">
         				<span>&yen;{{(c.price*c.count).toFixed(2)}}</span>
         			</div>
         			<div class="col-md-1 text-left py-4 ">
         				<a href="#" data-iid="33" class="btn btn-sm">删除</a>
         			</div>
         		</div>
         	</div>
         	
     <div id="cart-footer" class="d-flex flex-column flex-md-row align-items-center pl-2 pr-0 my-3 border-bottom box-shadow">
      <span class="my-0 mr-md-auto small">
        <img src="img/cart/product_normal.png" alt=""><span class="btn btn-sm text-muted pl-1">全选</span> 
        <a class="btn btn-sm btn-link text-muted" href="#">删除</a>
        <a class="btn btn-sm btn-secondary" href="#">清空失效商品</a>
      </span>
      <nav class="my-2 my-md-0 mr-md-3">
        <span class="p-2 text-dark small">已选</span>
        <span class="p-2 text-primary font-weight-bold">{{allCount}}</span>
        <span class="p-2 text-dark small">件商品 合计(不计运费)：</span>
        <span class="p-2 text-primary font-weight-bold">¥{{total.toFixed(2)}}</span>
      </nav>
      <a class="btn btn-primary px-5" href="#">去结算</a>
    </div>
    <!-- Modal -->
    <div class="modal" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body pt-5 pl-5">
            <p id="alertMsg_info"> <img style="height:50px;" src="img/register/tan.png" alt=""><span class="ml-5 pl-5">您尚未登录！</span></p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-warning text-white" onclick="javascript:location.href='login.html'">确定</button>
          </div>
        </div>
      </div>
    </div>
   </div>
</template>

<script>
	export default{
		data:function(){
			return {
			   total:0,
			   cartProducts:[],
			   allCount:0
			}
		},
		mounted(){
	    	  this.axios.get('http://localhost:3000/cartItems').then(res=>{
			  this.total=0;
              this.cartProducts=res.data;
              console.log(this.cartProducts);
              for(var item of this.cartProducts){
                  var price=parseInt(item.price);
                  var count=parseInt(item.count);
                  this.total += price*count;
                  this.allCount+=count;
              }
		})
		}
	}
</script>

<style>
.my_width{width:28%;}
</style>