import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import useRefEffect from "../../hooks/useRefEffect";
import { onFlexableNavTransitionAtom as OFNT } from "../../shared/atom";

interface IFlexableNavItemStyleProps {
  isFlexed: boolean;
  position: "left" | "right";
  canHover: boolean;
  isTransitioning: boolean;
}

interface IFlexableNavItemProps {
  position: "left" | "right";
  title: React.ReactNode;
  description: string;
  flexedIcon: React.ReactNode;
  isFlexed: boolean;
  activeColor?: string;
  onFlexedClick: () => void;
}

interface IFlexableNavProps {
  children: React.ReactNode;
}

const FlexableNavContainer = styled.div`
  width: 100%;
  height: 250px;

  font-size: 14px;
  display: flex;
  gap: 8px;

  @media screen and (min-width: 799px) {
    height: 450px;
    font-size: 16px;
  }
`;

const FlexableNavItemContainer = styled.div<IFlexableNavItemStyleProps>`
  color: #eaf4f0;

  position: relative;
  ${({ theme }) => theme.shareCSS.noDrag};

  ${(props) => (props.isFlexed ? "width: 50px" : "width: 100%")};
  min-width: 50px;
  height: 100%;

  display: flex;
  justify-content: ${(props) => (props.isFlexed ? "center" : "flex-start")};
  align-items: center;

  background-color: ${({ theme }) => theme.background.secondary};
  border-radius: 24px;

  font-family: ${({ theme }) => theme.font.family.openSans};

  transition: ${(props) =>
    props.isTransitioning
      ? `
      width 0.5s cubic-bezier(0.2, 0, 0, 1),
      min-width 0.2s cubic-bezier(0.2, 0, 0, 1),
      background-color 0.5s cubic-bezier(0.2, 0, 0, 1)
      `
      : `
      width 0.5s cubic-bezier(0.2, 0, 0, 1),
      min-width 0.2s cubic-bezier(0.2, 0, 0, 1),
      background-color 0.1s cubic-bezier(0.2, 0, 0, 1)
  `};

  overflow-x: hidden;

  &:hover {
    ${(props) =>
      props.isFlexed && props.canHover
        ? `
          min-width: 80px;
          background-color: ${props.theme.background.hoverAccent};
          margin-${props.position === "left" ? "right" : "left"}: 8px;
        `
        : ""}

    transition: width 0.5s cubic-bezier(0.2, 0, 0, 1), 
      min-width 0.3s cubic-bezier(0.2, 0, 0, 1),
      background-color ${(props) =>
      props.isFlexed ? `0.2s cubic-bezier(0.2, 0, 0, 1)` : "none"},
      margin-left 0.2s cubic-bezier(0.2, 0, 0, 1) 0.05s;
  }

  .icon-wrapper {
    display: inline-flex;
    justify-content: center;
    align-items: center;

    svg {
      font-size: 28px;
    }
  }

  .section-info {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);

    font-size: 14px;
    font-weight: 500;
    opacity: 0;

    transition: opacity 0.2s cubic-bezier(0, 0, 0, 1),
      transform 0.35s cubic-bezier(0, 0, 0, 1);
  }

  &:hover .section-info {
    ${(props) =>
      props.canHover
        ? `
        transform: translate3d(-50%, calc(-50% + 2.2em), 0);
        opacity: 1;
        `
        : ""}

    transition: opacity 0.3s cubic-bezier(0.2, 0, 0, 1) 0.15s,
      transform 0.3s cubic-bezier(0.2, 0, 0, 1) 0.15s;
  }

  @media screen and (min-width: 799px) {
    min-width: 100px;

    &:hover {
      ${(props) =>
        props.isFlexed && props.canHover
          ? `
            min-width: 140px;
            background-color: ${props.theme.background.hoverAccent};
            margin-${props.position === "left" ? "right" : "left"}: 16px;
          `
          : ""}
    }

    .icon-wrapper {
      svg {
        font-size: 42px;
      }
    }

    .section-info {
      font-size: 22px;
    }
  }
`;

const getContentFadeKeyframe = (yOffset: string) => keyframes`
  from {
    opactiy: 0;
    transform: translate3d(0, ${yOffset}, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 0.2em;

  padding: 0 24px;

  h1 {
    font-size: 3.2em;
    letter-spacing: 0.8px;
    font-weight: 600;

    opacity: 0;
    animation: ${getContentFadeKeyframe("30px")} 0.4s cubic-bezier(0.2, 0, 0, 1)
      forwards 0.35s;
  }

  h3 {
    padding-left: 0.3em;
    font-size: 1em;
    font-weight: 500;
    color: #d2d2d2;

    opacity: 0;
    animation: ${getContentFadeKeyframe("16px")} 0.4s cubic-bezier(0.2, 0, 0, 1)
      forwards 0.45s;
  }

  @media screen and (min-width: 799px) {
    padding: 0 72px;

    h1 {
      font-size: 4.8em;
      letter-spacing: 1.6px;
    }

    h3 {
      font-size: 1.3em;
    }
  }
`;

export function FlexableNavItem({
  title,
  description,
  flexedIcon,
  isFlexed,
  activeColor,
  position,
  onFlexedClick,
}: IFlexableNavItemProps) {
  const [isTransitioning, setIsTransitioning] = useRecoilState(OFNT);
  const ref = useRef<HTMLDivElement>(null);

  const onSwitchTransitionEnd = (e: TransitionEvent) => {
    if (!isTransitioning) return;
    if (e.propertyName !== "width") return;

    requestAnimationFrame(() => {
      setIsTransitioning(false);
    });
  };

  const onSwitchClick = () => {
    if (!isFlexed) return;
    if (isTransitioning) return;

    setIsTransitioning(true);

    requestAnimationFrame(() => {
      onFlexedClick();
    });
  };

  useRefEffect(() => {
    ref.current!.addEventListener("transitionend", onSwitchTransitionEnd);

    return () => {
      ref.current!.removeEventListener("transitionend", onSwitchTransitionEnd);
    };
  }, [ref]);

  return (
    <FlexableNavItemContainer
      ref={ref}
      isFlexed={isFlexed}
      onClick={onSwitchClick}
      position={position}
      style={{
        backgroundColor: !isFlexed ? activeColor : "",
      }}
      canHover={!isTransitioning}
      isTransitioning={isTransitioning}
    >
      {isFlexed ? (
        <>
          <div className="icon-wrapper">{flexedIcon}</div>
          <div className="section-info">{title}</div>
        </>
      ) : (
        <ContentContainer>
          <h1>{title}</h1>
          <h3>{description}</h3>
        </ContentContainer>
      )}
    </FlexableNavItemContainer>
  );
}

export default function FlexableNav({ children }: IFlexableNavProps) {
  return <FlexableNavContainer>{children}</FlexableNavContainer>;
}