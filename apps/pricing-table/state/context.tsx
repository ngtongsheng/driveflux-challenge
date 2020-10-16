import React, { createContext, useReducer, Dispatch } from 'react';
import { Pricing } from '@driveflux-code-challenge/interfaces';

export const START_EDIT = 'START_EDIT';
export const CANCEL_EDIT = 'CANCEL_EDIT';
export const UPDATE_PRICING_FIELD = 'UPDATE_PRICING_FIELD';
export const RESET_ALL_PRICINGS = 'RESET_ALL_PRICINGS';
export const START_SAVE_PRICINGS = 'START_SAVE_PRICINGS';
export const SUCCESS_GET_PRICINGS = 'SUCCESS_GET_PRICINGS';
export const SUCCESS_SAVE_PRICINGS = 'SUCCESS_SAVE_PRICINGS';

interface Action {
  type: string;
  payload?: PricingField | Pricings;
}

interface PricingField {
  id: string;
  field: string;
  value: string;
}

interface Pricings {
  snapshot?: Pricing[];
  pricings: Pricing[];
}

interface PricingState extends Pricings {
  readOnly: boolean;
  isSaving: boolean;
}

const initialState: PricingState = {
  snapshot: [],
  pricings: [],
  readOnly: true,
  isSaving: false
};

const reducer = (state: PricingState, { type, payload }: Action): PricingState => {
  switch (type) {
    case SUCCESS_GET_PRICINGS: {
      const { pricings } = payload as Pricings;
      return {
        ...state,
        pricings
      };
    }

    case START_EDIT: {
      const { pricings } = state;
      return {
        ...state,
        snapshot: [...pricings],
        readOnly: false
      };
    }

    case CANCEL_EDIT: {
      const { snapshot } = state;
      return {
        ...state,
        snapshot: [],
        pricings: [...snapshot],
        readOnly: true
      };
    }

    case UPDATE_PRICING_FIELD: {
      const { id, field, value } = payload as PricingField;
      const newValue = Math.max(0, parseFloat(value));

      const pricings = state.pricings.map(pricing => {
        if (pricing.id !== id) {
          return pricing;
        }

        if (field !== "lite") {
          return {
            ...pricing,
            [field]: String(newValue)
          }
        }

        return {
          ...pricing,
          [field]: String(newValue),
          standard: String(newValue * 2),
          unlimited: String(newValue * 3),
        }
      })

      return {
        ...state,
        pricings
      };
    }

    case RESET_ALL_PRICINGS: {
      const pricings = state.pricings.map(pricing => ({
        ...pricing,
        lite: "0",
        standard: "0",
        unlimited: "0"
      }))

      return {
        ...state,
        pricings
      };
    }

    case START_SAVE_PRICINGS: {
      return {
        ...state,
        isSaving: true
      };
    }

    case SUCCESS_SAVE_PRICINGS: {
      return {
        ...state,
        isSaving: false,
        readOnly: true,
        snapshot: []
      };
    }

    default:
      return state;
  }
};

export const PricingContext = createContext<[s: PricingState, d: Dispatch<Action>]>(
  [null, null]
);

export const PricingContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PricingContext.Provider value={[state, dispatch]}>
      {children}
    </PricingContext.Provider>
  );
};
