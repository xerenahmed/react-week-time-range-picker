import React, { useState, useEffect } from "react";
import { SelectedDataProps, ReactWeekTimeRangePickerProps, DragProps } from './interface'
import WeekTimeRangePickerThead from './components/weekTimeRangePickerThead'
import WeekTimeRangePickerTbody from './components/WeekTimeRangePickerTbody'
import "./less/base.less"
import "./less/index.less"
import "./less/time-range-picker-common.less"

let isFocus = false // Determine if the focus is obtained by clicking
let isMoveout = false // Determine if it's moved out of the time selection range
let startX = 0 // Record the e.clientX when the starting point is clicked
let startY = 0 // Record the e.clientY when the starting point is clicked
let startLayerX = 0 // Record the distance from the top left corner of the corresponding td to the x-axis of the table when the starting point is clicked
let startLayerY = 0 // Record the distance from the top left corner of the corresponding td to the y-axis of the table when the starting point is clicked
let topY = 0 // Record the vertical deviation of the boundary when the starting point is clicked
let leftX = 0 // Record the layerX - the distance from the left side of the td to the left side of the table when the starting point is clicked
let popperTop = 0 // Record the offset value of the prompt box relative to the bottom of the table
let popperLeft = 0 // Record the offset value of the prompt box relative to the left side of the table
let currentVal = '' // Cache the concatenated string of the current day and hour corresponding to the td
let nextTime = '' // Cache the next time of the current time, for example, if the current time is at 00:00, the next moment should be 00:30 or 01:00 (depending on whether hasHalfHour is determined)

const ReactWeekTimeRangePicker: React.FunctionComponent<ReactWeekTimeRangePickerProps> = (props: ReactWeekTimeRangePickerProps) => {
  const [isDrag, setIsDrag] = useState(false) // 控制拖拽框显影
  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [cacheChecked, setCacheChecked] = useState<SelectedDataProps[]>(props.selectedData || []) // 缓存被选中的时间数据

  useEffect(() => {
    document.body.addEventListener('mouseup', handleMouseup)
    document.body.addEventListener('mousemove', handleMousemove)
    return () => {
      document.body.removeEventListener('mouseup', handleMouseup)
      document.body.removeEventListener('mousemove', handleMousemove)
    }
  })

  const { hasHalfHour, selectTimeRange } = props


  // 获取被选中的数据，并抛给父组件
  const handleSelect = (selected: SelectedDataProps[]) => {
    setCacheChecked(selected)
    selectTimeRange && selectTimeRange(selected)
  }

  // 拖拽超过table范围后才释放
  const handleMouseup = (e) => {
    if (e && !e.target.dataset.hour) {
      setIsDrag(false)
    }
  }
  // 拖拽超过table范围
  const handleMousemove = (e) => {
    if (!e.target.dataset.hour) {
      isMoveout = true
    }
  }

  const handleMoveout = (isOut: boolean) => {
    isMoveout = isOut
  }

  // 计算拖拽框区域的核心代码
  const handleDrag = (props: DragProps) => {
    const { type, clientX, clientY, layerX, layerY, iden, hour, value, isDrag } = props
    if (type === 'up') {
      setIsDrag(false)
      isFocus = false
      return
    }
    let tempWidth, tempHeight
    const factor = hasHalfHour ? 2 : 1 // Determine the multiplier for td offset based on whether there is a half-hour
    // Convert the time corresponding to the starting point td, for example, '10:00', into the format ['10', '00']
    const hourMinuteArr = hour.split(':')
    // Determine which td in the row the starting point is located, in order to determine the clientX and clientY of the starting point td
    const tdIndex = ~~hourMinuteArr[1] ? ~~hourMinuteArr[0] * factor + 1 : ~~hourMinuteArr[0] * factor
    type === 'down' ? 
      handleDragDown({ clientX, clientY, layerX, layerY, iden, tdIndex }) :
        handleDragMove({ isDrag, layerX, layerY, tempWidth, tempHeight, iden, hour, value })
  }
  // 按下
  const handleDragDown = ({ clientX, clientY, layerX, layerY, iden, tdIndex }) => {
    setWidth(0)
    setHeight(0)
    setIsDrag(true)
    startX = clientX
    startY = clientY
    topY = layerY - iden * 20 - 40
    leftX = layerX - tdIndex * 24 - 60
    startLayerX = tdIndex * 24 + 60
    startLayerY = (~~iden * 20) + 40
    isFocus = false
    setTop(startY - topY)
    setLeft(startX - leftX)
  }
  // 可能是普通移动，也可能是拖拽移动
  const handleDragMove = ({ isDrag, layerX, layerY, tempWidth, tempHeight, iden, hour, value }) => {
    if (isDrag) {
      let diffX = layerX - startLayerX
      let diffY = layerY - startLayerY
      tempWidth = diffX > 0 ? diffX : 24 - diffX
      tempHeight = diffY > 0 ? diffY : 20 - diffY
      const newWidth = tempWidth % 20 === 0 && diffX > 0 ? Math.ceil(tempWidth / 24) * 24 + 1 : Math.ceil(tempWidth / 24) * 24
      const newHeight = tempHeight % 20 === 0 && diffY > 0 ? Math.ceil(tempHeight / 20) * 20 + 20 : Math.ceil(tempHeight / 20) * 20
      setWidth(newWidth)
      setHeight(newHeight)
      diffX < 0 ? setLeft(startX - leftX - width + 24) : setLeft(startX - leftX)
      diffY < 0 ? setTop(startY - topY - height + 20) : setTop(startY - topY)
    }
    isFocus = true
    // setIsFocus(true)
    // tipPosition(iden, hour, value)
  }

  /**
   * @param {string} iden The day of the week where the current td is located
   * @param {string} tdIndex The position of the current td in the tr
   * @desc Calculate the position of the tooltip
   *       popperLeft: Calculate the offset value of the tooltip from the left side of the table,
   *       popperLeft = The horizontal distance from the td to the right side of the week-td - ? (calculated based on whether there is a half-hour)
   *       ? ==> Depends on the width of the tooltip content. If there is no half-hour, it is half of the content width, which is exactly 31, approximately 32
   *       popperTop: Calculate the offset value of the tooltip from the bottom of the table,
   *       popperTop = The vertical height from the week where the td is located to the thead + thead height - (real-time table height + tooltip height)
   *       Bug Fix:
   *          1. When selecting a time period that spans more than 7 intervals, the week will occupy two rows, and the height will increase from 21 to 42. Therefore, it is necessary to iterate through the selected time data to determine how many rows it occupies in total.
   */
  // const tipPosition = (iden, time, value) => {
  //   const hour = ~~time.substring(0, 2)
  //   const minute = ~~time.substring(3)
  //   currentVal = value
  //   //  const tableHeight = this.$refs.table.clientHeight
  //   //  popperTop = (~~iden + 1) * 20 + 40 - tableHeight - 55
  //   // Only hours
  //    if (!hasHalfHour) {
  //      nextTime = hour + 1 >= 10 ? `${hour + 1}:00` : `0${hour + 1}:00`
  //      popperLeft = (hour - 1) * 24 + 13
  //      return
  //    }
  //    if (minute === 30) {
  //      nextTime = hour + 1 >= 10 ? `${hour + 1}:00` : `0${hour + 1}:00`
  //      popperLeft = (hour * 2) * 24 + 13
  //      return
  //    }
  //    nextTime = time.substring(0, 2) + ':30'
  //    popperLeft = (hour * 2 - 1) * 24 + 13
  //  }

  return (
    <div className="week-time-range-picker">
      {/* Drag and drop box */}
      {
        isDrag ? 
          <div className="wtrp-schedule" style={
            {
              left: `${left}px`,
              top: `${top}px`,
              width: `${width}px`,
              height: `${height}px`
            }
          }>
          </div> : null
      }
      <table className="wtrp-table">
        <WeekTimeRangePickerThead hasHalfHour={hasHalfHour} />
        <WeekTimeRangePickerTbody hasHalfHour={hasHalfHour} checkedDatas={cacheChecked} 
          handleDrag={handleDrag} 
          handleSelect={handleSelect} 
          handleMoveout={handleMoveout} 
        />
      </table >
      {/* <div className="wtrp-byted-popover-wrapper">
        <div className="ant-tooltip ant-tooltip-placement-top ant-tooltip-hidden">
          <div className="ant-tooltip-content">
            <div className="ant-tooltip-arrow"></div>
            <div className="ant-tooltip-inner">{1}</div>
          </div>
        </div>
      </div> */}
    </div >
  )
}

export default ReactWeekTimeRangePicker
