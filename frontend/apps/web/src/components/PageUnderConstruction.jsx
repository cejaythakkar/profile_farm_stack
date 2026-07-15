
import {useLocation} from 'react-router-dom'

const PageUnderConstruction = () => {
    const location = useLocation() //params
    console.log(location)
    const pathArr = location.pathname.split("/")
    const pageName = pathArr[pathArr.length - 1]
    const activePage = pageName.charAt(0).toUpperCase() + pageName.slice(1)
  return (
     <div className="w-full flex-1 items-center justify-center flex">
        <div className="h-[50%] w-[50%] flex items-center justify-center bg-black/25 rounded-2xl border border-gray-500 shadow flex-col px-5">
          <h1 className="text-5xl mb-5">{activePage} Page</h1>
          <p className="text-2xl mb-3 text-center">The page is under construction 👷‍♂️</p>
        </div>
      </div>
  )
}

export default PageUnderConstruction