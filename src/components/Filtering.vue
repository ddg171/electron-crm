<template>
  <!-- テーブルに表示するデータの絞り込み条件を設定するコンポーネント -->
  <!-- キーワードとカテゴリをv-modelで受け取る -->
  <el-row>
    <el-input-item label="絞り込み">
      <el-input v-model="keyword" placeholder="キーワードを入力してください" />
    </el-input-item>
    <el-input-item>
      <el-select v-model="category" placeholder="カテゴリを選択してください">
        <el-option v-for="category in categories" :key="category.id" :label="category.name" :value="category.id" />
      </el-select>
    </el-input-item>
  </el-row>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  keyword: string
  categories:{id: number, name: string}[]
  category: string
}

interface Emits {
  (e:'update:keyword',value: string): void
  (e:'update:category',mvalue: string): void
}

const props = defineProps<Props>()

const emits = defineEmits<Emits>()

const keyword = computed<string>({
  get: () => props.keyword,
  set: (value) => emits('update:keyword', value),
})