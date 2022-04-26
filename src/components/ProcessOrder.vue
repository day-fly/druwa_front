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
<!--        <q-route-tab to="/page1" label="주문현황" />-->
<!--        <q-route-tab to="/page2" label="과거주문내역" />-->
      </q-tabs>
    </q-header>

    <q-page-container>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="current">
          <div class="q-pa-md row items-start q-gutter-md">
          <q-card class="my-card">
            <q-card-section class="bg-yellow-4 text-black">
              <div class="text-subtitle1 text-center text-bold">108동 1402호 김현구</div>
              <div class="text-subtitle2 text-center">4/26 11:00:03</div>
            </q-card-section>

            <q-separator></q-separator>

            <q-card-actions vertical>
              <q-btn flat>아메리카노[ICE]<q-space/><b>1</b></q-btn>
              <q-btn flat>카라멜마끼아또[ICE]<q-space/><b>2</b></q-btn>
              <q-btn flat>카페라떼[ICE]<q-space/><b>1</b></q-btn>
              <q-btn flat>레모네이드[ICE]<q-space/><b>1</b></q-btn>
              <q-btn flat>딸기바나나[ICE]<q-space/><b>3</b></q-btn>
            </q-card-actions>

            <div class="text-center div-vertical-center">
              <q-btn class="glossy text-subtitle1" color="purple-9" label="완료" style="height: 20px;"></q-btn>&nbsp;&nbsp;
              <q-btn class="glossy text-subtitle1" color="grey" label="취소"></q-btn>
            </div>
            <div>&nbsp;</div>

          </q-card>

          <q-card class="my-card">
            <q-card-section class="bg-yellow-4 text-black">
              <div class="text-subtitle1 text-center text-bold">202동 1102호 장혜성</div>
              <div class="text-subtitle2 text-center">4/26 11:02:00</div>
            </q-card-section>

            <q-separator></q-separator>

            <q-card-actions vertical>
              <q-btn flat>아메리카노[ICE] 1</q-btn>
              <q-btn flat>카페라떼[HOT] 2</q-btn>
            </q-card-actions>

            <div class="text-center div-vertical-center">
              <q-btn class="glossy text-subtitle1" color="purple-9" label="완료" style="height: 20px;"></q-btn>&nbsp;&nbsp;
              <q-btn class="glossy text-subtitle1" color="grey" label="취소"></q-btn>
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
                :rows="data"
                :columns="columns"
                row-key="name"
                bordered
                :pagination=pagination
            >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="name" :props="props" class="text-bold">
                  {{ props.row.name }}
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
import { ref } from 'vue'

export default {
  name: 'processOrder',
  setup () {
    return {
      pagination: {
        rowsPerPage: 10 // current rows per page being displayed
      },
      columns:[
        { name: 'name', align: 'left', label: '이름', field: 'name'},
        { name: 'orders', align: 'left', label: '주문', field: 'orders'},
        { name: 'status', align: 'left', label: '상태', field: 'status'},
        { name: 'reset', align: 'center', label: '복원', field: 'reset'},
      ],
      data: [
        {name : 'test', orders: '아메리카노[ICE] 2, 카페라떼[ICE] 1, 레모네이드[ICE] 1, 녹차[ICE] 4', status: '완료'},
        {name : 'test', orders: '아메리카노[ICE] 2, 카페라떼[ICE] 1, 레모네이드[ICE] 1, 녹차[ICE] 4', status: '취소'},
        {name : 'test', orders: '아메리카노[ICE] 2, 카페라떼[ICE] 1, 레모네이드[ICE] 1, 녹차[ICE] 4', status: '완료'},
        {name : 'test', orders: '아메리카노[ICE] 2, 카페라떼[ICE] 1, 레모네이드[ICE] 1, 녹차[ICE] 4', status: '완료'},
        {name : 'test', orders: '아메리카노[ICE] 2, 카페라떼[ICE] 1, 레모네이드[ICE] 1, 녹차[ICE] 4', status: '완료'},
        {name : 'test', orders: '아메리카노[ICE] 2, 카페라떼[ICE] 1, 레모네이드[ICE] 1, 녹차[ICE] 4', status: '완료'}
      ],
      tab: ref('current'),
      selectMenu(){
        alert('test')
      }
    }
  }
}
</script>

<style  lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 200px;
  cursor: pointer;
}
</style>