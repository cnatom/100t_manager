import HistoryTemplate from "../template/HistoryTemplate";

function LcdldyPage(){
    return (
        <HistoryTemplate keys={['lcdl', 'lcdy']}
                         names={['励磁电流(A)','励磁电压(V)']}/>
    );
}

export default LcdldyPage;