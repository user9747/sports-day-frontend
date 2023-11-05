import { Popover } from "@headlessui/react";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const auth = useAuth();
  return (
    <nav className="h-12 border-b border-neutral-300 flex items-center justify-between px-8 py-5 bg-white">
      <h1 className="font-semibold text-lg text-neutral-800">Sports Day</h1>

      <Popover className="relative">
        <Popover.Button>
          <div className="bg-black text-white text-lg flex items-center justify-center h-8 w-8 rounded-full">
            {auth.appState.userName?.[0]}
          </div>
        </Popover.Button>

        <Popover.Panel className="absolute right-0 z-10 bg-white border rounded-lg text-sm overflow-hidden">
          <div className="px-4 bg-neutral-100 py-1.5 flex items-center gap-1">
            <div className="bg-black text-white text-lg flex items-center justify-center h-8 w-8 rounded-full">
              {auth.appState.userName?.[0]}
            </div>
            {auth.appState.userName}
          </div>
          <div
            className="px-4 pt-2 pb-1.5 cursor-pointer"
            onClick={auth.logout}
          >
            logout
          </div>
        </Popover.Panel>
      </Popover>
    </nav>
  );
}

export default Navbar;
