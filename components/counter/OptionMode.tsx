import { Text } from "@chakra-ui/react";
import { TModes } from "@/interfaces";

interface Props {
  children: React.ReactNode;
  isActive: boolean;
  onActiveChange: (name: TModes) => void;
}

export const OptionMode: React.FC<Props> = ({
  children,
  isActive,
  onActiveChange,
}) => {
  return (
    <Text
      as="h3"
      backgroundColor={isActive ? "rgba(0, 0, 0, 0.15)" : "none"}
      borderRadius={8}
      color="white"
      cursor="pointer"
      fontSize={{ base: 15, sm: 16 }}
      fontWeight={isActive ? "bold" : 300}
      onClick={() => onActiveChange(children as TModes)}
      outline="none"
      padding={{ base: "4px 8px", sm: "4px 12px" }}
      userSelect="none"
      _active={{
        transform: "translateY(2px)",
        outline: "none",
      }}
    >
      {children}
    </Text>
  );
};
