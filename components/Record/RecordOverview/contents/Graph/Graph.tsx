import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import {
  getTimeRecordsFromDB,
  TIME_RECORD_DB_KEY,
} from "../../../../../hooks/useIDB";
import {
  languageOptionValueAtom as LOV,
  clockColorValueAtom as CCV,
} from "../../../../../shared/atom";
import { ITimeRecordDataType } from "../../../../../shared/types";
import { Theme } from "../../../../../styles/theme";
import { getDayGapBetween } from "../../../../../utils/time";
import GrassGraph from "../../../../GrassGraph/GrassGraph";
import { ContentHeader, ContentSection } from "../../RecordOverview.styled";

interface IGraphProps {
  timeRecordsData: Array<ITimeRecordDataType>;
}

export default function Graph({ timeRecordsData }: IGraphProps) {
  const language = useRecoilValue(LOV);
  const clockColor = useRecoilValue(CCV);

  const timeValues = useMemo(() => {
    function parseMSToMin(ms: number) {
      return ms / 1000 / 60;
    }

    const addZeroPadding = (dayGap: number, duration: number) => {
      const PADDING_SIZE = dayGap - 1;
      const PADDING = Array(PADDING_SIZE).fill(0);
      res.concat([...PADDING, parseMSToMin(duration)]);
    };

    const mergeTodayDuration = (duration: number) => {
      res[res.length - 1] += parseMSToMin(duration);
    };

    const res: number[] = [0];
    let currentDate: Date = new Date();

    timeRecordsData?.forEach((aRecord) => {
      const dayGap = getDayGapBetween(currentDate, aRecord.endTime);

      if (dayGap >= 1) addZeroPadding(dayGap, aRecord.duration);
      else mergeTodayDuration(aRecord.duration);

      currentDate = aRecord.endTime;
    });

    return res;
  }, [timeRecordsData]);

  return (
    <ContentSection>
      <ContentHeader>
        <h2>{language === "kor" ? "시간 그래프" : "Time Table"}</h2>
        <h3>
          {language === "kor"
            ? "기록된 시간들을 하루 단위로 시각화해서 보여드릴게요."
            : "Visualize your recorded times per a day."}
        </h3>
      </ContentHeader>
      <GrassGraph
        recentDatas={timeValues}
        color={Theme.clock.color[clockColor]}
        colorBoundary={[10, 30, 60, 120]}
      />
    </ContentSection>
  );
}
