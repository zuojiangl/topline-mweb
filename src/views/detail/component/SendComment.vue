<template>
  <div class="add-comment">
    <div class="input-wrap">
      <input type="text" v-model="content">
    </div>
    <div class="more-wrap">
      <van-icon
        v-if="!isArticle"
        name="star-o"></van-icon>
      <van-button
        @click="handleSend"
        size="small">发布</van-button>
    </div>
  </div>
</template>

<script>
import { sendComment } from '@/api/comment'
import eventHub from '@/utils/eventHub'

export default {
  name: 'SendComment',
  // 接收target 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id
  props: ['isArticle', 'target', 'art_id'],
  data () {
    return {
      content: ''
    }
  },
  methods: {
    async handleSend () {
      // 判断是否登录
      if (!this.$checkLogin()) {
        return
      }
      if (this.content.length === 0) {
        this.$toast('请输入评论内容')
        return
      }
      // 发布评论
      try {
        const data = await sendComment({
          target: this.target,
          content: this.content,
          artId: this.art_id
        })
        // 触发事件
        eventHub.$emit('sendSuccess', {
          comment: data.new_obj,
          isArticle: this.isArticle
        })
        // console.log(data)
        this.content = ''
      } catch (err) {
        this.$toast.fail('发送失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.add-comment {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #fff;
  padding: 20px;
  border-top: 4px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .input-wrap {
    padding: 10px;
    border: 2px solid #ccc;
    border-radius: 20px;
    height: 60px;
    display: flex;
    align-items: center;
    width: 50%;
    input {
      border: none;
      color: #999;
      font-size: 30px;
    }
  }
  .more-wrap {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
  }
}
</style>
