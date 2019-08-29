<template>
	<div>
		 		<div class="container">
			<ul class="d-flex list-unstyled justify-content-sm-around">
				<li>
					<img src="img/footer/icon1.png"/>
					<p class="my_font-small text-muted text-center">品质保障</p>
				</li>
				<li>
					<img src="img/footer/icon2.png"/>
					 <p class="my_font-small text-muted text-center">私人定制</p>
				</li>
				<li>
					<img src="img/footer/icon3.png"/>
					 <p class="my_font-small text-muted text-center">学员特供</p>
				</li>
				<li>
					<img src="img/footer/icon4.png"/>
					 <p class="my_font-small text-muted text-center">专属特权</p>
				</li>
			</ul>
		</div>
		<footer class="bg-white pt-5 mt-5" id="footer">
			<div class="row">
				<div class="col-lg-4 col-md-12 ">
					<img src="img/footer/logo.png" class="d-block mb-3 mr-1"/>
					<img src="img/footer/footerFont.png"/>
				</div>
				<div class="col-lg-4 col-md-12 d-flex justify-content-around text-muted">
					<ul class="list-unstyled my_font-small">
						<li class="font-weight-bold mb-2">
							<a href="#" class="text-muted">买家帮助</a></li>
						<li><a href="#" class="text-muted">新手指南</a></li>
						<li><a href="#" class="text-muted">服务保障</a></li>
						<li><a href="#" class="text-muted">常见问题</a></li>
					</ul>
					<ul class="list-unstyled  my_font-small">
						<li class="font-weight-bold mb-2"><a href="#" class="text-muted">商家帮助</a></li>
						<li><a href="#" class="text-muted">商家入驻</a></li>
						<li><a href="#" class="text-muted">商家后台</a></li>
					</ul>
					<ul class="list-unstyled my_font-small">
						<li class="font-weight-bold mb-2"><a href="#" class="text-muted">关于我们</a></li>
						<li><a href="#" class="text-muted">关于达内</a></li>
						<li><a href="#" class="text-muted">联系我们</a></li>
						<li>
							<img src="img/footer/wechat.png" />
							<img src="img/footer/sinablog.png" />
						</li>
					</ul>
				</div>
				<div class="col-lg-4 col-md-12 text-center">
					<div class="row ">
						<div class="col-6 pl-5">
							<h6>学子商城主页</h6>
							<p class="mb-1"><img src="img/footer/ios.png"/></p>
							<p><img src="img/footer/android.png"/></p>
						</div>
						<div class="col-6">
							<img src="img/footer/erweima.png"/>
						</div>
					</div>
				</div>
			</div>
			<div class="row text-center mt-3">
				<div class="col-12 ">
					&copy; 2017&nbsp; 达内科技有限公司 &nbsp;版权所有 &nbsp;京ICP备08000853号-75
				</div>
			</div>
		</footer>
	</div>
</template>

<script>
	export default{
		data:function(){
			return {}
		}
	}
</script>

<style>
#footer{width:100% ;padding: 0;margin: 0;}
@media only screen and (min-width:992px ) {
 #footer>div{width: 992px;margin: 0 auto;}
}
</style>