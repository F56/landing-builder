"use client";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Puck, Config, Data, Drawer, usePuck } from "@measured/puck";
import "@measured/puck/puck.css";
import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import {
  ReactInfiniteCanvas,
  ReactInfiniteCanvasHandle,
} from "react-infinite-canvas";
import { Button, buttonVariants } from "../ui/button";
import {
  Component1Icon,
  Cross1Icon,
  DesktopIcon,
  GearIcon,
  MobileIcon,
} from "@radix-ui/react-icons";
import { LoaderCircle } from "lucide-react";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { Menu, MenuItem } from "./left-menu";

type Components = {
  Text: {
    children: string;
    padding: number;
    margin: number;
  };
};

const config: Config<Components> = {
  categories: {
    typo: {
      components: ["Text"],
    },
  },
  components: {
    Text: {
      fields: {
        padding: {
          type: "number",
        },
        margin: {
          type: "number",
        },
        children: {
          type: "text",
        },
      },
      render: ({ children, padding, margin }) => {
        return (
          <div
            className="text-black min-h-16 font-sans"
            style={{
              margin: `${margin}px`,
              padding: `${padding}px`,
            }}
          >
            {children}
          </div>
        );
      },
    },
  },
};

const initialData = {
  content: [],
  root: {},
};

const RenderRightBar: React.FC<PropsWithChildren> = ({ children }) => {
  const puck = usePuck();
  return (
    <>
      {puck.selectedItem && (
        <aside className="bg-background border-l absolute right-0 top-0 bottom-0 z-50">
          <header className="p-2 flex items-center justify-between border-b">
            <h2 className="text-sm font-bold">
              {puck.selectedItem.props.id.split("-")[0]}
            </h2>
            <button
              type="button"
              onClick={() =>
                puck.dispatch({ type: "setUi", ui: { itemSelector: null } })
              }
            >
              <span className="sr-only">Close</span>
              <Cross1Icon />
            </button>
          </header>

          {children}
        </aside>
      )}
    </>
  );
};

const RenderComponents: React.FC = () => {
  const puck = usePuck();
  return (
    <div className="flex flex-col p-2">
      <Drawer>
        {puck.appState.ui.componentList["typo"].components?.map(
          (component, index) => (
            <Drawer.Item name={component} index={index} key={index}>
              {(props) => (
                <div
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full mb-2 justify-start"
                  )}
                >
                  {props.name}
                </div>
              )}
            </Drawer.Item>
          )
        )}
      </Drawer>
    </div>
  );
};

const ViewportMenu: React.FC<{
  viewport: number;
  setViewport: React.Dispatch<React.SetStateAction<number>>;
  canvasRef: React.MutableRefObject<ReactInfiniteCanvasHandle | undefined>;
}> = ({ viewport, setViewport, canvasRef }) => {
  const puck = usePuck();
  return (
    <nav className="bg-background border px-4 py-2 max-sc absolute top-10 -translate-x-1/2 left-1/2 rounded-md z-40 flex items-center justify-center space-x-3">
      <h1 className="text-sm font-bold">
        {puck.appState.data.root.title ?? "Untitled Landing"}
      </h1>
      <span>-</span>
      <Button
        variant="ghost"
        size="icon"
        className={cn(viewport === 640 && "bg-accent")}
        onClick={() => {
          setViewport(640);
          canvasRef.current?.fitContentToView({ scale: 1 });
        }}
      >
        <span className="sr-only">Mobile</span>
        <MobileIcon />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={cn(viewport === 728 && "bg-accent")}
        onClick={() => {
          setViewport(728);
          canvasRef.current?.fitContentToView({ scale: 1 });
        }}
      >
        <span className="sr-only">Tablet</span>
        <MobileIcon />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={cn(viewport === 1280 && "bg-accent")}
        onClick={() => {
          setViewport(1280);
          canvasRef.current?.fitContentToView({ scale: 1 });
        }}
      >
        <span className="sr-only">Desktop</span>
        <DesktopIcon />
      </Button>
    </nav>
  );
};

const save = (data: Data) => {};

// Render Puck editor
export default function Editor() {
  const canvasRef = useRef<ReactInfiniteCanvasHandle>();
  const [loading, setLoading] = useState<boolean>(
    process.env.NODE_ENV === "production"
  );
  const [viewport, setViewport] = useState<number>(1280);

  return (
    <main className="flex-1 flex relative">
      {loading && (
        <div className="absolute inset-0 bg-background z-[60] flex items-center justify-center w-full h-full">
          <LoaderCircle className="animate-spin w-10 h-10" />
        </div>
      )}
      <Puck
        config={config}
        data={initialData}
        onPublish={save}
        // iframe={{ enabled: false }}
      >
        <ViewportMenu
          viewport={viewport}
          setViewport={setViewport}
          canvasRef={canvasRef}
        />
        <Menu>
          <MenuItem
            value="Components"
            trigger={
              <Button variant="ghost" size="icon">
                <span className=" sr-only">Components</span>
                <Component1Icon />
              </Button>
            }
          >
            <RenderComponents />
          </MenuItem>
          <MenuItem
            value="Settings"
            trigger={
              <Button variant="ghost" size="icon">
                <span className=" sr-only">Settings</span>
                <GearIcon />
              </Button>
            }
          >
            <RenderComponents />
          </MenuItem>
        </Menu>

        <RenderRightBar>
          <Puck.Fields />
        </RenderRightBar>

        <ContextMenu>
          <ContextMenuTrigger>
            <div className="h-full w-full">
              <ReactInfiniteCanvas
                ref={canvasRef}
                onCanvasMount={(mountFunc: ReactInfiniteCanvasHandle) => {
                  mountFunc.fitContentToView({ scale: 1 });
                  {
                    process.env.NODE_ENV === "production" &&
                      setTimeout(() => {
                        setLoading(false);
                      }, 1000);
                  }
                }}
                renderScrollBar={false}
              >
                <div
                  className="min-h-screen py-12 mt-24 flex flex-col"
                  style={{ width: `${viewport}px` }}
                >
                  <div className="bg-white w-full flex-1 border z-50">
                    <Puck.Preview />
                  </div>
                </div>
              </ReactInfiniteCanvas>
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Hello</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </Puck>
    </main>
  );
}
