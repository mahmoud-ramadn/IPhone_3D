import { appleImg, bagImg, searchImg } from "../utils"
import { navLists } from "../constants"
const NavBar = () => {
    return (
        <header className="w-full py-5 sm:px-10 px-5  flex  justify-between 
           items-center
        ">
            <nav className=" flex w-full screen-max-width items-center  gap-2">

                <img src={appleImg} alt="apple" width={14}
                    height={18}
                />

                <div className="flex  items-center flex-1   justify-center gap-10 max-sm:hidden">
                    {navLists.map((nav) => (
                        <div key={nav} className=" px-5 text-gray text-sm cursor-pointer 
                         hover:text-white duration-200
                         transition-all
                        
                         ">
                            {nav}
                        </div>
                    ))}
                </div>

                <div className=" flex  items-baseline  gap-7 max-sm:justify-end max-sm:flex-1 ">
                    <img src={searchImg} alt="search" width={18} height={18} />
                    <img src={bagImg} alt="search" width={18} height={18} />
                </div>
            </nav>
        </header>
    )
}

export default NavBar