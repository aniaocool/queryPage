const ctrls = {
  testCtrl:()=> import('./ctrlPages/testCtrl.vue'),
  testCtrl2:()=> import('./ctrlPages/testCtrl2.vue')
}

export default{
  data(){
    return{
      comData:'',
      componentsData:null
    }
  },
  methods:{},
  watch:{
    dialogController:function(newValue,oldValue){
      if(newValue&&oldValue!=newValue){
        this.componentsData = ctrls[newValue]
      }else{
        this.componentsData = null
      }
    }
  }
}