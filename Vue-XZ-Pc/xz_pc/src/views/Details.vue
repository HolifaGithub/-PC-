<template>
<main id="main" class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb small bg-transparent">
          <li class="breadcrumb-item"><a class="text-dark font-weight-bold small" href="#">首页</a></li>
          <li class="breadcrumb-item"><a class="text-dark font-weight-bold small" href="#">学习用品</a></li>
          <li class="breadcrumb-item text-dark font-weight-bold small active" aria-current="page">笔记本电脑</li>
        </ol>
      </nav>
      <div class="container mb-5">
        <div class="row pr-3">
          <div id="preview" class="col pr-0">
            <div class="card bg-transparent mr-5 position-absolute">
              <img class="card-img-top" :src="mdSrc" alt="Card image cap" :data-lg="lgSrc">
              <div id="mask" :class="`position-absolute ${maskIsHide?'d-none':''}`" ref="mask" :style="maskStyle"></div>
              <div id="super-mask" class="position-absolute" @mouseenter="enter" @mouseleave="leave" @mousemove="mousemove"></div>
              <div id="div-lg" :class="`position-absolute  ${lgImgIsHide?'d-none':''}`" :style="lgImgStyle" ></div>
              <div class="card-body p-0 text-center">
                <img src="img/product_detail/hover-prev.png" :class="`btn float-left btn-light border-0 p-1 pt-4 pb-4 ${leftIsDisabled?'disabled':''}`" @click="prev">
                <div class="d-inline-block pt-2 mx-0 m-auto">
                  <ul class="list-unstyled mb-0" :style="ulMarginLeft">
                    <li class="float-left p-1" v-for="pic in pics">
                      <a href="#"><img :src="pic.sm" :data-md="pic.md" :data-lg="pic.lg" @click.prevent="showMd(pic.md,pic.lg)"></a>
                    </li>
                  </ul>
                </div>
                <img src="img/product_detail/hover-next.png" :class="`btn float-right btn-light border-0 p-1 pt-4 pb-4 ${rightIsDisabled?'disabled':''}`" @click="next">
              </div>
            </div>
          </div>
          <div id="details" class="col pl-0  text-left">
            <h6 class="font-weight-bold">
             {{product.title}}
            </h6>
            <h6>
              <a class="small text-dark font-weight-bold" href="javascript:;">{{product.subtitle}}</a>
            </h6>
            <div class="alert alert-secondary small text-left" role="alert">
              <div>
                <span>学员售价：</span>
                <h2 class="d-inline text-primary font-weight-bold">¥{{product.price.toFixed(2)}}</h2>
              </div>
              <div>
                <span>服务承诺：</span>
                <span>{{product.promise}}</span>
              </div>
            </div>
            <!-- 客服 -->
            <p class="mb-1 text-left">
              <span class="small">客服：</span>
              <span class="small">联系客服</span>
              <img class="mb-3" src="img/product_detail/kefuf.gif">
            </p>
            <!-- 规格 -->
            <div>
              <div class="float-left small">规格：</div>
              <div class="float-left w-50">
                <router-link v-for="i in specs" :class="`btn btn-sm btn-outline-secondary mb-1 w-100 text-left ${i.lid==urlLid?'active':''}`" :to="`/details/${i.lid}`"  @click.native="renovate">{{i.spec}}</router-link>
              </div>
              <div class="clearfix"></div>
            </div>
            <!-- 数量 -->
            <div class="mt-2">
              <div class="float-left small">数量：</div>
              <div class="input-group mb-3 w-25">
                <div class="input-group-prepend">
                  <button class="btn btn-outline-secondary p-1" type="button" @click="sub">-</button>
                </div>
                <input type="text" value="1" class="form-control text-center" placeholder="" aria-label="" aria-describedby="basic-addon1" v-model="num">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary p-1" type="button" @click="add">+</button>
                </div>
              </div>
              <div class="clearfix"></div>
            </div>
            <!-- 购买部分 -->
            <div >
              <router-link class="btn pt-3 pb-2 px-5" to="/cart"><h5>立即购买</h5></router-link>
              <a class="btn btn-primary pt-3 pb-2 ml-2" href="javascript:;">
                <h5><img src="img/product_detail/product_detail_img7.png"> 加入购物车</h5>
              </a>
              <a class="btn btn-primary pt-1 pb-1 collection ml-1" href="javascript:;">
                <img src="img/product_detail/product_detail_img6.png">
                <br>
                收藏
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="container mb-5">
        <h4 class="d-inline-block ml-3">为你推荐</h4>
        <h6 class="d-inline-block bg-dark text-white ml-2">大家都在看</h6>
        <div id="recommend" class="border pl-3">
          <ul class="list-unstyled" style="width: 1100px; margin-left:-220px;">
            <li class="float-left">
              <div class="card mb-1 p-4 border-0 bg-transparent box-shadow">
                <img class="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" alt="Thumbnail [100%x225]" src="img/product_detail/product_detail_1.png" data-holder-rendered="true">
                <div class="card-body p-0">
                  <p class="card-text text-center small">ThinkPad New S2 (20GUA00QCD)13.3英寸超霸</p>
                </div>
              </div>
            </li>
            <li class="float-left">
              <div class="card mb-1 p-4 border-0 bg-transparent box-shadow">
                <img class="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" alt="Thumbnail [100%x225]" src="img/product_detail/product_detail_2.png" data-holder-rendered="true" >
                <div class="card-body p-0">
                  <p class="card-text text-center small">戴尔 DELL燃7000 R1605S 超霸</p>
                </div>
              </div>
            </li>
            <li class="float-left">
              <div class="card mb-1 p-4 border-0 bg-transparent box-shadow">
                <img class="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" alt="Thumbnail [100%x225]" src="img/product_detail/product_detail_3.png" data-holder-rendered="true" >
                <div class="card-body p-0">
                  <p class="card-text text-center small">戴尔(DELL)魔方15MF Pro-R2505TSS灵</p>
                </div>
              </div>
            </li>
            <li class="float-left">
              <div class="card mb-1 p-4 border-0 bg-transparent box-shadow">
                <img class="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" alt="Thumbnail [100%x225]" src="img/product_detail/product_detail_4.png" data-holder-rendered="true" >
                <div class="card-body p-0">
                  <p class="card-text text-center small">联想(Lenovo) YOGA900 (YOGA4 PRO)多彩版</p>
                </div>
              </div>
            </li>
            <li class="float-left">
              <div class="card mb-1 p-4 border-0 bg-transparent box-shadow">
                <img class="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" alt="Thumbnail [100%x225]" src="img/product_detail/product_detail_1.png" data-holder-rendered="true">
                <div class="card-body p-0">
                  <p class="card-text text-center small">ThinkPad New S2 (20GUA00QCD)13.3英寸超霸</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <nav class="navbar flex-md-nowrap p-0 ml-3">
        <form class="form-inline pl-2">
          <button class="btn bg-transparent rounded-0 pt-3 pb-2 active" type="button"><h5>商品详情</h5></button>
          <button class="btn bg-transparent rounded-0 pt-3 pb-2" type="button"><h5>商品评价</h5></button>
        </form>
        <ul class="navbar-nav">
          <li class="nav-item text-nowrap">
            <a class="btn btn-primary p-3 border-bottom" href="javascript:;">
              <h5><img src="img/product_detail/product_detail_img7.png" alt=""> 加入购物车</h5>
            </a>
          </li>
        </ul>
      </nav>
      <div id="params" class="container">
        <div class="row mr-1">
          <div class="col-md-10 pt-5">
            <a name="规格参数"></a>
            <h6 class="d-inline-block ml-3">规格参数 <img src="img/product_detail/product_detail_icon_1.png" alt=""></h6>
            <div class="pl-3">
              <ul class="list-unstyled">
                <li class="float-left mb-2"><a class="text-muted small" href="#">商品名称：{{product.lname}}</a></li>
                <li class="float-left mb-2"><a class="text-muted small" href="#">系统：{{product.os}}</a></li>
                <li class="float-left mb-2"><a class="text-muted small" href="#">内存容量：{{product.memory}}</a></li>
                <li class="float-left mb-2"><a class="text-muted small" href="#">分辨率：{{product.resolution}}</a></li>
                <li class="float-left mb-2"><a class="text-muted small" href="#">显卡型号：{{product.video_card}}</a></li>
                <li class="float-left mb-2"><a class="text-muted small" href="#">处理器：{{product.cpu}}</a></li>
                <li class="float-left mb-2"><a class="text-muted small" href="#">显存容量：{{product.video_memory}}</a></li>
                <li class="float-left mb-2"><a class="text-muted small" href="#">分类：{{product.category}}</a></li>
                <li class="float-left mb-2"><a class="text-muted small" href="#">硬盘容量:{{product.disk}}</a></li>
              </ul>
            </div>
            <a name="商品介绍"></a>
            <h6 class="d-inline-block mt-4 mb-3 ml-3">商品介绍 <img src="img/product_detail/product_detail_icon_4.png" alt=""></h6>
            <div v-html="product.details"> 
            </div>
            <a name="售后保障"></a>
            <h6 class="d-inline-block mt-4 mb-3 ml-3">售后保障 <img src="img/product_detail/product_detail_icon_3.png" alt=""></h6>
            <div class="pl-3"> 
              <div>
                <p class="text-primary font-weight-bold">
                  <img src="img/product_detail/product_detail_img16.png" alt="">
                  正品保障
                </p>
                <p class="small">
                  达内学子商城向您保证所售商品均为正品行货，达内自营商品开具机打发票或电子发票。
                </p>
                <p class="text-primary font-weight-bold">
                  <img src="img/product_detail/product_detail_img16.png" alt="">
                  全国联保
                </p>
                <p class="small">
                  凭质保证书及达内商城发票，可享受全国联保服务，与您亲临商场选购的商品享受相同的质量保证。达内商城还为您提供具有竞争力的商品价格和运费政策，请您放心购买！
                  注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！
                </p>
              </div>
            </div>
            <a name="包装清单"></a>
            <h6 class="d-inline-block mt-4 mb-3 ml-3">包装清单 <img src="img/product_detail/product_detail_icon_2.png" alt=""></h6>
            <div class="pl-3">
              <p class="small">笔记本 x1 适配器 x1 电源线 x1 电池 x1 说明书（电子版）x1 备注：笔记本电脑的背面只会标注此电脑的系列，例如： XPS 13-9360 ，如果您需要核实此电脑的具体配置型号是否与达内页面相符，可电话咨询达内厂商：800-858-2969</p>
            </div>
          </div>
          <div class="col-md-2 mb-4 pt-5 pl-2">
            <a class="btn p-3 pl-4 pr-4 mb-2" href="#规格参数">
              <h5 class="text-dark mb-0"><img src="img/product_detail/product_detail_icon_g_1.png" alt=""> 规格参数</h5>
            </a>
            <a class="btn p-3 pl-4 pr-4 mb-2" href="#商品介绍">
              <h5 class="text-dark mb-0k"><img src="img/product_detail/product_detail_icon_t_1.png" alt=""> 商品介绍</h5>
            </a>
            <a class="btn p-3 pl-4 pr-4 mb-2" href="#售后保障">
              <h5 class="text-dark mb-0"><img src="img/product_detail/product_detail_icon_d_1.png" alt=""> 售后保障</h5>
            </a>
            <a class="btn p-3 pl-4 pr-4 mb-2" href="#包装清单">
              <h5 class="text-dark mb-0"><img src="img/product_detail/product_detail_icon_bao_1.png" alt=""> 包装清单</h5>
            </a>
            <a class="btn p-3 pl-4 pr-4 mb-2" href="#header">
              <h5 class="text-dark mb-0"><img src="img/product_detail/product_detail_icon_up_1.png" alt=""> 回到顶部</h5>
            </a>
          </div>
        </div>
      </div>
    </main>
</template>

<script>
    export default {
    	data:function(){
    		return {
    			product:{price:0},
    			specs:[],
    			pics:[],
    			urlLid:0,
    			num:1,
    			mdSrc:'',
    			lgSrc:'',
    			leftIsDisabled:true,
    			rightIsDisabled:false,
    			move:0,
    			ulMarginLeft:{
    				"marginLeft":0
    			},
    			maskIsHide:true,
    			lgImgIsHide:true,
    			maskStyle:{
    				"left":'',"top":''
    			},
    			lgImgStyle:{
    		   "backgroundImage":'',
    	     "backgroundRepeat":"no-repeat",
    	     "background-position":''
    			}
    		}
    	},
    	props:["lid"],
    	mounted(){
    		this.axios.get('http://localhost:3000/details',{
    			params:	{lid:this.lid}
    		}).then(res=>{
    			this.product=res.data.product;
    			this.specs=res.data.specs;
    			this.pics=res.data.pics;
    			//添加规格参数active效果
    			this.urlLid=parseInt(this.$route.path.slice(9,10));
    			//首次加载完成就把第一中图和大图给展示区
    			if(this.pics.length>0){
    				 this.mdSrc=this.pics[0].md;
    			   this.lgSrc=this.pics[0].lg;
    			}
    			//如果请求回来的展示图少于或等于四张
    			if(this.pics.length<=4){
    				 this.rightIsDisabled=true;
    			}
    		})
    	},
    	methods:{
    		renovate(){
    			this.$router.go(0);
    		},
    		add(){
    			this.num++;
    		},
    		sub(){
    			if(this.num>=2){
    				this.num--;
    			}
    		},
    		showMd(mdSrc,lgSrc){
    			this.mdSrc=mdSrc;
    			this.lgSrc=lgSrc;
    		},
    		prev(){
    			if(!this.leftIsDisabled){
    				this.move--;
    				this.ulMarginLeft.marginLeft=-62*this.move+'px';
    				this.rightIsDisabled=false;
    			}
    			if(this.move==0){
    				this.leftIsDisabled=true;
    			}
    		},
    		next(){
    			if(!this.rightIsDisabled){
    				this.move++;
    				this.ulMarginLeft.marginLeft=-62*this.move+'px';
    				this.leftIsDisabled=false;
    			} 
        if(this.pics.length-this.move==4){
    				this.rightIsDisabled=true;
    			}
    		},
    		enter(){
    			this.lgImgStyle.backgroundImage=`url(${this.lgSrc})`;
    			this.lgImgIsHide=false;
    			this.maskIsHide=false;
    		},
    		leave(){
    		  this.lgImgIsHide=true;
    			this.maskIsHide=true;	
    		},
    		mousemove(e){
    			var left=e.offsetX-parseInt(getComputedStyle(this.$refs.mask).width.slice(0,-2))/2;
    			var top=e.offsetY-parseInt(getComputedStyle(this.$refs.mask).height.slice(0,-2))/2;
    			var max=352-parseInt(getComputedStyle(this.$refs.mask).width.slice(0,-2));  //mask最大移动距离
    			 if(left<0) left=0;
		   	   else if(left>max) left=max;
		   	   if(top<0) top=0;
		   	   else if (top>max) top=max;
		   	  this.maskStyle.left=left+'px';
		   	  this.maskStyle.top=top+'px';
		   	  this.lgImgStyle.backgroundPosition=`-${left*10/7}px -${top*10/7}px`;
    		}
    	}
    }
</script>

<style scoped>
/*定制规格参数按钮的颜色*/
#details>div:nth-child(5)>div .btn-outline-secondary:hover{
  color:#0069d9;
  background-color:#f5f5f5;
  border-color:#e4393c;
}
.active{
  color:#6c757d;
  background-color:#f5f5f5;
  border-color:#e4393c;
  border-width:2px;
}
/*定制数量按钮的颜色*/
#details>div:nth-child(6) .btn-outline-secondary{
  width:30px;
}
#details>div:nth-child(6) .btn-outline-secondary:hover,
#details>div:nth-child(6) .btn-outline-secondary:active,
#details>div:nth-child(6) .btn-outline-secondary:focus{
  color:#6c757d;
  background-color:#f5f5f5;
  border-color:#0069d9;
  box-shadow: none;
}
/*定制立即购买按钮背景色*/
#details>div:nth-child(7)>a:first-child{
  background:linear-gradient(to bottom,#f0f0f0,#e0e0e0);
}

/*定制放大镜样式*/
#preview>.card>.card-body>div{
  width:248px;
  height:62px ;
  overflow:hidden;
}
#preview>.card>.card-body>div>ul{
  transition:all .5s linear;
}
#preview>.card>.card-body>div>ul>li{
  width:62px; height:62px;
}
#preview>.card>.card-body>div>ul img{
  width:52px; height:52px;
}
#preview>.card>.card-body>div>ul img:hover{
  border:1px solid #e4393c;
}
#preview>div>img{width:354px}
#mask{
  width:176px; height:176px;
  background-color:#ffa;
  opacity:.5;
}
#super-mask{
  width:352px; height:352px;
}
#div-lg{
  width:400px; height:400px;
  left:354px;
  z-index:1000;
  border: 1px solid rgba(0, 0, 0, 0.125)
}
/*定制为你推荐部分的样式*/
#recommend{
  width:915px;
  border-color: 1px solid rgba(0, 0, 0, 0.125);
  overflow:hidden;
}
#recommend>ul>li{
  width:220px;
}
/*订制商品详情部分的样式*/
#main>nav.navbar{
  background:linear-gradient(to bottom,#f0f0f0,#e0e0e0);
  box-shadow:0px 3px 6px #ccc
}
#main>nav.navbar .active{
  margin-top:2px;
  border-bottom:3px solid #0069d9;
}
#params .col-md-2>.btn{
  background: linear-gradient(to bottom,#f0f0f0,#e0e0e0);
  box-shadow:0px 3px 4px #ccc
}
#params .col-md-10>div>ul>li{
  width: 237px;
}
</style>