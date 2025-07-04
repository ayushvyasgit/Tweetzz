import type { ReactElement } from "react";

type Variants = "primary" | "secondary";

interface ButtonProps {
  variant?: Variants;
  size: "sm" | "md" | "lg";
  text: string;
  fullWidth?:boolean ;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
  loading?:boolean;
}

const defaultStyles = "flex items-center rounded-md font-semibold gap-2 px-4";

const sizeStyles = {
  sm: "py-1 text-sm",
  md: "py-2 text-base",
  lg: "py-3 text-lg"
};

const defaultVariant: Variants = "primary";

const variantClassMap: Record<Variants, string> = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-300 text-black"
};

export function Button(props: ButtonProps) {
  const variant = props.variant || defaultVariant;

  return (
    <button onClick={props.onClick} className={`${variantClassMap[variant]} ${sizeStyles[props.size]} ${props.fullWidth?"w-full":""} ${props.loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
 ${defaultStyles} flex justify-center rounded cursor-pointer`}
      disabled={props.loading} >
      {props.startIcon && <span>{props.startIcon}</span>}
      <span>{props.text}</span>
      {props.endIcon && <span>{props.endIcon}</span>}
    </button>
  );
}
