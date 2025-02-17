import { message } from "antd";
import { observer } from "mobx-react-lite";
import EditableContent from "../../../component/EditableContent";
import P from "../../../util/placement";
import store from "../../../store/global";
import { wrappedAction } from "../../../store/history";
import Row from "../../Row";
import Text from "../../Text";

const tones = [
  "C",
  "D",
  "E",
  "F",
  "G",
  "A",
  "B",
  "♭C",
  "♭D",
  "♭E",
  "♭F",
  "♭G",
  "♭A",
  "♭B",
].map((t) => ({ key: t, text: t }));
const handleChangeTone = wrappedAction(function (value) {
  store.tone = value;
});
const handleChangeSpeed = wrappedAction(function (value) {
  store.speed = value;
});
const handleChangeBeat = wrappedAction(function (value) {
  const beat = String(value).split("/");
  if (beat.length !== 2) {
    message.error("請以【*/*】的格式輸入節拍！");
    return false;
  }
  const [c, t] = [parseInt(beat[0], 10), parseInt(beat[1], 10)];
  if (c > 0 && t > 0) {
    store.beat = [c, t];
  } else {
    message.error("請輸入大於0的拍數和時值！");
    return false;
  }
});

function LeftInfoBlock() {
  if (store.showheaders){
    return (
      <>
        <EditableContent
          inputType="select"
          initialValue={store.tone}
          options={tones}
          onChange={handleChangeTone}
          popoverProps={{ trigger: "click" }}
        >
          <Row
            type="tone"
            editable
            offsetX={store.marginHorizontal}
            offsetY={P.titleOffsetY}
          >
            <Text>1 = </Text>
            {store.tone.startsWith("♭") && (
              <Text x="27" y="-2" fontSize={store.defaultSubFontSize}>
                ♭
              </Text>
            )}
  
            <Text editable x={store.tone.startsWith("♭") ? 36 : 29}>
              {store.tone.at(-1)}
            </Text>
          </Row>
        </EditableContent>
        <EditableContent
          title="節拍："
          inputType="number"
          initialValue={store.beat.join("/")}
          onChange={handleChangeBeat}
        >
          <Row
            type="beat"
            editable
            offsetX={store.marginHorizontal + 64}
            offsetY={P.titleOffsetY}
          >
            <Text x="0" y="-8" textAnchor="middle">
              {store.beat[0]}
            </Text>
            <Text x="0" y="12" textAnchor="middle">
              {store.beat[1]}
            </Text>
            <line x1="-8" y1="8" x2="8" y2="8" stroke="currentColor" />
          </Row>
        </EditableContent>
        <EditableContent
          title="速度（bps）："
          inputType="number"
          initialValue={store.speed}
          onChange={handleChangeSpeed}
        >
          <Row
            editable
            type="speed"
            offsetX={store.marginHorizontal}
            offsetY={P.titleOffsetY + 22}
          >
            <Text x="2">♩</Text>
            <Text x="16">= {store.speed}</Text>
          </Row>
        </EditableContent>
        
      </>
    );
  }
  else{
    return <></>
  }
}

export default observer(LeftInfoBlock);
