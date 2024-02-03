<template>
  <div>
    <h-table
      :columns="columns"
      :data="row || []"
      style="margin: 4px 30px 4px 30px;"
      border
    />
  </div>
</template>
<script>
export default {
  name: 'expandColumns',
  props: {
    row: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    };
  }
};
</script>
