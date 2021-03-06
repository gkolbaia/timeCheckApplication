export interface EnterAndLeaveTimes {
  enterTime: string;
  leaveTime: string;
}
export interface Timing {
  date: string;
  enterAndLeaveTImes: EnterAndLeaveTimes[]
}

export interface PeopleTimingInfo {
  id: string;
  showCurrentDayTiming: false;
  joined: string;
  timing: Timing[]
}
export interface Months {
  showParameter: boolean;
  month: string;
  dates: Timing[];
}
