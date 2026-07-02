import { Link } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Notebook, PlusIcon } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (

    <header className="bg-base-300 border-b border-base-content/10">

      <div className="container mx-auto px-14 h-20">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">

              <Notebook className="w-6 h-6 text-primary" />
              <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">Note-Board</h1>
            </Link>
          </div>

          <div className="flex items-center gap-12">


            {authUser && (
              <>
                <Link to={"/create"} className="btn btn-primary">
                  <PlusIcon className="size-5" />
                  <span>New Note</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;


