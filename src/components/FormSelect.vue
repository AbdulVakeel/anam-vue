<template>
  <div>
    <label v-if="label" :for="id" class="block mb-1">{{ label }}</label>
    <select
      :id="id"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      class="border rounded px-3 py-2 w-full"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "FormSelect",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style scoped>


.select {
  width: 40px;
  height: 20px;
  appearance: none;
  background: #ccc;
  border-radius: 999px;
  position: relative;
  outline: none;
  cursor: pointer;
}
.toggle-checkbox:checked {
  background: #4caf50;
}
.toggle-checkbox:checked::before {
  transform: translateX(20px);
}
.option{
  content: "";
  position: absolute;
  width: 18px;
  height: 18px;
  background: white;
  border-radius: 50%;
  top: 1px;
  left: 1px;
  transition: transform 0.2s;
}
</style>