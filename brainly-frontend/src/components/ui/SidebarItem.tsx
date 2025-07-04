import type { ReactElement } from "react";

export function SidebarItem({text,icon}:{text:string; icon:ReactElement}){
  return <div className="flex text-xl text-gray-700 py-2 cursor-pointer hover:bg-gray-700 rounded max-w-40 pl-4 tranisition-all duration-1000">
          <span className="pr-3">{icon}</span>
          <span >{text}</span>
        </div>
}