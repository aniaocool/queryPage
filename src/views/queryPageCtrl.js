export default{
  testCtrl:{
    goDetail1:function(){
      this.dialogController = 'testCtrl'
      console.log('detail1')
      this.$nextTick(()=>{
        setTimeout(()=>{
          this.$refs['testCtrl'].dialogShow = true
        },100)
      })
    },
    goDetail2:function(){
      this.dialogController = 'testCtrl2'
      this.$nextTick(()=>{
        setTimeout(()=>{
          this.$refs['testCtrl2'].dialogShow = true
        },100)
      })
    },
    goDetail3:function(row,index,typeIndex){
      console.log('detail3',row,index,typeIndex)
    },
    goDetail4:function(row,index,typeIndex){
      console.log('detail4',row,index,typeIndex)
    },
    goDetail5:function(row,index,typeIndex){
      console.log('detail5',row,index,typeIndex)
    },
    see:()=>{
      console.log('see')
    }
  }
}