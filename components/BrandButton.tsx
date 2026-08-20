import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ButtonLeaves } from "@/components/BrandLeaves";
import { cn } from "@/lib/utils";

type BrandLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

export function BrandLink({ children, className, ...props }: BrandLinkProps) {
  return (
    <a className={cn("button", className)} {...props}>
      <span className="button__label">{children}</span>
      <ButtonLeaves />
    </a>
  );
}

type BrandButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function BrandButton({ children, className, ...props }: BrandButtonProps) {
  return (
    <button className={cn("button", className)} {...props}>
      <span className="button__label">{children}</span>
      <ButtonLeaves />
    </button>
  );
}
