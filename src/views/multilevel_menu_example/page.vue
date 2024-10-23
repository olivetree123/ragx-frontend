<route lang="yaml">
meta:
  title: 导航1
</route>

<script setup lang="ts">
import { ref } from 'vue'

// function getIntersection(array1: number[], array2: number[]): number[] {
//  return array1.filter(item => array2.includes(item))
// }
const data = ref([{
  query: '杭州工会车票补贴的报销时间和须知？',
  intersection: ref<number[]>([]),
  items: [{ method: 'mv2', paragraphs: [
    { id: 1845, status: 0, title: '2023杭州春节车票补贴兑换须知一览' },
    { id: 1846, status: 0, title: '2023春节杭州工会车票补贴报销资格一览 2023春节杭州工会车票补贴报销资格' },
    { id: 1851, status: 0, title: '2023春节杭州工会车票补贴报销时间一览 2023春节杭州工会车票补贴报销时间' },
    { id: 1876, status: 0, title: '2023杭州春节车票补贴哪些人可以申领 2023杭州工会车票补贴哪些人可以申领？' },
    { id: 1884, status: 0, title: '2023杭州春节车票补贴什么时候开始报销 2023杭州春节车票补贴什么时候开始报销？' },
    { id: 1885, status: 0, title: '2023杭州春节车票补贴什么时候开始报销 1.线上报销' },
    { id: 1886, status: 0, title: '2023杭州春节车票补贴什么时候开始报销 2.线下报销' },
  ], positive: 0, negtive: 0 }, { method: 'es', paragraphs: [
    { id: 2845, status: 0, title: '2023杭州春节车票补贴兑换须知一览' },
    { id: 2846, status: 0, title: '2023春节杭州工会车票补贴报销资格一览 2023春节杭州工会车票补贴报销资格' },
    { id: 2851, status: 0, title: '2023春节杭州工会车票补贴报销时间一览 2023春节杭州工会车票补贴报销时间' },
    { id: 2876, status: 0, title: '2023杭州春节车票补贴哪些人可以申领 2023杭州工会车票补贴哪些人可以申领？' },
    { id: 2884, status: 0, title: '2023杭州春节车票补贴什么时候开始报销 2023杭州春节车票补贴什么时候开始报销？' },
    { id: 2885, status: 0, title: '2023杭州春节车票补贴什么时候开始报销 1.线上报销' },
    { id: 2887, status: 0, title: '2023杭州春节车票补贴什么时候开始报销 2.线下报销哈哈哈' },
  ], positive: 0, negtive: 0 }],
}])

function usefulClicked(query: string, method: string, paragraph_id: number) {
  for (let i = 0; i < data.value.length; i++) {
    if (data.value[i].query !== query) {
      continue
    }
    for (let j = 0; j < data.value[i].items.length; j++) {
      if (data.value[i].items[j].method !== method) {
        continue
      }
      for (let k = 0; k < data.value[i].items[j].paragraphs.length; k++) {
        if (data.value[i].items[j].paragraphs[k].id !== paragraph_id) {
          continue
        }
        if (data.value[i].items[j].paragraphs[k].status === 0) {
          data.value[i].items[j].paragraphs[k].status = 1
          data.value[i].items[j].positive++
        }
        else if (data.value[i].items[j].paragraphs[k].status === 1) {
          data.value[i].items[j].paragraphs[k].status = 0
          data.value[i].items[j].positive--
        }
      }
    }
  }
}

function unusefulClicked(query: string, method: string, paragraph_id: number) {
  for (let i = 0; i < data.value.length; i++) {
    if (data.value[i].query !== query) {
      continue
    }
    for (let j = 0; j < data.value[i].items.length; j++) {
      if (data.value[i].items[j].method !== method) {
        continue
      }
      for (let k = 0; k < data.value[i].items[j].paragraphs.length; k++) {
        if (data.value[i].items[j].paragraphs[k].id !== paragraph_id) {
          continue
        }
        if (data.value[i].items[j].paragraphs[k].status === 0) {
          data.value[i].items[j].paragraphs[k].status = -1
          data.value[i].items[j].negtive--
        }
        else if (data.value[i].items[j].paragraphs[k].status === -1) {
          data.value[i].items[j].paragraphs[k].status = 0
          data.value[i].items[j].negtive++
        }
      }
    }
  }
}

function getClass(status: number) {
  if (status === 1) {
    return 'useful-clicked-line content-item'
  }
  if (status === -1) {
    return 'unuseful-clicked-line content-item'
  }
  return 'content-item'
}
</script>

<template>
  <div>
    <PageMain>
      问题：{{ data[0].query }}
    </PageMain>
    <PageMain v-for="(item, itemIndex) in data[0].items" :key="itemIndex">
      方法：{{ item.method }}
      <PageMain>
        <div v-for="(p, index) in item.paragraphs" :key="index">
          <div v-if="!data[0].intersection.includes(p.id)" :class="getClass(p.status)">
            <div>
              {{ p.title }}
            </div>
            <div class="content-useful">
              <div v-if="p.status === 0" @click="usefulClicked(data[0].query, item.method, p.id)">
                有效
              </div>
              <div v-if="p.status === 1" class="useful-clicked" @click="usefulClicked(data[0].query, item.method, p.id)">
                有效
              </div>
              <div v-if="p.status === 0" @click="unusefulClicked(data[0].query, item.method, p.id)">
                无效
              </div>
              <div v-if="p.status === -1" class="unuseful-clicked" @click="unusefulClicked(data[0].query, item.method, p.id)">
                无效
              </div>
            </div>
          </div>
        </div>
      </PageMain>
    </PageMain>
    <PageMain>
      共同段落：
      <PageMain>
        <div v-for="(p, index) in data[0].items[0].paragraphs" :key="index" class="content-item">
          <div v-if="data[0].intersection.includes(p.id)">
            <div>{{ p.title }}</div>
          </div>
        </div>
      </PageMain>
    </PageMain>
  </div>
</template>

<style scoped>
.content-item {
  display: flex;
  justify-content: space-between;
  height: 45px;
  padding: 0 10px;
  line-height: 45px;
  border-radius: 2px;

  .useful-clicked {
    background-color: #98bdf5;
  }

  .unuseful-clicked {
    color: white;
    background-color: #e9424a;
  }
}

.useful-clicked-line {
  background-color: #a2f888;
}

.unuseful-clicked-line {
  background-color: rgb(255 170 170);
}

.content-item:hover {
  background-color: #bcd6fd;

  /* background-color: #a2f888; */
}

.content-useful {
  display: flex;
  gap: 10px;
  margin-left: 10px;
  font-size: 14px;

  div {
    width: 70px;
    height: 30px;
    margin-top: 7px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    background-color: #f0f0f0;
  }
}
</style>
