import { create } from 'zustand'
import { createJSONStorage, persist } from "zustand/middleware";


interface OnboardingState {
    name: string;
    
}

const useOnboarding = create<OnboardingState>()(
    persist(
        (set) => ({
            name: "",
        }),
        {
            name: "bp:onboarding",
            storage: createJSONStorage(() => sessionStorage),
            partialize: (state: OnboardingState) => {
                /* 
                    Bellow states wont be stored in the localstorage
                    as they need to be reinitialized on page refresh 
                */
                const {
                    ...rest
                } = state;

                return rest;
            }
        }
    )
);

export default useOnboarding;