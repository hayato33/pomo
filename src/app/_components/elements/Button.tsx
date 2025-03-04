import { Button } from "@radix-ui/themes";

export default function ButtonComponent({
  children,
  variant = "solid",
  className,
  type = "button",
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  variant?: "solid" | "outline" | "ghost";
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <Button
      size="3"
      color="gray"
      variant={variant}
      highContrast
      className={`cursor-pointer ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}
