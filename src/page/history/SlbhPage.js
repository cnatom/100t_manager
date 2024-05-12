import HistoryTemplate from "../template/HistoryTemplate";

function SlbhPage() {
    return (
        <HistoryTemplate keys={['slcsl', 'dqsl', 'xlcsl']}
                         names={['上励磁水流L/min', '动圈水流L/min', '下励磁水流L/min']}/>
    );
}

export default SlbhPage;