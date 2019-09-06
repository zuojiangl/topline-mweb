import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
// 导入语言包
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

dayjs.extend(relativeTime)

export const fmDate = (value) => {
  // dayjs()获取当前时间
  // dayjs(value)指定的时间
  return dayjs().from(dayjs(value))
}
