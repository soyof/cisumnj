import { getValueType } from '../utils/utils';

const handleEventFn = (isFnForVal, binding, args) => {
  if (isFnForVal) {
    binding.value(args);
  } else {
    binding.value.eventFn && binding.value.eventFn(args);
  }
};

/**
 * 防抖
 * @type {{inserted(*, *): void, unbind(*, *): void}}
 */
export const debounce = {
  inserted(el, binding) {
    if (binding.expression) {
      let timer = null;
      let isCallNow = true;
      const isFnForVal = getValueType(binding.value) === 'function';
      const event = isFnForVal ? 'click' : (binding.value.event || 'click');
      const delay = isFnForVal ? 1000 : (binding.value.delay || 1000);
      const callNow = isFnForVal ? false : (binding.value.callNow || false);
      el.addEventListener(event, () => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          !callNow && handleEventFn(isFnForVal, binding, arguments);
          timer = null;
          isCallNow = false;
        }, delay);
        if (callNow && isCallNow) {
          handleEventFn(isFnForVal, binding, arguments);
          isCallNow = false;
        }
      });
    }
  },
  unbind(el, binding) {
    if (binding.expression) {
      el.removeEventListener(binding.value.event || 'click', null);
    }
  }
};

/**
 * 节流
 * @type {{inserted(*, *): void, unbind(*, *): void}}
 */
export const throttle = {
  inserted(el, binding) {
    if (binding.expression) {
      let timer = null;
      const isFnForVal = getValueType(binding.value) === 'function';
      const event = isFnForVal ? 'click' : (binding.value.event || 'click');
      const delay = isFnForVal ? 1000 : (binding.value.delay || 1000);
      el.addEventListener(event, () => {
        if (!timer) {
          timer = setTimeout(_ => {
            handleEventFn(isFnForVal, binding, arguments);
            clearTimeout(timer);
            timer = null;
          }, delay);
        }
      });
    }
  },
  unbind(el, binding) {
    if (binding.expression) {
      el.removeEventListener(binding.value.event || 'click', null);
    }
  }
};

export default {
  debounce,
  throttle
};
