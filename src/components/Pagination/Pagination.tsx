import React, {useState} from "react";
import s from './Pagination.module.css';

type PropsType = {
    getPage: (page:number) => void
    pageCount: number
    currentPage: number
    portionSize?:number
}
let Pagination:React.FC<PropsType> = ({getPage, pageCount, currentPage, portionSize=10}) => {
    let pages = []
    for (let i = 1; i < pageCount; i++) {
        pages.push(i)
    }
    const portionCount = Math.ceil(pageCount/portionSize)
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionNumber = (portionNumber - 1)*portionSize + 1
    const rightPortionNumber = portionNumber*portionSize

    let paginationItems = pages
        .filter(p => p >= leftPortionNumber && p <= rightPortionNumber)
        .map(p =>
            <span className={currentPage === p ? s.activeClass : ""}
              key={p}
              onClick={() => getPage(p)}>{p}</span>
        )

    return (
        <div>
            {portionNumber > 1 && <button onClick={() => setPortionNumber(portionNumber - 1)}>prev</button>}
            {paginationItems}
            {portionNumber < portionCount && <button onClick={() => setPortionNumber(portionNumber + 1)}>next</button>}
        </div>
    );
}

export default Pagination;