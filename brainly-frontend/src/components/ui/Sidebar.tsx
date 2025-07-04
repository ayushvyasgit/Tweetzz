import { TwitterIcon } from "../../icons/TwitterIcon";
import { SidebarItem } from "./SidebarItem";
import { Logo } from "../../icons/Logo";

export function Sidebar(){

  return <div className="h-screen bg-white border-r w-76 fixed left-0 top-0">
    <div>
      <div className=" flex  justify-center text-2xl py-text-purple-600 p-10">
        <div> <Logo/></div>
        <div> Brainly </div>
      </div>
       
      <div className="flex flex-col px-20 space-y-4 ">
        <SidebarItem  text="Twitter" icon={<TwitterIcon/>} />
        <SidebarItem icon={<TwitterIcon/>} text="yt"/>
      </div>
    </div>
  </div>
}