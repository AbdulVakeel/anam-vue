<template>
  <div class="flex items-center">
    <label :for="id" class="mr-2">{{ label }}</label>
    <input
      type="checkbox"
      :id="id"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
      class="toggle-checkbox"
    />
  </div>
</template>

<script>
export default {
  name: "FormToggle",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
  },
};
</script>

<style>
.toggle-checkbox {
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
.toggle-checkbox::before {
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
