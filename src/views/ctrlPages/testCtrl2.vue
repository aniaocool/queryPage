<template>
  <div>
    <el-dialog width="60%" title="detail2" :visible.sync="dialogShow">
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "testCtrl2",
  data() {
    return {
      dialogShow: false,
    };
  },
};
</script>
