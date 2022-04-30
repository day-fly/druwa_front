<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-purple-9 text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          주문관리
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs
          v-model="tab"
          class="bg-black text-white shadow-2"
          indicator-color="yellow"
          align="left"
      >
        <q-tab name="current" label="주문현황"></q-tab>
        <q-tab name="prev" label="주문내역"></q-tab>
      </q-tabs>
    </q-header>

    <q-page-container>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="current">
          <div class="q-pa-md row items-start q-gutter-md">
            <q-card v-for="order in orderList" class="my-card" :key="order.id">
              <q-card-section class="bg-yellow-4 text-black">
                <div class="text-subtitle1 text-center text-bold">
                  {{ order.orderDong }}-{{ order.orderHo }}&nbsp;{{ order.orderName }}
                </div>
                <div class="text-subtitle2 text-center">
                  {{ order.orderDate.substring(0, order.orderDate.indexOf(".")).replace("T", " ") }}
                </div>
              </q-card-section>

              <q-separator></q-separator>

              <q-card-actions vertical>
                <q-btn v-for="menu of order.cafeOrderProductList" flat :key="menu.id">
                  {{ menu.orderMenuName }}
                  <q-space/>
                  <b>{{ menu.orderMenuCount }}</b>
                </q-btn>
              </q-card-actions>

              <div class="text-center div-vertical-center">
                <q-btn class="glossy text-subtitle1" color="purple-9" label="완료" style="height: 20px;" @click="complete(order)"></q-btn>&nbsp;&nbsp;
                <q-btn class="glossy text-subtitle1" color="grey" label="취소" @click="cancel(order)"></q-btn>
              </div>
              <div>&nbsp;</div>

            </q-card>
          </div>
        </q-tab-panel>

        <q-tab-panel name="prev">
          <div class="q-pa-md">
            <q-table
                class="my-sticky-header-table"
                title="주문내역"
                :rows="orderList"
                :columns="columns"
                bordered
                :pagination=pagination
            >
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="name" :props="props" class="text-bold">
                    {{ props }}
                  </q-td>
                  <q-td key="orders" :props="props">
                    {{ props.row.orders }}
                  </q-td>
                  <q-td key="status" :props="props">
                    {{ props.row.status }}
                  </q-td>
                  <q-td key="reset" :props="props">
                    <q-btn class="text-subtitle2 text-bold" color="purple" name="delete" label='복원'/>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-page-container>

  </q-layout>
</template>

<script>

import {ref} from 'vue'
import axios from "axios";
import {useQuasar} from "quasar";

export default {
  name: 'processOrder',
  data() {
    return {
      interval: undefined,
      $q: useQuasar(),
      pagination: {
        rowsPerPage: 10 // current rows per page being displayed
      },
      columns: [
        {name: 'orderName', align: 'left', label: '이름', field: 'orderName'},
        {name: 'orders', align: 'left', label: '주문', field: 'orders'},
        {name: 'status', align: 'left', label: '상태', field: 'status'},
        {name: 'reset', align: 'center', label: '복원', field: 'reset'},
      ],
      orderList: [],
    }
  },
  created() {
    //this.getOrderList()
    this.interval = setInterval(() => this.getOrderList(), 5000)
  },
  methods: {
    complete(order) {
      axios.post(
          'http://localhost:5001/java/order/complete/'+order.id
      ).then(() => {
        this.getOrderList()
      }).catch(() => {

      })
    },
    cancel(order) {
      axios.post(
          'http://localhost:5001/java/order/cancel/'+order.id
      ).then(() => {
        this.getOrderList()
      }).catch(() => {

      })

    },
    async getOrderList() {
      await console.log('test')
      //this.$q.loading.show()
      await axios
          .get('http://localhost:5001/java/order/list')
          .then(response => {
            //this.$q.loading.hide()
            this.orderList = response.data.filter((obj) => obj.orderState === 'WAIT')
            //console.log(response)
          }).catch(() => {
            //this.$q.loading.hide()
            this.$router.push('/error')
      })
    }
  },
  setup() {
    return {
      tab: ref('current'),
    }
  }
}
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 200px;
  cursor: pointer;
}
</style>