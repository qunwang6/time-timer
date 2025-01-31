import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  clockDegreeAtom as CD,
  clockSizeAtom as CS,
  isClockPointerDownAtom as ICPD,
  isTimingNowAtom as ITN,
  isActiveMenuAtom as IAM,
  progressUnitValueAtom as PUV,
  maxClockTimeAtom as MCT,
} from "../../../../shared/atom";
import { Container, IconContainer, TimeText } from "./Header.style";
import useMediaMatch from "../../../../hooks/useMediaMatch";
import { Theme } from "../../../../styles/theme";
import { useEffect, useState } from "react";
import {
  getPercentageFromDegree,
  getTimeFromDegree,
} from "../../../Timer/Timer.util";
import { IoMdMenu } from "react-icons/io";

export default function Header() {
  const isClockPointerDown = useRecoilValue(ICPD);
  const isTimingNow = useRecoilValue(ITN);
  const clockDegree = useRecoilValue(CD);
  const clockSize = useRecoilValue(CS);
  const progressUnit = useRecoilValue(PUV);
  const maxClockTime = useRecoilValue(MCT);
  const setIsActiveMenu = useSetRecoilState(IAM);
  const [timerFontSize, setTimerFontSize] = useState(55);
  const [isHideTimer, _] = useMediaMatch(Theme.mediaQueries.hideTimerMaxWidth);

  useEffect(() => {
    const stageHeight = document.body.clientHeight;
    const usableHeight = (stageHeight - clockSize) / 2 - 35;

    setTimerFontSize(Math.min(Math.max(usableHeight, 55), 100));
  }, [clockSize]);

  return (
    <>
      <Container
        hasMenuIcon={isHideTimer}
        triggerHide={isClockPointerDown || isTimingNow}
      >
        {isHideTimer ? (
          <IconContainer
            onClick={() => {
              setIsActiveMenu(true);
            }}
          >
            <IoMdMenu />
          </IconContainer>
        ) : null}
        <div className="logo">
          
        </div>
        {isHideTimer ? (
          <div className="dummy">
            <IconContainer>
              <IoMdMenu />
            </IconContainer>
          </div>
        ) : null}
      </Container>
      {isHideTimer ? (
        <TimeText
          fontSize={timerFontSize}
          triggerHide={!isClockPointerDown && !isTimingNow}
        >
          {progressUnit === "time"
            ? getTimeFromDegree(clockDegree, maxClockTime).min
            : getPercentageFromDegree(clockDegree).int}
        </TimeText>
      ) : null}
    </>
  );
}
