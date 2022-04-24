<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="bg-black text-white">
      101동 1402호 김현구님 환영합니다.
    </q-header>

    <q-drawer behavior="desktop"
              :show-if-above="true" v-model="rightDrawerOpen" side="right" bordered :width="350">
      <!-- drawer content -->
      <div class="q-pa-md" style="max-width: 350px">
        <q-toolbar class="bg-black text-white shadow-2 glossy">
          <q-toolbar-title>주문목록</q-toolbar-title>
        </q-toolbar>

        <q-list bordered>
          <q-item v-for="order in orders" :key="order.id" class="q-my-sm" clickable v-ripple>
            <q-item-section>
              <q-item-label class="text-h6">{{ order.name }}</q-item-label>
              <q-item-label style="font-size: 1.2em" caption lines="1">주문수량 : <b class="text-accent">{{ order.qty }}</b></q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn-group push>
                <q-btn color="white" text-color="black" push label="+" style="font-size: 1.5em"></q-btn>
                <q-btn color="grey-4" text-color="black" push label="-" style="font-size: 1.5em"></q-btn>
              </q-btn-group>
            </q-item-section>
          </q-item>
          <q-separator></q-separator>
        </q-list>
      </div>
    </q-drawer>

    <q-page-container>
      <q-tabs
          v-model="tab"
          outside-arrows
          mobile-arrows
          indicator-color="black"
          class="bg-orange-6 text-white shadow-2"
          dense
          align="justify"
      >

        <q-tab class="bg-purple-9" icon="coffee" name="coffee" label="커피"></q-tab>
        <q-tab class="bg-purple-9" icon="local_drink" name="drink" label="음료"></q-tab>
        <q-tab class="bg-purple-9" icon="icecream" name="dessert" label="디저트"></q-tab>
        <q-tab class="bg-purple-9" icon="more_horiz" name="etc" label="기타"></q-tab>
      </q-tabs>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="coffee">
          <div class="q-pa-md row items-start q-gutter-md">
          <q-card class="my-card" @click="selectMenu">
            <q-img src="./images/coffee.jpg">
<!--              <div class="absolute-bottom text-weight-bolder">-->
<!--                아메리카노[ICE]-->
<!--              </div>-->
            </q-img>
            <q-card-section class="text-center">
              <div class="text-h6">아메리카노[ICE]</div>
              <b class="text-accent" style="font-size: 1.2em">1200원</b>
            </q-card-section>
          </q-card>
          </div>
        </q-tab-panel>

        <q-tab-panel name="drink">
          <div class="text-h6">drink</div>
        </q-tab-panel>

        <q-tab-panel name="dessert">
          <div class="text-h6">dessert</div>
        </q-tab-panel>

        <q-tab-panel name="etc">
          <div class="text-h6">etc</div>
        </q-tab-panel>
      </q-tab-panels>
<!--      <router-view />-->
    </q-page-container>

    <q-footer elevated class="bg-black text-white" style="height: 100px">

      <div class="text-center div-vertical-center">
        <q-btn class="glossy text-h5 text-weight-bold" rounded color="deep-orange" label="주문" style="height: 50px;min-width: 150px"></q-btn>&nbsp;&nbsp;
        <q-btn class="glossy text-h5 text-weight-bold" rounded color="grey" label="취소" style="height: 50px;min-width: 150px"></q-btn>
      </div>
    </q-footer>

  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const rightDrawerOpen = ref(false)

    return {
      orders: [
          {id: 'test1', name: '카페라떼[ICE]',qty: '1'},
          {id: 'test2', name: '아이스초코[ICE]', qty: '2'}
      ],
      tab: ref('coffee'),
      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      },
      selectMenu(){
        alert('test')
      }
    }
  }
}
</script>

<style lang="scss">
.q-tab__label {
  font-size: 1.8em;
}

.q-tab__icon {
  width: 45px;
  height: 40px;
  font-size: 45px;
}

.my-card {
  width: 100%;
  max-width: 170px;
  cursor: pointer;
}

.div-vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

</style>
