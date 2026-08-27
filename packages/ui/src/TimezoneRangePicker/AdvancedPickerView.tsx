import { Flex, SegmentedControl } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { FC, useEffect, useState } from "react";
import { AroundTimePanel } from "../AroundTimePanel";
import { Sidebar } from "../Sidebar";
import { StartEndTimePanel } from "../StartEndTimePanel";
import { TimezonePanel } from "../TimezonePanel";
import { TzRange } from "../interfaces";
import styled from "./index.module.css";
import { Panel } from "./panels";

interface AdvancedPickerViewProps {
  tzRange: TzRange;
  onBasic: () => void;
}

export const AdvancedPickerView: FC<AdvancedPickerViewProps> = ({ tzRange, onBasic }) => {
  const [selectedPanel, setSelectedPanel] = useState<Panel>(Panel.START_END_TIME);
  const isTablet = useMediaQuery("(max-width: 64em)");

  useEffect(() => {
    if (!isTablet && selectedPanel === Panel.RELATIVE_TIME) {
      setSelectedPanel(Panel.START_END_TIME);
    }
  }, [isTablet, selectedPanel]);

  const renderPanel = () => {
    switch (selectedPanel) {
      case Panel.RELATIVE_TIME:
        return <Sidebar tzRange={tzRange} setSelectedPanel={setSelectedPanel} mobileOnlyRelative />;
      case Panel.START_END_TIME:
        return <StartEndTimePanel tzRange={tzRange} onBasic={onBasic} />;
      case Panel.AROUND_TIME:
        return <AroundTimePanel tzRange={tzRange} onBasic={onBasic} />;
      case Panel.TIMEZONE:
        return <TimezonePanel tzRange={tzRange} onBasic={onBasic} />;
      default:
        return null;
    }
  };

  if (isTablet) {
    return (
      <div className={styled["mobile-layout"]}>
        <div className={styled["mobile-nav"]}>
          <SegmentedControl
            fullWidth
            value={selectedPanel}
            onChange={(value) => setSelectedPanel(value as Panel)}
            data={[
              { label: "Quick", value: Panel.RELATIVE_TIME },
              { label: "Range", value: Panel.START_END_TIME },
              { label: "Around", value: Panel.AROUND_TIME },
              { label: "TZ", value: Panel.TIMEZONE },
            ]}
          />
        </div>
        <div className={styled["mobile-content"]}>{renderPanel()}</div>
      </div>
    );
  }

  return (
    <Flex className={styled["picker-shell"]}>
      <Sidebar tzRange={tzRange} setSelectedPanel={setSelectedPanel} />
      {renderPanel()}
    </Flex>
  );
};
