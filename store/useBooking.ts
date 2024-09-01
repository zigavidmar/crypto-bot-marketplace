import { Database } from '@/types/supabase';
import { create } from 'zustand'
import { createJSONStorage, persist } from "zustand/middleware";


interface BookingState {
    services: Database["public"]["Tables"]["services"]["Row"][];
}

const useBooking = create<BookingState>()(
    persist(
        (set) => ({
            services: [],
        }),
        {
            name: "bp:booking",
            storage: createJSONStorage(() => sessionStorage),
            partialize: (state: BookingState) => {
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

export default useBooking;