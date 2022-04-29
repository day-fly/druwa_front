<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-black text-white text-h4  text-bold text-center" style="min-height:100px">
      &nbsp;&nbsp;101동 1402호 김현구님 환영합니다.
    </q-header>

    <q-drawer behavior="desktop"
              :show-if-above="true" side="right" bordered :width="400">
      <!-- drawer content -->
      <div class="q-pa-md" style="max-width: 400px">
	<div align="center">
        <q-btn class="glossy text-h4 text-weight-bold" rounded color="deep-orange" label="주문" style="height: 50px;min-width: 150px" @click="confirmOrder"></q-btn>&nbsp;&nbsp;
        <q-btn class="glossy text-h4 text-weight-bold" rounded color="grey" label="취소" style="height: 50px;min-width: 150px"></q-btn>
	</div>
	<br>
        <q-toolbar class="bg-black text-white shadow-2 glossy">

          <q-toolbar-title>주문목록</q-toolbar-title>
        </q-toolbar>

        <q-list bordered>
          <q-item v-for="order in orders" :key="order.id" class="q-my-sm" clickable v-ripple>
            <q-item-section avatar>
              <q-btn color="black" text-color="white" push label="X" style="font-size: 1.2em" @click="deleteOrder(order)"></q-btn>
            </q-item-section>
            <q-item-section>
              <q-item-label style="font-size: 1.2em">{{ order.name }}</q-item-label>
              <q-item-label style="font-size: 1.2em" caption lines="1">주문수량 : <b class="text-accent">{{ order.qty }}</b></q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn-group push>
                <q-btn color="white" text-color="black" push label="+" style="font-size: 1.5em" @click="addQty(order)"></q-btn>
                <q-btn color="grey-4" text-color="black" push label="-" style="font-size: 1.5em" @click="minusQty(order)"></q-btn>
<!--                <q-btn color="red" text-color="white" push label="X" style="font-size: 1.2em" @click="minusQty(order)"></q-btn>-->
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
          indicator-color="black"
          class="bg-purple-9 text-white shadow-2"
          dense
          align="justify"
      >

        <template v-for="menu in menu1Levels" :key="menu.id">
          <q-tab :class="menu.class" :name="menu.name" :icon="menu.icon" :label="menu.label"></q-tab>
        </template>
      </q-tabs>

      <q-tabs
          v-model="tab"
          indicator-color="black"
          class="bg-purple-9 text-white shadow-2"
          dense
          align="justify"
      >
        <template v-for="menu in menu1Levels_2" :key="menu.id">
          <q-tab :class="menu.class" :name="menu.name" :icon="menu.icon" :label="menu.label"></q-tab>
        </template>
</q-tabs>


      <q-tab-panels v-model="tab" animated>
        <q-tab-panel v-for="menu in menu1Levels" :name="menu.name" :key="menu.id">
          <div class="q-pa-md row items-start q-gutter-md">
            <q-card v-for="subMenu in menu2Levels.filter((obj) => obj.parentId === menu.id)" :key="subMenu.id" class="my-card" @click="selectMenu(subMenu)">
              <q-img src="../images/coffee.jpg">
                <!--              <div class="absolute-bottom text-weight-bolder">-->
                <!--                아메리카노[ICE]-->
                <!--              </div>-->
              </q-img>
              <q-card-section class="text-center">
                <div class="text-h6">{{ subMenu.name}}</div>
                <b class="text-accent" style="font-size: 1.2em">{{ subMenu.price}}원</b>
              </q-card-section>
            </q-card>
          </div>
        </q-tab-panel>
      </q-tab-panels>
      <!--      <router-view />-->
    </q-page-container>


  </q-layout>

  <q-dialog v-model="showConfirmOrders">
    <q-card>
      <q-card-section class="bg-purple-9 text-white">
        <div class="text-h6 text-bold">주문을 확인해주세요</div>
      </q-card-section>

      <q-separator></q-separator>

      <q-list bordered separator>
        <q-item v-for="n in orders" :key="n.id">
          <q-item-section class="text-h6">{{n.name}}</q-item-section>
          <q-item-section class="text-h6" side>{{n.qty}}</q-item-section>
        </q-item>
      </q-list>

      <q-separator></q-separator>

      <q-card-actions align="right">
        <q-btn style="width:150px" class="text-h6 text-bold" label="완료" color="deep-orange" @click="completeOrders"></q-btn>
        <q-btn style="width:150px" class="text-h6 text-bold" label="취소" color="grey" v-close-popup></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="showAlert">
    <q-card>
      <q-card-section class="bg-purple-9 text-white">
        <div class="text-h6 text-bold">주문할 메뉴를 선택하세요.</div>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn style="width:150px" class="text-h6 text-bold" label="확인" color="deep-orange" v-close-popup></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'order',
  data() {
    return {
      showConfirmOrders: false,
      showAlert: false,
      orders: [],
      menu1Levels: [
        {id: '1', name: 'coffee', icon: 'coffee', label: '커피', class:'bg-purple text-h5'},
        {id: '2', name: 'drink', icon: 'local_drink', label: '음료', class:'bg-green text-h5'},
        {id: '3', name: 'dessert', icon: 'icecream', label: '디저트', class:'bg-yellow text-h5'},
        {id: '4', name: 'etc', icon: 'more_horiz', label: '기타', class:'bg-blue text-h5'}
      ],
      menu1Levels_2: [
        {id: '1', name: 'coffee', icon: 'coffee', label: '커피', class:'bg-red text-h5'},
        {id: '2', name: 'drink', icon: 'local_drink', label: '음료', class:'bg-orange text-h5'},
        {id: '3', name: 'dessert', icon: 'icecream', label: '디저트', class:'bg-amber text-h5'},
        {id: '4', name: 'etc', icon: 'more_horiz', label: '기타', class:'bg-pink text-h5'}
      ],
      menu2Levels: [
        {parentId: '1', id: '1_1', name: '아메리카노[ICE]', price: '1500'},
        {parentId: '1', id: '1_2', name: '카라멜마끼아또[HOT]', price: '1000'},
        {parentId: '1', id: '1_3', name: 'test[HOT]', price: '1000'},
        {parentId: '1', id: '1_4', name: 'test2[HOT]', price: '1000'},
        {parentId: '2', id: '2_1', name: '레몬에이드[ICE]', price: '2000'},
        {parentId: '2', id: '2_2', name: '유자차[HOT]', price: '1800'},
        {parentId: '3', id: '3_1', name: '치즈케이크', price: '3500'},
        {parentId: '3', id: '3_2', name: '샌드위치', price: '3000'}
      ]
    }
  },
  methods: {
    confirmOrder(){
      if(this.orders.length === 0){
        this.showAlert = true
        return
      }
      this.showConfirmOrders = true
    },
    selectMenu(menu){
      const existOrder = this.orders.find(c => c.id === menu.id);
      console.log(existOrder)
      if(!existOrder){
        const order = Object.assign({}, menu)
        order.qty = 1
        this.orders.push(order)
      }else{
        existOrder.qty += 1
      }
    },
    addQty(order){
      console.log('addQty')
      order.qty += 1
    },
    minusQty(order){
      console.log('minusQty')
      if(order.qty > 1){
        order.qty -= 1
      }
    },
    deleteOrder(order){
      const orders = this.orders.filter((obj) => order.id !== obj.id)
      this.orders = orders
    },
    completeOrders(){
      this.$router.push('/bye')
    }
  },
  setup () {
    return {
      tab: ref('coffee'),
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .q-tab__label {
  font-size: 1.8em;
}

::v-deep .q-tab__icon {
  width: 45px;
  height: 40px;
  font-size: 45px;
}

.my-card {
  width: 100%;
  max-width: 194px;
  min-height: 317px;
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
