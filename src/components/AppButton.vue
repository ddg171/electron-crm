<template>
  <button class="aps-button" :color="props.color" :size="props.size" :disabled="props.disabled">
    <slot />
  </button>
</template>

<script lang="ts" setup>
// import { defineProps } from "vue";

type Size = "small" | "normal";

type Color = "gray" | "orange" | "green" | "blue" | "white" | "red" | "purple";

interface Props {
  size:Size
  coler:Color
  disabled:boolean
}

const props= withDefaults(defineProps<Props>(),{
  size:"normal",
  color:"green",
  disabled:false
})

</script>

<style scoped>
.aps-button {
  margin: 0.5rem 2.5rem;

  font-size: 25px;
  height: 80px;
  min-width: 250px;
  outline: none;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  vertical-align: text-bottom;
}

.aps-button[size="small"] {
  font-size: 20px;
  height: 40px;
  min-width: 125px;
  margin: 0.25rem 0.5rem;
}

.aps-button:focus {
  outline: none;
}

.aps-button:disabled {
  color: white !important;
  border-style: none !important;
  background: #c7c7c7 !important;
}

.aps-button[color="green"] {
  color: #00805a;
  border-radius: 5px;
  background: linear-gradient(#d6f6ed 0%, #72cfb4 100%);
  border: 1px solid #4bb294;
}

.aps-button[color="green"]:hover {
  background: linear-gradient(#72cfb4 0%, #d6f6ed 100%);
}

.aps-button[color="orange"] {
  color: white;
  background: linear-gradient(#f4aa81 0%, #f7dbcb 0%, #f2884c 100%);
  border: 1px solid #f2884c;
}

.aps-button[color="orange"]:hover {
  background: linear-gradient(#f2884c 0%, #f4aa81 100%, #f7dbcb 100%);
}

.aps-button[color="blue"] {
  color: white;
  background: #25467d;
  border-color: #707070;
}

.aps-button[color="blue"]:hover {
  color: white;
  background: #496daa;
  border-color: #707070;
}

.aps-button[color="white"] {
  background: #ffffff;
  border-color: #000000;
}

.aps-button[color="white"]:hover {
  background-color: linear-gradient(#fff 0%, #d0d0d0 100%);
  border: 1px solid #bfbfbf;
}

.aps-button[color="gray"] {
  color: #707070;
  background: linear-gradient(#fff 0%, #d0d0d0 100%);
  border: 1px solid #bfbfbf;
}

.aps-button[color="gray"]:hover {
  background: linear-gradient(#d0d0d0 0%, #fff 100%);
}

.aps-button[color="red"] {
  color: white;
  background: #f00;
  border-style: none;
}

.aps-button[color="red"]:hover {
  color: white;
  background: rgb(240, 75, 75);
  border-style: none;
}

.aps-button[color="purple"] {
  color: white;
  background: #80004d;
  border-color: #80004d;
  border-style: none;
}

@media (max-width: 768px) {
  .aps-button {
    width: 100%;
  }
}
</style>
