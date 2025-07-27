<template>
    <div class="wrapper">
        <div id="main-div">
            <div id="main-button" class="wave">
                <i class="bx  bx-grid-alt "></i>
            </div>
            <button @click="makeCall"><span><i class="bx bx-phone"></i> {{ $t('quickActions.callUs') }}</span></button>
            <a id="quick-cart"><i class="bx bx-cart"></i></a>
            <a target="_blank" :href="'https://wa.me/' + whatsappNumber + '?text=مرحيا أريد المساعدة'"
                title="contact us on whatsapp"><i class="bx bxl-whatsapp"></i></a>
            <a href="#" @click="showSearchBox"><i class="bx bx-search"></i></a>

            <a @click="scrollTop" href="# " id="scroll-up">
                <i class='bx bx-up-arrow-alt'></i>
            </a>
        </div>

        <div class="modal fade" id="searchBox" tabindex="-1">
            <div class="modal-dialog modal-md modal-dialog-centered">
                <div class="modal-content">
                    <div class="w-100">
                        <div class="d-flex justify-content-center h-100 w-100">
                            <div class="search rounded-pill">
                                <input ref="searchInputElement" type="text" class="search-input" :placeholder="$t('quickActions.searchPlaceholder')"
                                    v-model="searchInput" @keydown.enter="goToSearchPage" name="">
                                <a @click="goToSearchPage" href="#" class="search-icon">
                                    <i class="bx bx-md bx-search"></i>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
const phoneNumber = import.meta.env.VITE_CALL_NUMBER;
const searchInput = ref("");
const searchInputElement = ref(null);
import { useRouter } from 'vue-router'

const router = useRouter()
function makeCall() {
    window.location = 'tel:' + phoneNumber
}
function scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
let searchBox = null;
function showSearchBox() {
    searchBox.show();
    setTimeout(() => {
        searchInputElement.value.focus();
    }, 1000);
}
onMounted(() => {
    searchBox = new window.bootstrap.Modal(document.getElementById("searchBox"));
    var mainDiv = document.getElementById('main-button');
    mainDiv.addEventListener('click', function () {
        this.children.item(0).classList.toggle('bx-x');
        this.classList.toggle('open');
    });
});

function goToSearchPage() {
    if (searchInput.value) {
        searchBox.hide();

        router.push({
            name: "Products", query: {
                search: searchInput.value
            }
        })
        searchInput.value = "";

    }
}
</script>
<style scoped></style>