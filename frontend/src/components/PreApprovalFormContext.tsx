import { createContext, useContext, useState, ReactNode } from "react";

type PreApprovalFormContextType = {
  isOpen: boolean;
  openForm: () => void;
  closeForm: () => void;
};

const PreApprovalFormContext = createContext<PreApprovalFormContextType>({
  isOpen: false,
  openForm: () => {},
  closeForm: () => {},
});

export const usePreApprovalForm = () => useContext(PreApprovalFormContext);

export const PreApprovalFormProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <PreApprovalFormContext.Provider value={{ isOpen, openForm: () => setIsOpen(true), closeForm: () => setIsOpen(false) }}>
      {children}
    </PreApprovalFormContext.Provider>
  );
};
