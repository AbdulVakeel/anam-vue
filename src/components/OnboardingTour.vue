<template>
  <div v-if="isOpen" class="tour-overlay">
    <!-- Backdrop -->
    <div class="tour-backdrop" @click="closeTour"></div>

    <!-- Steps -->
    <div
      v-for="(step, index) in steps"
      :key="index"
    >
      <Transition name="fade-scale">
        <div
          v-show="currentStep === index"
          class="tour-step"
          :style="getStepPosition(step)"
          ref="tourStep"
        >
          <!-- Arrow (desktop only) -->
          <div class="tour-arrow" :class="step.arrowPosition || 'bottom'"></div>

          <div class="tour-content">
            <!-- Title + Content -->
            <h3 class="tour-title">{{ step.title }}</h3>
            <p class="tour-text">{{ step.content }}</p>

            <!-- Actions -->
            <div class="tour-actions">
              <button
                v-if="currentStep > 0"
                @click="prevStep"
                class="tour-button secondary"
              >
                ← Back
              </button>

              <button
                @click="nextStep"
                class="tour-button primary"
              >
                {{ currentStep === steps.length - 1 ? 'Finish' : 'Next →' }}
              </button>
            </div>

            <!-- Progress -->
            <div class="tour-progress">
              Step {{ currentStep + 1 }} of {{ steps.length }}
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, onUnmounted } from "vue";

const props = defineProps({
  steps: { type: Array, required: true },
});
const emit = defineEmits(["close"]);

const isOpen = ref(false);
const currentStep = ref(0);
const tourStep = ref(null);

const nextStep = () => {
  if (currentStep.value < props.steps.length - 1) currentStep.value++;
  else closeTour();
};
const prevStep = () => {
  if (currentStep.value > 0) currentStep.value--;
};
const closeTour = () => {
  isOpen.value = false;
  localStorage.setItem("onboardingCompleted", "true");
  emit("close");
};

const getStepPosition = (step) => {
  const isMobile = window.innerWidth < 768;
  if (!step.target || isMobile) {
    return {
      left: "50%",
      bottom: "20px",
      transform: "translateX(-50%)",
      width: "calc(100% - 40px)",
    };
  }

  const target = document.querySelector(step.target);
  if (!target) return {};
  const rect = target.getBoundingClientRect();
  const scrollTop = window.scrollY;
  const scrollLeft = window.scrollX;
  const offset = 12;

  switch (step.position) {
    case "top":
      return {
        top: `${rect.top + scrollTop - offset}px`,
        left: `${rect.left + scrollLeft + rect.width / 2}px`,
        transform: "translate(-50%, -100%)",
      };
    case "bottom":
      return {
        top: `${rect.bottom + scrollTop + offset}px`,
        left: `${rect.left + scrollLeft + rect.width / 2}px`,
        transform: "translate(-50%, 0)",
      };
    case "left":
      return {
        top: `${rect.top + scrollTop + rect.height / 2}px`,
        left: `${rect.left + scrollLeft - offset}px`,
        transform: "translate(-100%, -50%)",
      };
    case "right":
      return {
        top: `${rect.top + scrollTop + rect.height / 2}px`,
        left: `${rect.right + scrollLeft + offset}px`,
        transform: "translate(0, -50%)",
      };
    default:
      return {
        top: `${rect.top + scrollTop + rect.height / 2}px`,
        left: `${rect.left + scrollLeft + rect.width / 2}px`,
        transform: "translate(-50%, -50%)",
      };
  }
};

const startTour = () => {
  isOpen.value = true;
  currentStep.value = 0;
};

onMounted(() => window.addEventListener("resize", () => nextTick(() => {})));
onUnmounted(() => window.removeEventListener("resize", () => {}));

defineExpose({ startTour });
</script>

<style scoped>
/* Overlay */
.tour-overlay {
  @apply fixed inset-0 z-[9999];
}
.tour-backdrop {
  @apply absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm;
}

/* Step */
.tour-step {
  @apply absolute bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-5 max-w-sm w-auto;
}

/* Content */
.tour-title {
  @apply text-xl font-bold text-gray-900 dark:text-white mb-2;
}
.tour-text {
  @apply text-gray-600 dark:text-gray-300 mb-4 leading-relaxed;
}

/* Actions */
.tour-actions {
  @apply flex justify-between gap-3 mt-3;
}
.tour-button {
  @apply px-4 py-2 rounded-sm font-medium transition-all;
}
.tour-button.primary {
  @apply bg-blue-600 text-white hover:bg-blue-700;
}
.tour-button.secondary {
  @apply bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600;
}

/* Progress */
.tour-progress {
  @apply text-sm text-gray-500 dark:text-gray-400 mt-3 text-right;
}

/* Arrow */
.tour-arrow {
  @apply absolute w-4 h-4 bg-white dark:bg-gray-900 transform rotate-45 shadow-md;
}
.tour-arrow.bottom {
  @apply -top-2 left-1/2 -translate-x-1/2;
}
.tour-arrow.top {
  @apply -bottom-2 left-1/2 -translate-x-1/2;
}
.tour-arrow.left {
  @apply -right-2 top-1/2 -translate-y-1/2;
}
.tour-arrow.right {
  @apply -left-2 top-1/2 -translate-y-1/2;
}

/* Mobile Bottom Sheet */
@media (max-width: 767px) {
  .tour-step {
    @apply fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] rounded-xl;
  }
  .tour-arrow {
    display: none;
  }
}

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.25s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
