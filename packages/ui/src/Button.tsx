import * as React from "react";

export const Button = () => {
  return <button>Click me 123</button>;
};

// export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
//   variant?: "primary" | "ghost";
// };

// export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
//   ({ variant = "primary", className, ...props }, ref) => {
//     const base =
//       "inline-flex items-center justify-center rounded-lg px-3.5 py-2.5 text-sm font-medium";
//     const styles =
//       variant === "primary"
//         ? "bg-black text-white hover:opacity-90"
//         : "bg-transparent border border-black text-black hover:bg-black/5";
//     return (
//       <button
//         ref={ref}
//         className={[base, styles, className].filter(Boolean).join(" ")}
//         {...props}
//       />
//     );
//   }
// );
// Button.displayName = "Button";
