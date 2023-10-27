import React, { useState, useEffect } from 'react'
import { TbodyProps, SelectedDataProps } from '../interface'
import { theadWithHalfHours, theadWithHours } from '../config/thead.js'
import { weeks } from '../config/tbody.js'
import { sort, sortHour, handleRange, handleDayRange, handleCheckedData } from '../util/index'
import "../less/time-range-picker-tbody.less"
import WeekTimeRangeSelected from './weekTimeRangeSelected'

let hasStart = false // 判断mousedown时起始点是否在cacheChecked中
let isDrag = false
let cach = {
  cacheStart: { // 缓存mousedown的起始时间数据
    iden: '',
    hour: '',
    group: ''
  },
  cacheEnd: { // 缓存mouseup的终点时间数据
    iden: '',
    hour: '',
    group: ''
  }
}


const WeekTimeRangePickerTbody: React.FunctionComponent<TbodyProps> = (props: TbodyProps) => {
  const [checkedDatas, setCheckedDatas] = useState<SelectedDataProps[]>(props.checkedDatas)

  useEffect(() => {
    document.body.addEventListener('mouseup', handleBodyMouseup)
    return () => document.body.removeEventListener('mouseup', handleBodyMouseup)
  })

  const { hasHalfHour, handleDrag, handleSelect, handleMoveout } = props
  const hours = hasHalfHour ? theadWithHalfHours : theadWithHours
  const colspan = hasHalfHour ? 1 : 2

  const handleBodyMouseup = (e) => {
    if (e && !e.target.dataset.hour) {
      isDrag = false
    }
  }

  /**
   * @desc Record the corresponding start time data during the mousedown event.
   *       The logic here is based on the starting point to determine whether to select or deselect. Therefore, it should first check if the starting point is in a selected state.
   *       If it is, then all times within the box selection range will be deselected. Otherwise, they will all be selected.
   */
  const handleMousedown = (e) => {
    e.preventDefault()
    e.stopPropagation()
    isDrag = true
    if (handleSetVal(e, 'cacheStart')) {
      const dragData = {
        type: 'down',
        clientX: e.clientX,
        clientY: e.clientY,
        layerX: e.nativeEvent.layerX,
        layerY: e.nativeEvent.layerY,
        iden: cach.cacheStart.iden,
        hour: cach.cacheStart.hour
      }
      handleDrag(dragData)
    }
    isHasStart(cach.cacheStart.iden, cach.cacheStart.hour)
    handleSelect(checkedDatas)
  }
  /**
   * @desc mouseup事件时记录下对应的终点时间数据，同时去计算选中的时间范围
   */
  const handleMouseup = (e) => {
    e.preventDefault()
    e.stopPropagation()
    isDrag = false
    handleSetVal(e, 'cacheEnd')
    clearCache('cacheStart')
    clearCache('cacheEnd')
    handleDrag({type: 'up'})
  }
  const handleMousemove = (e) => {
    if (!e.target.dataset.hour) {
      return
    }
    handleMoveout(false)
    const dragData = {
      type: 'move',
      clientX: e.clientX,
      clientY: e.clientY,
      layerX: e.nativeEvent.layerX,
      layerY: e.nativeEvent.layerY,
      iden: e.target.dataset.iden,
      hour: e.target.dataset.hour,
      value: e.target.dataset.value,
      isDrag: isDrag
    }
    handleDrag(dragData)
  }
  /**
   * @desc Process data when moving in/out of cacheChecked.
   *       1. Need to check if the hour already exists for that date in cacheChecked. If not, add it; otherwise, remove it.
   *       2. Need to check if the iden (day of the week) already exists in cacheChecked. If not, add it; if it exists but all hours in that iden are deselected, then remove that iden.
   */
  const handleData = (iden, hour) => {
    let cacheChecked = checkedDatas
    const {has, idenIndex, index} = isHasStart(iden, hour)
    if (!has) {
      cacheChecked.push({
        iden: iden,
        times: [hour]
      })
      setCheckedDatas([...cacheChecked]) // 大坑，重新开辟一个数组引用才行
      return
    }
    if (!hasStart) {
      cacheChecked[idenIndex].times.push(hour)
      setCheckedDatas([...cacheChecked])
      return
    }
    const exist = cacheChecked[idenIndex].times.length === 1
    exist ? cacheChecked.splice(idenIndex, 1) : cacheChecked[idenIndex].times.splice(index, 1)
    setCheckedDatas([...cacheChecked])
  }
  /**
   * @desc 触发事件时，抽出相同赋值代码
   */
  const handleSetVal = (e, key) => {
    if (e.target.dataset.hour) {
      let iden = e.target.dataset.iden,
          hour = e.target.dataset.hour
      cach[key].iden = iden
      cach[key].hour = hour
      cach[key].group = iden + hour
      key === 'cacheStart' && isHasStart(iden, hour)
      key === 'cacheEnd' && cach[key].group === cach.cacheStart.group && handleData(iden, hour)
      key === 'cacheEnd' && cach[key].group !== cach.cacheStart.group && confirmRange()
      return true
    }
    return false
  }
  // Clear cached cacheStart and cacheEnd
  const clearCache = (key) => {
    cach[key].iden = ''
    cach[key].hour = ''
    cach[key].group = ''
  }
  // Clear all data
  const handleEmpty = () => {
    hasStart = false
    clearCache('cacheStart')
    clearCache('cacheEnd')
    setCheckedDatas([])
    handleSelect([])
  }
  /**
   * @desc Given that both click and mousedown require iterating through the array to determine if the current time already exists, common code is extracted.
   *       The returned values:
   *       has: Check if the iden (day of the week from Monday to Sunday) exists in cacheChecked.
   *       idenIndex: The index of the iden in cacheChecked.
   *       index: The index of the hour corresponding to the date in cacheChecked.
   */
  const isHasStart = (iden, hour?: string) => {
    hasStart = false
    let cacheChecked = checkedDatas,
        l = cacheChecked.length,
        has = false,
        index,
        idenIndex
    for (let i = 0; i < l; i++) {
      if (cacheChecked[i].iden === iden) {
        idenIndex = i
        index = cacheChecked[i].times.indexOf(hour)
        has = true
        hasStart = index !== -1
        break
      }
    }
    return {has, idenIndex, index}
  }
  /**
   * @desc 根据 cacheStart 和 cacheEnd 确定时间范围，修改cacheChecked
   *       hasStart false 框选范围内 时间做选中操作
   *                true 框选范围内 时间做取消选中操作
   */
  const confirmRange = () => {
    let daysArr = [cach.cacheStart.iden, cach.cacheEnd.iden],
        hoursArr = [cach.cacheStart.hour, cach.cacheEnd.hour],
        tempHasStart = hasStart,
        cacheChecked = JSON.parse(JSON.stringify(checkedDatas));
    const dayRange = handleDayRange(daysArr.sort(sort))
    const timeRange = handleRange(hasHalfHour, hoursArr.sort(sortHour)) // 框选的时间范围
    for (let i = 0; i < dayRange.length; i++) {
      let {has, idenIndex} = isHasStart(dayRange[i])
      handleCheckedData({ cacheChecked, hasStart: tempHasStart, has, idenIndex, iden: dayRange[i], timeRange})
    }
    setCheckedDatas(cacheChecked)
    handleSelect(cacheChecked)
  }

  useEffect(() => {
    setCheckedDatas(props.checkedDatas)
  }, [props.checkedDatas]);

  return (
    <tbody className="wtrp-tbody" 
      onMouseDown={handleMousedown}
      onMouseUp={handleMouseup}
      onMouseMove={handleMousemove}
    >
      {
        weeks.map((item, i) => {
          return (
            <tr className="wtrp-tbody-tr" key={i}>
              <td className="week-td">{item.week}</td>
              {
                hours.map((hour, index) => {
                  return (
                    <td colSpan={colspan} 
                      className={
                        checkedDatas.some(checked => {
                          return checked.iden === item.iden && checked.times.indexOf(hour.time) !== -1
                        }) ? 'wtrp-active-td' : 'wtrp-freeze-td'
                      }
                      key={index} 
                      data-hour={hour.time} 
                      data-iden={item.iden}
                      data-value={`${item.week} ${hour.time}`}
                    >
                    </td>
                  )
                })
              }
            </tr>
          )
        })
      }
      <WeekTimeRangeSelected hasHalfHour={hasHalfHour} checkedDatas={checkedDatas} handleEmpty={handleEmpty}/>
    </tbody>
  )
}

export default WeekTimeRangePickerTbody
