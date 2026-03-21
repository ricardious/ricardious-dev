import type { SVGProps } from "react";

export type IconName =
  | "arrow-down"
  | "arrow-right"
  | "envelope-closed"
  | "github-logo"
  | "logo";

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  title?: string;
}

export default function Icon({ name, title, children, ...props }: IconProps) {
  return (
    <svg
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
