"use client";

import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";
import { usePuck } from "@measured/puck";
import { Cross1Icon } from "@radix-ui/react-icons";

interface IMenuContext extends MenuState {
  dispatch: React.Dispatch<MenuActions>;
}

type MenuActions = { type: "open"; payload: string } | { type: "close" };

type MenuState = {
  open: string | null;
};

const reducer = (state: MenuState, action: MenuActions) => {
  switch (action.type) {
    case "open":
      return { ...state, open: action.payload };
    case "close":
      return { ...state, open: null };
    default:
      return state;
  }
};

const MenuContext = React.createContext<IMenuContext>({
  open: null,
  dispatch: () => null,
});

const Menu = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<HTMLAttributes<HTMLDivElement>>
>(({ children, className, ...rest }, ref) => {
  const [state, dispatch] = React.useReducer(reducer, {
    open: null,
  });

  return (
    <MenuContext.Provider value={{ ...state, dispatch }}>
      <aside
        ref={ref}
        className={cn(
          "bg-background border-r absolute left-0 top-0 bottom-0 z-50 p-2 flex flex-col gap-2",
          className
        )}
        {...rest}
      >
        {children}
      </aside>
    </MenuContext.Provider>
  );
});

Menu.displayName = "MenuRoot";

interface ItemProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  trigger: React.ReactElement<any, "component">;
}

const MenuItem = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<ItemProps>
>(({ children, className, value, trigger, ...rest }, ref) => {
  const { open, dispatch } = React.useContext(MenuContext);
  const puck = usePuck();

  return (
    <React.Fragment>
      {React.cloneElement(trigger, {
        onClick: () => dispatch({ type: "open", payload: value }),
        className: cn(value === open && "bg-accent"),
      })}
      {open === value && (
        <aside
          className={cn(
            "bg-background border-r absolute left-[53px] top-0 bottom-0 z-50 flex flex-col min-w-52",
            puck.appState.ui.isDragging && "opacity-50",
            className
          )}
          ref={ref}
          {...rest}
        >
          <header className="p-2 flex items-center justify-between border-b">
            <h2 className="text-sm font-bold">{value}</h2>
            <button type="button" onClick={() => dispatch({ type: "close" })}>
              <span className="sr-only">Close</span>
              <Cross1Icon />
            </button>
          </header>
          {children}
        </aside>
      )}
    </React.Fragment>
  );
});

MenuItem.displayName = "MenuItem";

export { MenuItem, Menu };
