import React from 'react';
import { DatePicker,Button  } from 'antd';
import styles from './index.less'
const { RangePicker } = DatePicker;
interface propsType{
    changeData:(date:any,dateString:[string, string])=>void
    outPut:()=>void
}
export default (props:propsType ) => {
    return(
        <div>
            时间： <RangePicker onChange={props.changeData} className={styles.datepicker} /><Button type="primary" onClick={props.outPut}>导出</Button>
        </div>
    )
}