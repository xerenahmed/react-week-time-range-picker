import React, { useState, useEffect } from 'react';

const theadFirstTd = 'Gün / Saat';

const theadTimeRange = ['00:00 - 12:00', '12:00 - 24:00'];

// export const theadHours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

const theadWithHalfHours = [
  {
    hour: 0,
    time: '00:00'
  },
  {
    hour: 30,
    time: '00:30'
  },
  {
    hour: 1,
    time: '01:00'
  },
  {
    hour: 30,
    time: '01:30'
  },
  {
    hour: 2,
    time: '02:00'
  },
  {
    hour: 30,
    time: '02:30'
  },
  {
    hour: 3,
    time: '03:00'
  },
  {
    hour: 30,
    time: '03:30'
  },
  {
    hour: 4,
    time: '04:00'
  },
  {
    hour: 30,
    time: '04:30'
  },
  {
    hour: 5,
    time: '05:00'
  },
  {
    hour: 30,
    time: '05:30'
  },
  {
    hour: 6,
    time: '06:00'
  },
  {
    hour: 30,
    time: '06:30'
  },
  {
    hour: 7,
    time: '07:00'
  },
  {
    hour: 30,
    time: '07:30'
  },
   {
    hour: 8,
    time: '08:00'
  },
  {
    hour: 30,
    time: '08:30'
  },
  {
    hour: 9,
    time: '09:00'
  },
  {
    hour: 30,
    time: '09:30'
  },
  {
    hour: 10,
    time: '10:00'
  },
  {
    hour: 30,
    time: '10:30'
  },
  {
    hour: 11,
    time: '11:00'
  },
  {
    hour: 30,
    time: '11:30'
  },
  {
    hour: 12,
    time: '12:00'
  },
  {
    hour: 30,
    time: '12:30'
  },
  {
    hour: 13,
    time: '13:00'
  },
  {
    hour: 30,
    time: '13:30'
  },
  {
    hour: 14,
    time: '14:00'
  },
  {
    hour: 30,
    time: '14:30'
  },
  {
    hour: 15,
    time: '15:00'
  },
  {
    hour: 30,
    time: '15:30'
  },
  {
    hour: 16,
    time: '16:00'
  },
  {
    hour: 30,
    time: '16:30'
  },
  {
    hour: 17,
    time: '17:00'
  },
  {
    hour: 30,
    time: '17:30'
  },
  {
    hour: 18,
    time: '18:00'
  },
  {
    hour: 30,
    time: '18:30'
  },
  {
    hour: 19,
    time: '19:00'
  },
  {
    hour: 30,
    time: '19:30'
  },
  {
    hour: 20,
    time: '20:00'
  },
  {
    hour: 30,
    time: '20:30'
  },
  {
    hour: 21,
    time: '21:00'
  },
  {
    hour: 30,
    time: '21:30'
  },
  {
    hour: 22,
    time: '22:00'
  },
  {
    hour: 30,
    time: '22:30'
  },
  {
    hour: 23,
    time: '23:00'
  },
  {
    hour: 30,
    time: '23:30'
  },
];

const theadWithHours = [{
    hour: 0,
    time: '00:00'
  },
  {
    hour: 1,
    time: '01:00'
  },
  {
    hour: 2,
    time: '02:00'
  },
  {
    hour: 3,
    time: '03:00'
  },
  {
    hour: 4,
    time: '04:00'
  },
  {
    hour: 5,
    time: '05:00'
  },
  {
    hour: 6,
    time: '06:00'
  },
  {
    hour: 7,
    time: '07:00'
  },
  {
    hour: 8,
    time: '08:00'
  },
  {
    hour: 9,
    time: '09:00'
  },
  {
    hour: 10,
    time: '10:00'
  },
  {
    hour: 11,
    time: '11:00'
  },
  {
    hour: 12,
    time: '12:00'
  },
  {
    hour: 13,
    time: '13:00'
  },
  {
    hour: 14,
    time: '14:00'
  },
  {
    hour: 15,
    time: '15:00'
  },
  {
    hour: 16,
    time: '16:00'
  },
  {
    hour: 17,
    time: '17:00'
  },
  {
    hour: 18,
    time: '18:00'
  },
  {
    hour: 19,
    time: '19:00'
  },
  {
    hour: 20,
    time: '20:00'
  },
  {
    hour: 21,
    time: '21:00'
  },
  {
    hour: 22,
    time: '22:00'
  },
  {
    hour: 23,
    time: '23:00'
  },
];

const allHours = [
  '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', 
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
];

const allWithHalfHours = [
  '00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', 
  '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', 
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'
];

const WeekTimeRangePickerThead = (props) => {
    const hours = props.hasHalfHour ? theadWithHalfHours : theadWithHours;
    const colspan = props.hasHalfHour ? 1 : 2;
    return (React.createElement("thead", null,
        React.createElement("tr", null,
            React.createElement("th", { rowSpan: 8, className: "week-td" }, theadFirstTd),
            theadTimeRange.map((item, i) => {
                return React.createElement("th", { colSpan: 24, key: i }, item);
            })),
        React.createElement("tr", null, hours.map((item, i) => {
            return React.createElement("td", { colSpan: colspan, key: i }, item.hour);
        }))));
};

const weeks = [
  {
    iden: '0',
    week: 'Pazartesi'
  },
  {
    iden: '1',
    week: 'Salı'
  },
  {
    iden: '2',
    week: 'Çarşamba'
  },
  {
    iden: '3',
    week: 'Perşembe'
  },
  {
    iden: '4',
    week: 'Cuma'
  },
  {
    iden: '5',
    week: 'Cumartesi'
  },
  {
    iden: '6',
    week: 'Pazar'
  }
];

const weekMaps = new Map();
weeks.forEach((item) => {
  weekMaps.set(item.iden, item.week);
});

/**
 * 
 * @param {*} curr 
 * @param {*} next 
 * @description 普通排序，用于 星期一~日 排序
 */
const sort$1 = (curr, next) => {
  return curr - next
};

/**
 * @description 对框选范围内的起止时间进行排序
 */
const sortHour = (curr, next) => {
  return curr.substring(0, 2) - next.substring(0, 2)
};

/**
 * 
 * @param {*} hoursArr ["03:30", "06:30"]
 * @description 处理时间范围，将位于该时间范围内的所有时间段都放进数组中
 * 结果例如：["03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30"]
 */
const handleRange = (hasHalfHour, hoursArr) => {
  let startIndex, endIndex;
  // 没有半小时
  if (!hasHalfHour) {
    startIndex = allHours.indexOf(hoursArr[0]);
    endIndex = allHours.indexOf(hoursArr[1]);
    return allHours.slice(startIndex, endIndex + 1)
  }
  // 有半小时
  startIndex = allWithHalfHours.indexOf(hoursArr[0]);
  endIndex = allWithHalfHours.indexOf(hoursArr[1]);
  return allWithHalfHours.slice(startIndex, endIndex + 1)
};

/**
 * 
 * @param {*} arr 
 * @description 处理日期范围
 */
const handleDayRange = (arr) => {
  let temp = [];
  for (let i = arr[0]; i <= arr[1]; i++) {
    temp.push(String(i));
  }
  return temp
};

/**
 * 
 * @description 处理框选范围内的数据，构造成我所需要的数据结构，同时需要去重等逻辑步骤
 */
const handleCheckedData = ({cacheChecked, hasStart, has, idenIndex, iden, timeRange}) => {
  let temp = { // 缓存数据，不要在循环中声明，否则会开辟多个内存空间
    iden: iden,
    times: []
  };
  let timeIndex = -1;
  // 开始框选，此时处于起点td框内，只需要判断该td(时间)所处的日期是否在已选数据中，不在的话加进去
  if (!hasStart && !has) {
    cacheChecked.push(temp);
  }
  for (let i = 0; i < timeRange.length; i++) {
    // 查找当前时间是否之前已经被选中过了；例如之前的点击、框选行为
    timeIndex = !!has ? cacheChecked[idenIndex].times.indexOf(timeRange[i]) : -1;
    // 取消选中；对已选中的时间范围进行删减
    if (hasStart && has) {
      timeIndex >= 0 && cacheChecked[idenIndex].times.splice(timeIndex, 1);
      if (cacheChecked[idenIndex].times.length === 0) {
        cacheChecked.splice(idenIndex, 1);
        break
      }
      continue
    } 
    // 框选时间范围
    if (!hasStart) {
      // 已选中数据中已存在该星期，只是没有该时间
      if (timeIndex === -1 && idenIndex >= 0) {
        cacheChecked[idenIndex].times.push(timeRange[i]);
        continue
      }
      // 已选中数据中没有该星期数据
      temp.times.push(timeRange[i]);
    }
  }
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$4 = ".wtrp-tbody-tr > td + td {\n  cursor: pointer;\n}\n.wtrp-freeze-td {\n  background: #f5f5f5;\n}\n.wtrp-active-td {\n  background-color: #0590FF;\n}\n";
styleInject(css_248z$4);

var css_248z$3 = ".wtrp-fl {\n  float: left;\n}\n.wtrp-fr {\n  float: right;\n}\n.wtrp-flex {\n  display: flex;\n}\n.wtrp-flex-1 {\n  flex: 1;\n}\n.wtrp-break {\n  word-break: break-all;\n}\n";
styleInject(css_248z$3);

var css_248z$2 = ".wtrp-selected-td {\n  padding: 0 10px!important;\n}\n.wtrp-selected-td .tip-text {\n  color: #999;\n}\n.wtrp-selected-td .wtrp-clearfix:before {\n  content: \" \";\n  display: table;\n}\n.wtrp-selected-td .wtrp-clearfix:after {\n  content: \" \";\n  display: table;\n  clear: both;\n}\n.wtrp-selected-td .wtrp-selected-td__selected-time {\n  text-align: left;\n  line-height: 1;\n}\n.wtrp-selected-td .wtrp-selected-td__selected-time .wtrp-selected-text {\n  padding-right: 5px;\n}\n.wtrp-selected-td a {\n  cursor: pointer;\n  color: #598fe6;\n}\n";
styleInject(css_248z$2);

/**
 * @desc Sort the selected dates,
 *       Sort by iden: Monday ~ Sunday
 *       Sort by time: 00:00 ~ 23:00
 */
const sort = (curr, next) => {
    // TODO: curr undefined
    if (curr.iden) {
        return curr.iden - next.iden;
    }
    // 对 00:00和00:30排序
    if (curr.substring(0, 2) === next.substring(0, 2)) {
        return curr.substring(3) - next.substring(3);
    }
    return curr.substring(0, 2) - next.substring(0, 2);
};
/**
 * @desc Merge times, combining non-continuous time periods like [00:00, 01:00, 02:00]
 *       If there are half-hour intervals, then [00:00, 00:30, 01:00] need to be combined into [00:00, 01:00]
 */
const handleMergeTimes = (hasHalfHour, times) => {
    let mergeTimes = [[times[0]]];
    hasHalfHour ? handleMergeHalfHour(times, mergeTimes) : handleMergeHour(times, mergeTimes);
    return mergeTimes;
};
// 只有小时的数据合并
const handleMergeHour = (times, mergeTimes) => {
    times.forEach(item => {
        const lastMergeArr = mergeTimes.slice(-1)[0];
        const isNext = item.substring(0, 2) - lastMergeArr.slice(-1)[0].substring(0, 2) === 1;
        if (isNext) {
            lastMergeArr.push(item);
        }
        if (!isNext && item !== times[0]) {
            mergeTimes.push([item]);
        }
    });
};
// 带半小时的数据合并
const handleMergeHalfHour = (times, mergeTimes) => {
    times.forEach(item => {
        const lastMergeArr = mergeTimes.slice(-1)[0];
        // 00:00-00:30 或者 00:30 - 01:00
        // 小时*100 + 0或50，半小时转成50
        const lastMergeItem = lastMergeArr.slice(-1)[0];
        const itemNum = item.substring(0, 2) * 100 + (item.substring(3) === '30' ? 50 : 0);
        const lastMergeNum = lastMergeItem.substring(0, 2) * 100 + (lastMergeItem.substring(3) === '30' ? 50 : 0);
        const isNext = itemNum - lastMergeNum === 50;
        if (isNext) {
            lastMergeArr.push(item);
        }
        if (!isNext && item !== times[0]) {
            mergeTimes.push([item]);
        }
    });
    mergeTimes.forEach(item => {
        const hour = +item.slice(-1)[0].substring(0, 2);
        if (item.slice(-1)[0].substring(3) === '30') {
            hour > 8 ? item.push(`${hour + 1}:00`) : item.push(`0${hour + 1}:00`);
        }
        else {
            hour > 8 ? item.push(`${hour}:30`) : item.push(`0${hour}:30`);
        }
    });
};
// 如果是只有小时的话，需要处理下
const fromat = (last) => {
    if (!last) {
        return 'null';
    }
    const hour = ~~last.substring(0, 2) + 1;
    return hour > 9 ? `${hour}:00` : `0${hour}:00`;
};
const WeekTimeRangeSelected = (props) => {
    const { hasHalfHour, checkedDatas, handleEmpty } = props;
    // 增加数据字段，方便展示
    let cacheChecked = checkedDatas || [];
    cacheChecked.sort(sort).map((item, index) => {
        cacheChecked[index].week = weekMaps.get(item.iden);
        cacheChecked[index].mergeTimes = handleMergeTimes(hasHalfHour, item.times.sort(sort));
    });
    // 清除
    const handleClear = () => {
        handleEmpty();
    };
    return (React.createElement("tr", { className: "wtrp-time-range-selected" },
        React.createElement("td", { colSpan: 49, className: "wtrp-selected-td" },
            React.createElement("div", { className: "wtrp-clearfix" },
                checkedDatas.length === 0 ?
                    React.createElement("span", { className: "wtrp-fl tip-text" }, "Zaman aral\u0131\u011F\u0131n\u0131 se\u00E7mek i\u00E7in fareyi s\u00FCr\u00FCkleyin") :
                    React.createElement("span", { className: "wtrp-fl tip-text" }, "Se\u00E7ilen zaman dilimi"),
                React.createElement("a", { className: "wtrp-fr", onClick: handleClear }, "Se\u00E7imi Temizle")),
            cacheChecked.map((item, i) => {
                return (React.createElement("div", { className: "wtrp-selected-td__selected-time", key: i },
                    React.createElement("p", { className: "wtrp-flex wtrp-break" },
                        React.createElement("span", { className: "tip-text" },
                            item.week,
                            "\uFF1A"),
                        React.createElement("span", { className: "wtrp-flex-1" }, item.mergeTimes.map((time, timeIndex) => {
                            return React.createElement("span", { className: "wtrp-selected-text", key: timeIndex }, hasHalfHour ? `${time[0]}~${time[time.length - 1]}` : `${time[0]}~` + fromat(time[time.length - 1]));
                        })))));
            }))));
};

let hasStart = false; // 判断mousedown时起始点是否在cacheChecked中
let isDrag = false;
let cach = {
    cacheStart: {
        iden: '',
        hour: '',
        group: ''
    },
    cacheEnd: {
        iden: '',
        hour: '',
        group: ''
    }
};
const WeekTimeRangePickerTbody = (props) => {
    const [checkedDatas, setCheckedDatas] = useState(props.checkedDatas);
    useEffect(() => {
        document.body.addEventListener('mouseup', handleBodyMouseup);
        return () => document.body.removeEventListener('mouseup', handleBodyMouseup);
    });
    const { hasHalfHour, handleDrag, handleSelect, handleMoveout } = props;
    const hours = hasHalfHour ? theadWithHalfHours : theadWithHours;
    const colspan = hasHalfHour ? 1 : 2;
    const handleBodyMouseup = (e) => {
        if (e && !e.target.dataset.hour) {
            isDrag = false;
        }
    };
    /**
     * @desc Record the corresponding start time data during the mousedown event.
     *       The logic here is based on the starting point to determine whether to select or deselect. Therefore, it should first check if the starting point is in a selected state.
     *       If it is, then all times within the box selection range will be deselected. Otherwise, they will all be selected.
     */
    const handleMousedown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        isDrag = true;
        if (handleSetVal(e, 'cacheStart')) {
            const dragData = {
                type: 'down',
                clientX: e.clientX,
                clientY: e.clientY,
                layerX: e.nativeEvent.layerX,
                layerY: e.nativeEvent.layerY,
                iden: cach.cacheStart.iden,
                hour: cach.cacheStart.hour
            };
            handleDrag(dragData);
        }
        isHasStart(cach.cacheStart.iden, cach.cacheStart.hour);
    };
    /**
     * @desc mouseup事件时记录下对应的终点时间数据，同时去计算选中的时间范围
     */
    const handleMouseup = (e) => {
        e.preventDefault();
        e.stopPropagation();
        isDrag = false;
        handleSetVal(e, 'cacheEnd');
        clearCache('cacheStart');
        clearCache('cacheEnd');
        handleDrag({ type: 'up' });
        handleSelect(checkedDatas);
    };
    const handleMousemove = (e) => {
        if (!e.target.dataset.hour) {
            return;
        }
        handleMoveout(false);
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
        };
        handleDrag(dragData);
    };
    /**
     * @desc Process data when moving in/out of cacheChecked.
     *       1. Need to check if the hour already exists for that date in cacheChecked. If not, add it; otherwise, remove it.
     *       2. Need to check if the iden (day of the week) already exists in cacheChecked. If not, add it; if it exists but all hours in that iden are deselected, then remove that iden.
     */
    const handleData = (iden, hour) => {
        let cacheChecked = checkedDatas;
        const { has, idenIndex, index } = isHasStart(iden, hour);
        if (!has) {
            cacheChecked.push({
                iden: iden,
                times: [hour]
            });
            setCheckedDatas([...cacheChecked]); // 大坑，重新开辟一个数组引用才行
            return;
        }
        if (!hasStart) {
            cacheChecked[idenIndex].times.push(hour);
            setCheckedDatas([...cacheChecked]);
            return;
        }
        const exist = cacheChecked[idenIndex].times.length === 1;
        exist ? cacheChecked.splice(idenIndex, 1) : cacheChecked[idenIndex].times.splice(index, 1);
        setCheckedDatas([...cacheChecked]);
    };
    /**
     * @desc 触发事件时，抽出相同赋值代码
     */
    const handleSetVal = (e, key) => {
        if (e.target.dataset.hour) {
            let iden = e.target.dataset.iden, hour = e.target.dataset.hour;
            cach[key].iden = iden;
            cach[key].hour = hour;
            cach[key].group = iden + hour;
            key === 'cacheStart' && isHasStart(iden, hour);
            key === 'cacheEnd' && cach[key].group === cach.cacheStart.group && handleData(iden, hour);
            key === 'cacheEnd' && cach[key].group !== cach.cacheStart.group && confirmRange();
            return true;
        }
        return false;
    };
    // Clear cached cacheStart and cacheEnd
    const clearCache = (key) => {
        cach[key].iden = '';
        cach[key].hour = '';
        cach[key].group = '';
    };
    // Clear all data
    const handleEmpty = () => {
        hasStart = false;
        clearCache('cacheStart');
        clearCache('cacheEnd');
        setCheckedDatas([]);
    };
    /**
     * @desc Given that both click and mousedown require iterating through the array to determine if the current time already exists, common code is extracted.
     *       The returned values:
     *       has: Check if the iden (day of the week from Monday to Sunday) exists in cacheChecked.
     *       idenIndex: The index of the iden in cacheChecked.
     *       index: The index of the hour corresponding to the date in cacheChecked.
     */
    const isHasStart = (iden, hour) => {
        hasStart = false;
        let cacheChecked = checkedDatas, l = cacheChecked.length, has = false, index, idenIndex;
        for (let i = 0; i < l; i++) {
            if (cacheChecked[i].iden === iden) {
                idenIndex = i;
                index = cacheChecked[i].times.indexOf(hour);
                has = true;
                hasStart = index !== -1;
                break;
            }
        }
        return { has, idenIndex, index };
    };
    /**
     * @desc 根据 cacheStart 和 cacheEnd 确定时间范围，修改cacheChecked
     *       hasStart false 框选范围内 时间做选中操作
     *                true 框选范围内 时间做取消选中操作
     */
    const confirmRange = () => {
        let daysArr = [cach.cacheStart.iden, cach.cacheEnd.iden], hoursArr = [cach.cacheStart.hour, cach.cacheEnd.hour], tempHasStart = hasStart, cacheChecked = JSON.parse(JSON.stringify(checkedDatas));
        const dayRange = handleDayRange(daysArr.sort(sort$1));
        const timeRange = handleRange(hasHalfHour, hoursArr.sort(sortHour)); // 框选的时间范围
        for (let i = 0; i < dayRange.length; i++) {
            let { has, idenIndex } = isHasStart(dayRange[i]);
            handleCheckedData({ cacheChecked, hasStart: tempHasStart, has, idenIndex, iden: dayRange[i], timeRange });
        }
        setCheckedDatas(cacheChecked);
    };
    return (React.createElement("tbody", { className: "wtrp-tbody", onMouseDown: handleMousedown, onMouseUp: handleMouseup, onMouseMove: handleMousemove },
        weeks.map((item, i) => {
            return (React.createElement("tr", { className: "wtrp-tbody-tr", key: i },
                React.createElement("td", { className: "week-td" }, item.week),
                hours.map((hour, index) => {
                    return (React.createElement("td", { colSpan: colspan, className: checkedDatas.some(checked => {
                            return checked.iden === item.iden && checked.times.indexOf(hour.time) !== -1;
                        }) ? 'wtrp-active-td' : 'wtrp-freeze-td', key: index, "data-hour": hour.time, "data-iden": item.iden, "data-value": `${item.week} ${hour.time}` }));
                })));
        }),
        React.createElement(WeekTimeRangeSelected, { hasHalfHour: hasHalfHour, checkedDatas: checkedDatas, handleEmpty: handleEmpty })));
};

var css_248z$1 = ".week-time-range-picker {\n  position: relative;\n  display: inline-block;\n}\n.week-time-range-picker .wtrp-schedule {\n  background: #598fe6;\n  width: 0;\n  height: 0;\n  position: fixed;\n  opacity: 0.6;\n  top: 0;\n  left: 0;\n  pointer-events: none;\n  -webkit-transition: all 0.4s ease;\n  -moz-transition: all 0.4s ease;\n  -ms-transition: all 0.4s ease;\n  transition: all 0.4s ease;\n}\n.week-time-range-picker .wtrp-table {\n  background-color: transparent;\n  border-collapse: collapse;\n}\n.week-time-range-picker .wtrp-byted-popover-wrapper {\n  text-align: left;\n  display: inline-block;\n}\n.week-time-range-picker .wtrp-byted-popover-wrapper .transition-popover-enter-active,\n.week-time-range-picker .wtrp-byted-popover-wrapper .transition-popover-appear {\n  opacity: 0;\n  animation: popoverTransitionIn 0.5s;\n}\n.week-time-range-picker .wtrp-byted-popover-wrapper .transition-drop-leave-active {\n  animation: popoverTransitionOut 0.5s;\n}\n@keyframes popoverTransitionIn {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes popoverTransitionOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n.week-time-range-picker .wtrp-byted-popover-wrapper .ant-tooltip {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n  color: rgba(0, 0, 0, 0.65);\n  font-variant: tabular-nums;\n  line-height: 1.5;\n  list-style: none;\n  font-feature-settings: 'tnum';\n  position: absolute;\n  z-index: 1060;\n  display: block;\n  max-width: 250px;\n  visibility: visible;\n}\n.week-time-range-picker .wtrp-byted-popover-wrapper .ant-tooltip-placement-top .ant-tooltip-arrow {\n  left: 50%;\n  transform: translateX(-50%);\n  position: absolute;\n  display: block;\n  width: 13.07106781px;\n  height: 13.07106781px;\n  overflow: hidden;\n  background: transparent;\n  pointer-events: none;\n  bottom: -12.07106781px;\n}\n.week-time-range-picker .wtrp-byted-popover-wrapper .ant-tooltip-placement-top .ant-tooltip-arrow::before {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  display: block;\n  width: 5px;\n  height: 5px;\n  margin: auto;\n  background-color: rgba(0, 0, 0, 0.75);\n  content: '';\n  pointer-events: auto;\n  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.07);\n  transform: translateY(-6.53553391px) rotate(45deg);\n}\n.week-time-range-picker .wtrp-byted-popover-wrapper .ant-tooltip-placement-top .ant-tooltip-inner {\n  min-width: 30px;\n  min-height: 32px;\n  padding: 6px 8px;\n  color: #fff;\n  text-align: left;\n  text-decoration: none;\n  word-wrap: break-word;\n  background-color: rgba(0, 0, 0, 0.75);\n  border-radius: 4px;\n  -webkit-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);\n}\n";
styleInject(css_248z$1);

var css_248z = ".week-time-range-picker,\n.week-time-range-picker :after,\n.week-time-range-picker :before {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.week-time-range-picker .wtrp-table tr,\n.week-time-range-picker .wtrp-table td,\n.week-time-range-picker .wtrp-table th {\n  border: 1px solid #DDDEE1;\n  -webkit-transition: background 0.2s ease;\n  -moz-transition: background 0.2s ease;\n  -ms-transition: background 0.2s ease;\n  transition: background 0.2s ease;\n  user-select: none;\n  margin: 0;\n  font-size: 16px;\n  padding: 0 8px;\n  min-width: 32px;\n  width: 32px;\n  height: 40px;\n  box-sizing: border-box;\n}\n.week-time-range-picker .wtrp-table tr .week-td,\n.week-time-range-picker .wtrp-table td .week-td,\n.week-time-range-picker .wtrp-table th .week-td {\n  width: 60px;\n}\n";
styleInject(css_248z);

let startX = 0; // Record the e.clientX when the starting point is clicked
let startY = 0; // Record the e.clientY when the starting point is clicked
let startLayerX = 0; // Record the distance from the top left corner of the corresponding td to the x-axis of the table when the starting point is clicked
let startLayerY = 0; // Record the distance from the top left corner of the corresponding td to the y-axis of the table when the starting point is clicked
let topY = 0; // Record the vertical deviation of the boundary when the starting point is clicked
let leftX = 0; // Record the layerX - the distance from the left side of the td to the left side of the table when the starting point is clicked
const ReactWeekTimeRangePicker = (props) => {
    const [isDrag, setIsDrag] = useState(true); // 控制拖拽框显影
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [cacheChecked, setCacheChecked] = useState(props.selectedData || []); // 缓存被选中的时间数据
    useEffect(() => {
        document.body.addEventListener('mouseup', handleMouseup);
        document.body.addEventListener('mousemove', handleMousemove);
        return () => {
            document.body.removeEventListener('mouseup', handleMouseup);
            document.body.removeEventListener('mousemove', handleMousemove);
        };
    });
    const { hasHalfHour, selectTimeRange } = props;
    // 获取被选中的数据，并抛给父组件
    const handleSelect = (selected) => {
        setCacheChecked(selected);
        selectTimeRange && selectTimeRange(selected);
    };
    // 拖拽超过table范围后才释放
    const handleMouseup = (e) => {
        if (e && !e.target.dataset.hour) {
            setIsDrag(false);
        }
    };
    // 拖拽超过table范围
    const handleMousemove = (e) => {
        if (!e.target.dataset.hour) ;
    };
    const handleMoveout = (isOut) => {
    };
    // 计算拖拽框区域的核心代码
    const handleDrag = (props) => {
        const { type, clientX, clientY, layerX, layerY, iden, hour, value, isDrag } = props;
        if (type === 'up') {
            setIsDrag(false);
            return;
        }
        let tempWidth, tempHeight;
        const factor = hasHalfHour ? 2 : 1; // Determine the multiplier for td offset based on whether there is a half-hour
        // Convert the time corresponding to the starting point td, for example, '10:00', into the format ['10', '00']
        const hourMinuteArr = hour.split(':');
        // Determine which td in the row the starting point is located, in order to determine the clientX and clientY of the starting point td
        const tdIndex = ~~hourMinuteArr[1] ? ~~hourMinuteArr[0] * factor + 1 : ~~hourMinuteArr[0] * factor;
        type === 'down' ?
            handleDragDown({ clientX, clientY, layerX, layerY, iden, tdIndex }) :
            handleDragMove({ isDrag, layerX, layerY, tempWidth, tempHeight, iden, hour, value });
    };
    // 按下
    const handleDragDown = (params) => {
        const { clientX, clientY, layerX, layerY, iden, tdIndex } = params;
        setWidth(0);
        setHeight(0);
        setIsDrag(true);
        startX = clientX;
        startY = clientY;
        topY = layerY - iden * 32 - 80;
        leftX = layerX - tdIndex * 32 - 96;
        startLayerX = tdIndex * 32 + 140;
        startLayerY = (~~iden * 32) + 80;
        setTop(startY - topY);
        setLeft(startX - leftX);
    };
    // 可能是普通移动，也可能是拖拽移动
    const handleDragMove = (params) => {
        let { isDrag, layerX, layerY, tempWidth, tempHeight, iden, hour, value } = params;
        if (isDrag) {
            let diffX = layerX - startLayerX;
            let diffY = layerY - startLayerY;
            tempWidth = diffX > 0 ? diffX : 20 - diffX;
            tempHeight = diffY > 0 ? diffY : 40 - diffY;
            const newWidth = tempWidth % 32 === 0 && diffX > 0 ? Math.ceil(tempWidth / 40) * 40 + 1 : Math.ceil(tempWidth / 32) * 36;
            const newHeight = tempHeight % 40 === 0 && diffY > 0 ? Math.ceil(tempHeight / 40) * 40 + 40 : Math.ceil(tempHeight / 40) * 40;
            setWidth(newWidth);
            setHeight(newHeight);
            diffX < 0 ? setLeft(startX - leftX - width + 60) : setLeft(startX - leftX);
            diffY < 0 ? setTop(startY - topY - height + 40) : setTop(startY - topY);
        }
        // setIsFocus(true)
        // tipPosition(iden, hour, value)
    };
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
    //   //  popperTop = (~~iden + 1) * 40 + 80 - tableHeight - 55
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
    //   useEffect(() => {
    //     handleDragDown(
    //
    //       {
    //     "clientX": 332,
    //     "clientY": 117,
    //     "layerX": 100,
    //     "layerY": 85,
    //     "iden": "0",
    //     "tdIndex": 0
    // }
    //     )
    //   }, [])
    console.log(isDrag, left, top, width, height);
    return (React.createElement("div", { className: "week-time-range-picker" },
        isDrag ?
            React.createElement("div", { className: "wtrp-schedule", style: {
                    left: `${left}px`,
                    top: `${top}px`,
                    width: `${width}px`,
                    height: `${height}px`
                } }) : null,
        React.createElement("table", { className: "wtrp-table" },
            React.createElement(WeekTimeRangePickerThead, { hasHalfHour: hasHalfHour }),
            React.createElement(WeekTimeRangePickerTbody, { hasHalfHour: hasHalfHour, checkedDatas: cacheChecked, handleDrag: handleDrag, handleSelect: handleSelect, handleMoveout: handleMoveout }))));
};

export { ReactWeekTimeRangePicker as default };
