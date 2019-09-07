<template>
  <van-popup
    :value="value"
    @input="$emit('input',$event)"
    position="bottom"
    :style="{ height: '90%' }"
  >
    <van-cell icon="cross" @click="$emit('input',false)"></van-cell>
    <!-- 我的频道 -->
    <van-cell title="我的频道" label="点击进入频道">
      <van-button
        round
        type="danger"
        size="mini"
        v-show="!isEdit"
        @click="isEdit=true">
        编辑
        </van-button>
      <van-button
        round
        type="danger"
        size="mini"
        v-show="isEdit"
        @click="isEdit=false">
        完成
        </van-button>
    </van-cell>
    <van-grid>
        <van-grid-item
         v-for="(channel,index) in channels"
         :key="channel.id"
         @click="handleMyChannelItem(index,channel.id)">
          <div slot="text" class="van-grid-item__text" :class="{active:active === index}">
             {{channel.name}}
          </div>
          <!-- 关闭按钮 -->
          <van-icon slot="icon" v-show="isEdit && index !== 0" class="close-icon" name="close"></van-icon>
        </van-grid-item>
    </van-grid>
    <van-cell title="单元格" value="内容" label="描述信息" />
    <van-grid>
        <van-grid-item v-for="channel in recommendChannels" :key="channel.id" :text="channel.name">
        </van-grid-item>
    </van-grid>
  </van-popup>
</template>

<script>
import { getAllChannels, deleteChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/localStorage'

export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState(['user']),
    recommendChannels () {
      // 1.获取我的频道中所有id组成的数组
      // map() 遍历数组，返回一个新数组，新数组中的元素由回调函数中返回的元素组成
      const ids = this.channels.map((channel) => {
        return channel.id
      })
      // 2.过滤所有频道，把频道id出现在上面数组中的项去除
      // filter() 把满足条件的item，返回组成一个新的数组
      return this.allChannels.filter((channel) => {
        // includes() es6新增，判断数组中是否包含某一项
        return !ids.includes(channel.id)
      })
    }
  },
  data () {
    return {
      // 是否是编辑模式
      isEdit: false,
      // 储存所有频道
      allChannels: []
    }
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    // 加载所有频道列表
    async loadAllChannels () {
      try {
        const data = await getAllChannels()
        this.allChannels = data.channels
      } catch (err) {
        console.log(err)
      }
    },
    // 点击我的频道时
    async handleMyChannelItem (index, channelId) {
      // 1.非编辑模式
      if (!this.isEdit) {
        // 告诉父组件，选中的频道的索引
        // 关闭对话框
        this.$emit('activeChange', index)
      }
      // 2.编辑模式
      // 2.1把点击的频道，从我的频道移除
      this.channels.splice(index, 1)
      // 2.2判断是否登录
      // 通过mapstate做了映射
      if (this.user) {
        // 2.3 如果登录，发送请求
        try {
          await deleteChannel(channelId)
        } catch (err) {
          this.$toast.fail('操作失败')
        }
        return
      }
      // 2.4 没有登陆，把频道列表记录到本地储存
      setItem('channels', this.channels)
    }
  }
}
</script>

<style lang="less" scoped>
.close-icon {
  position: absolute;
  right: 0;
  top: 0;
}
.active {
  color:red
}
</style>
