import type { SVGProps } from "react";

export type IconName =
  | "arrow-down"
  | "discover-arrow"
  | "arrow-right"
  | "envelope-closed"
  | "github-logo";

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  title?: string;
}

const iconSizes: Partial<Record<IconName, { width: number; height: number }>> = {
  "discover-arrow": { width: 6, height: 20 },
};

export default function Icon({ name, title, children, ...props }: IconProps) {
  const defaultSize = iconSizes[name];

  return (
    <svg
      width={props.width ?? defaultSize?.width}
      height={props.height ?? defaultSize?.height}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {children}
      <use href={`/icons/sprite.svg#${name}`} />
    </svg>
  );
}
