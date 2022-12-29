import React from "react";

export interface IItemProps {
  defaultIcon: React.ReactNode;
  selectedIcon?: React.ReactNode;
  text: string;
  selected?: boolean;
  onClick?: () => void;
}

export interface IOpenLinkItemProps {
  icon: React.ReactNode;
  text: string;
  href: string;
}

export interface ISliderItemProps {
  content: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
}

export interface ISliderContainerStyleProps {
  active: boolean;
  triggerInteractionHide: boolean;
}

export interface ISliderProps {
  selector: () => React.ReactNode;
  onClose: () => void;
}

export type MenuSectionType = "language" | "color" | "notification";