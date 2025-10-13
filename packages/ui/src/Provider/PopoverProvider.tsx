import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface PopoverContextType {
  popoverOpened: boolean;
  setPopoverOpened: Dispatch<SetStateAction<boolean>>;
  closePopover: () => void;
}

const PopoverContext = createContext<PopoverContextType | undefined>(undefined);

export const usePopoverContext = () => {
  const ctx = useContext(PopoverContext);
  if (!ctx) throw new Error("usePopoverContext must be used within a PopoverProvider");
  return ctx;
};

export const PopoverProvider = ({ children }: { children: ReactNode }) => {
  const [popoverOpened, setPopoverOpened] = useState(false);

  const closePopover = () => {
    setPopoverOpened(false);
  };

  return (
    <PopoverContext.Provider value={{ popoverOpened, setPopoverOpened, closePopover }}>
      {children}
    </PopoverContext.Provider>
  );
};
