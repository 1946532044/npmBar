## loading按钮使用demo

> 一般情况

```vue
<template>
	<el-loading-button type="primary" @click="handleClick">提交</el-loading-button>
</template>
<script>
export default{
    methods: {
        handleClick(done){
            setTimeout(() => {
        		done()
      		}, 3000);
        }
    }
}
</script>
```

> 带参数情况

```  vue
<template>
	<el-loading-button @click="handleClick(123,$event)">提交</el-loading-button>
</template>
<script>
export default{
    methods: {
        handleClick(id,done){
            setTimeout(() => {
        		done()
      		}, 3000);
        }
    }
}
</script>
```