<template>
  <div>
    <el-dialog width="60%" title="detail1" :visible.sync="dialogShow">
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "testCtrl",
  data() {
    return {
      dialogShow: false,
    };
  },
};
</script>
