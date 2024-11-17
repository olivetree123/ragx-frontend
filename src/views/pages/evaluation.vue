<route lang="yaml">
meta:
  title: 导航1
</route>

<script setup lang="ts">
import { GetReportList, GetReportMethods, MarkReport } from '@/api/report'
import { ref } from 'vue'

const project_id = '8718f49a8ca54523ac538dd196ff9b0a'
const idx = ref(0)
const selectedMethods = ref<string[]>([])
const methods = ref<any[]>([])
const reportList = ref<any[]>([])
// const selectedKind = ref('all')
// const kinds = ref<any[]>([
//   { label: '全部', value: 'all' },
//   { label: '待评分', value: 'useful' },
//   { label: '已评分', value: 'unuseful' },
// ])

GetReportMethods().then((res) => {
  for (let i = 0; i < res.data.length; i++) {
    methods.value.push({ label: res.data[i], value: res.data[i] })
  }
})

// GetReportList({ page: 1, methods: ['Milvus', 'Milvus-Rerank'] }).then((res) => {
//   reportList.value = res.data
// })

// const reportListData = ref([{
//   query: '杭州工会车票补贴的报销时间和须知？',
//   intersection: ref<number[]>([]),
//   items: [{ method: 'mv2', paragraphs: [
//     { id: 1845, status: 0, title: '2023杭州春节车票补贴兑换须知一览' },
//     { id: 1846, status: 0, title: '2023春节杭州工会车票补贴报销资格一览 2023春节杭州工会车票补贴报销资格' },
//     { id: 1851, status: 0, title: '2023春节杭州工会车票补贴报销时间一览 2023春节杭州工会车票补贴报销时间' },
//     { id: 1876, status: 0, title: '2023杭州春节车票补贴哪些人可以申领 2023杭州工会车票补贴哪些人可以申领？' },
//     { id: 1884, status: 0, title: '2023杭州春节车票补贴什么时候开始报销 2023杭州春节车票补贴什么时候开始报销？' },
//     { id: 1885, status: 0, title: '2023杭州春节车票补贴什么时候开始报销 1.线上报销' },
//     { id: 1886, status: 0, title: '2023杭州春节车票补贴什么时候开始报销 2.线下报销' },
//   ], positive: 0, negtive: 0 }, { method: 'es', paragraphs: [
//     { id: 2845, status: 0, title: '2023杭州春节车票补贴兑换须知一览' },
//     { id: 2846, status: 0, title: '2023春节杭州工会车票补贴报销资格一览 2023春节杭州工会车票补贴报销资格' },
//     { id: 2851, status: 0, title: '2023春节杭州工会车票补贴报销时间一览 2023春节杭州工会车票补贴报销时间' },
//     { id: 2876, status: 0, title: '2023杭州春节车票补贴哪些人可以申领 2023杭州工会车票补贴哪些人可以申领？' },
//     { id: 2884, status: 0, title: '2023杭州春节车票补贴什么时候开始报销 2023杭州春节车票补贴什么时候开始报销？' },
//     { id: 2885, status: 0, title: '2023杭州春节车票补贴什么时候开始报销 1.线上报销' },
//     { id: 2887, status: 0, title: '2023杭州春节车票补贴什么时候开始报销 2.线下报销哈哈哈' },
//   ], positive: 0, negtive: 0 }],
// }])

function usefulClicked(query: string, methods: string[], paragraph_id: number) {
  for (let i = 0; i < reportList.value.length; i++) {
    if (reportList.value[i].query !== query) {
      continue
    }
    for (let j = 0; j < reportList.value[i].items.length; j++) {
      if (reportList.value[i].items[j].method in methods) {
        continue
      }
      for (let k = 0; k < reportList.value[i].items[j].paragraphs.length; k++) {
        if (reportList.value[i].items[j].paragraphs[k].id !== paragraph_id) {
          continue
        }
        if (reportList.value[i].items[j].paragraphs[k].score === 0) {
          reportList.value[i].items[j].paragraphs[k].score = 1
          // reportList.value[i].items[j].positive++
          MarkReport({ query, methods, paragraph_id, project_id, score: 1 })
        }
        else if (reportList.value[i].items[j].paragraphs[k].score === 1) {
          reportList.value[i].items[j].paragraphs[k].score = 0
          // reportList.value[i].items[j].positive--
          MarkReport({ query, methods, paragraph_id, project_id, score: 0 })
        }
      }
    }
  }
}

function unusefulClicked(query: string, methods: string[], paragraph_id: number) {
  for (let i = 0; i < reportList.value.length; i++) {
    if (reportList.value[i].query !== query) {
      continue
    }
    for (let j = 0; j < reportList.value[i].items.length; j++) {
      if (reportList.value[i].items[j].method in methods) {
        continue
      }
      for (let k = 0; k < reportList.value[i].items[j].paragraphs.length; k++) {
        if (reportList.value[i].items[j].paragraphs[k].id !== paragraph_id) {
          continue
        }
        if (reportList.value[i].items[j].paragraphs[k].score === 0) {
          reportList.value[i].items[j].paragraphs[k].score = -1
          // reportList.value[i].items[j].negtive--
          MarkReport({ query, methods, paragraph_id, project_id, score: -1 })
        }
        else if (reportList.value[i].items[j].paragraphs[k].score === -1) {
          reportList.value[i].items[j].paragraphs[k].score = 0
          // reportList.value[i].items[j].negtive++
          MarkReport({ query, methods, paragraph_id, project_id, score: 0 })
        }
      }
    }
  }
}

function getClass(score: number) {
  if (score === 1) {
    return 'useful-clicked-line content-item'
  }
  if (score === -1) {
    return 'unuseful-clicked-line content-item'
  }
  return 'content-item'
}

function getQueryList() {
  GetReportList({ page: 1, methods: selectedMethods.value }).then((res) => {
    reportList.value = res.data
  })
}
function getPrev() {
  idx.value--
  if (idx.value < 0) {
    idx.value = reportList.value.length - 1
  }
}

function getNext() {
  idx.value++
  if (idx.value >= reportList.value.length) {
    idx.value = 0
  }
}
</script>

<template>
  <div>
    <PageMain>
      <div style="display: flex;flex-direction: row;justify-content: start;">
        <div style="margin-right: 20px;">
          选择方法：
          <el-select
            v-model="selectedMethods"
            multiple
            placeholder=""
            style="width: 300px;"
          >
            <el-option
              v-for="item in methods"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <!-- <div style="margin-right: 20px;">
          <el-select v-model="selectedKind" placeholder="" style="width: 150px">
            <el-option
              v-for="item in kinds"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div> -->
        <div>
          <!-- <el-button type="primary" @click="getQueryList">
            确定
          </el-button> -->
          <div class="btn-primary" @click="getQueryList">
            确定
          </div>
        </div>
      </div>
    </PageMain>
    <div v-if="reportList.length > 0">
      <PageMain>
        <div style="display: flex;justify-content: space-between;">
          <div>
            <el-tag type="primary" class="mytag">
              问题 {{ idx }}
            </el-tag>{{ reportList[idx].query }}
          </div>
          <div style="display: flex;">
            <div class="btn1" @click="getPrev">
              上一个
            </div>
            <div class="btn2" @click="getNext">
              下一个
            </div>
          </div>
        </div>
      </PageMain>
      <PageMain v-for="(item, itemIndex) in reportList[idx].items" :key="itemIndex" :title="item.method">
        <div v-for="(p, index) in item.paragraphs" :key="index">
          <div v-if="!reportList[idx].intersection.includes(p.id)" :class="getClass(p.score)">
            <div>
              {{ p.title }}
            </div>
            <div class="content-useful">
              <div v-if="p.score === 0" @click="usefulClicked(reportList[idx].query, [item.method], p.id)">
                有效
              </div>
              <div v-if="p.score === 1" class="useful-clicked" @click="usefulClicked(reportList[idx].query, [item.method], p.id)">
                有效
              </div>
              <div v-if="p.score === 0" @click="unusefulClicked(reportList[idx].query, [item.method], p.id)">
                无效
              </div>
              <div v-if="p.score === -1" class="unuseful-clicked" @click="unusefulClicked(reportList[idx].query, [item.method], p.id)">
                无效
              </div>
            </div>
          </div>
        </div>
      </PageMain>
      <PageMain title="共同段落">
        <div v-if="reportList[idx].intersection.length > 0">
          <div v-for="(p, index) in reportList[idx].intersection" :key="index" class="content-item">
            <div>{{ p.title }}</div>
            <div class="content-useful">
              <div v-if="p.score === 0" @click="usefulClicked(reportList[idx].query, selectedMethods, p.id)">
                有效
              </div>
              <div v-if="p.score === 1" class="useful-clicked" @click="usefulClicked(reportList[idx].query, selectedMethods, p.id)">
                有效
              </div>
              <div v-if="p.score === 0" @click="unusefulClicked(reportList[idx].query, selectedMethods, p.id)">
                无效
              </div>
              <div v-if="p.score === -1" class="unuseful-clicked" @click="unusefulClicked(reportList[idx].query, selectedMethods, p.id)">
                无效
              </div>
            </div>
          </div>
        </div>
      </PageMain>
    </div>
  </div>
</template>

<style scoped>
.mytag {
  font-size: 13px;
  border-radius: 2px;
}

.btn-primary {
  padding: 5px 10px;
  font-size: 15px;
  color: #fff;
  cursor: pointer;
  background-color: #409eff;
  border: none;
  border-radius: 2px;
}

.btn1 {
  padding: 5px 10px;
  margin-left: 10px;
  font-size: 15px;
  color: white;
  cursor: pointer;
  background-color: #e6a23c;
  border-radius: 2px;
}

.btn2 {
  padding: 5px 10px;
  margin-left: 10px;
  font-size: 15px;
  color: white;
  cursor: pointer;
  background-color: #f56c6c;
  border-radius: 2px;
}

.content-item {
  display: flex;
  justify-content: space-between;
  height: 40px;
  padding: 0 10px;
  font-size: 14px;
  line-height: 40px;
  color: #333;
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
