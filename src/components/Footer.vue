<template>


	<footer class="footer">
		<div class="container">
			<div class="row">
				<div class="footer-col">
					<h4>{{ $t('footer.company') }}</h4>
					<ul>
						<li><a target="_blank" :href="sellers">{{ $t('footer.workWithUs') }}</a></li>
						<li><a target="_blank" :href="wholeSale">{{ $t('footer.wholeSale') }}</a></li>
						<li><a target="_blank" :href="developer">{{ $t('footer.developer') }}</a></li>
					</ul>
				</div>
				<div class="footer-col">
					<h4>{{ $t('footer.getHelp') }}</h4>
					<ul>
						<li><a target="_blank"
								:href="'https://wa.me/' + whatsappNumber + '?text=مرحيا أريد الاستفسار عن ' + $t('footer.shipping') + ''">{{
									$t('footer.shipping') }}</a></li>
						<li><a target="_blank"
								:href="'https://wa.me/' + whatsappNumber + '?text=مرحيا أريد الاستفسار عن ' + $t('footer.returns') + ''">{{
									$t('footer.returns') }}</a></li>

						<li><a target="_blank"
								:href="'https://wa.me/' + whatsappNumber + '?text=مرحيا أريد الاستفسار عن ' + $t('footer.paymentOptions') + ''">{{
									$t('footer.paymentOptions') }}</a></li>
					</ul>
				</div>
				<div class="footer-col">
					<h4>{{ $t('footer.categories') }}</h4>
					<ul>
						<li v-for="cat in categories.slice(0,3)" :key="cat.id">
							<router-link :to="{ name: 'Products', query: { categoryId: cat.name } }">{{ cat.name  }}</router-link>
						</li>
					</ul>
				</div>
				<div class="footer-col">
					<h4>{{ $t('footer.followUs') }}</h4>
					<div class="social-links">
						<a :href="facbookPage" target="_blank"><i class="bx bx-sm pt-2 bxl-facebook"></i></a>
						<a :href="TelegramPage" target="_blank"><i class="bx bx-sm pt-2 bxl-telegram"></i></a>
						<a :href="instaPage" target="_blank"><i class="bx bx-sm pt-2 bxl-instagram"></i></a>
						<a :href="whatsappPage" target="_blank"><i class="bx bx-sm pt-2 bxl-whatsapp"></i></a>
					</div>
				</div>
			</div>
		</div>
	</footer>
</template>

<script setup>
const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
const facbookPage = import.meta.env.VITE_SOCIAL_FACEBOOK;
const instaPage = import.meta.env.VITE_SOCIAL_INSTAGRAM;
const whatsappPage = import.meta.env.VITE_SOCIAL_WHATSAPP;
const TelegramPage = import.meta.env.VITE_SOCIAL_TELEGRAM;
const wholeSale = import.meta.env.VITE_SOCIAL_WHATSAPP_SELLERS;
const sellers = import.meta.env.VITE_SOCIAL_WHATSAPP_WHOLESALE;
const developer = import.meta.env.VITE_DEVELOPER_WHATSAPP_NUMBER;
import categories from '@/data/categories.json';

</script>
<style scoped>
ul {
	list-style: none;
	padding-left: 0;
}
</style>