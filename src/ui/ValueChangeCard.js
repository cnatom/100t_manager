import {Card, Statistic} from "antd";

function ValueChangeCard({title,value,unit}){

    return (
        <Statistic style={{width:'100%'}}
                   title={title}
                   value={value}
                   valueRender={value => <>{value}</>}
                   precision={2}
                   suffix={<div style={{fontSize:'13px',color:'grey',marginLeft:'3px'}}>{unit}</div>}
        />
    );
}

export default ValueChangeCard;