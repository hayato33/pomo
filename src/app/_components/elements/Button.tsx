import { useFont } from "@/app/_hooks/useFont";
import { Button } from "@radix-ui/themes";

export default function ButtonComponent({
  children,
  size = "3",
  variant = "solid",
  className,
  type = "button",
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  size?: "1" | "2" | "3" | "4";
  variant?: "solid" | "outline" | "ghost";
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}) {
  const { fontClass } = useFont();
  return (
    <Button
      size={size}
      color="gray"
      variant={variant}
      highContrast
      className={`${fontClass} cursor-pointer ${className} ${variant !== "solid" ? "bg-white/75 backdrop-blur dark:bg-black/75" : ""}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}
