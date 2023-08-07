<template>
  <Overlay v-if="showClose" @click="emits('click-outside')">
    <el-card @click.stop="()=>{}">
      <UserEditForm :initial-value="props.user" @submit="emits('update')" />
    </el-card>
  </Overlay>
</template>


<script setup lang="ts">
import {computed} from 'vue';
import {User} from '../../../electron/model/users';
import Overlay from '../Overlay.vue';
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