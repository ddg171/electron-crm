<template>
  <AppModal :show-close="showClose" size="large" @click-outside="emits('click-outside')">
    <h3>顧客情報</h3>
    <el-row>
      <el-col>
        <UserEditForm :initial-value="props.user" @submit="emits('update')" />
      </el-col>
    </el-row>

  </AppModal>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {User} from '../../../electron/model/users';

import AppModal from './AppModal.vue';
import UserEditForm from "../form/user/Edit.vue"
const emits=defineEmits<{(e:"click-outside"):void,(e:"update"):void}>()

interface Props{
  user:User|null
}

const showClose = computed<boolean>(()=>{
  return !!props.user
})

const props=withDefaults(defineProps<Props>(),{user:null})

</script>