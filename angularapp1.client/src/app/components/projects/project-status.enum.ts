export enum ProjectStatusEnum {
  New,
  InProgress,
  Released,
  Frozen,
  Cancelled,
  OnHold
}

export const StatusMaping: Record<ProjectStatusEnum, string> = {
  [ProjectStatusEnum.New]: "New",
  [ProjectStatusEnum.InProgress]: "InProgress",
  [ProjectStatusEnum.Released]: "Released",
  [ProjectStatusEnum.Frozen]: "Frozen",
  [ProjectStatusEnum.Cancelled]: "Cancelled",
  [ProjectStatusEnum.OnHold]: "OnHold",
};
