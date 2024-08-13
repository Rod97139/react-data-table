import * as React from "react";

import { useState } from "react"

interface TableProps{
    data: Record<string, any>[]; // Tableau d'objets représentant les données
    dateFormatKey?: string[]; // Tableau de clés de données qui doivent être formatées en tant que date
  }

export const ReactDataTable = ({data, dateFormatKey}: TableProps) => {

    const [filteredData, setFilteredData] = useState(data)

    const [searchValue, setSearchValue] = useState('')

    const [perPage, setPerPage] = useState(10)
    //nombre de pages
    const pageCount = Math.ceil(filteredData.length / perPage)

    const [page, setPage] = useState(1)
    const [offset, setOffset] = useState(0)
    const displaiedData = filteredData.slice(offset, offset + perPage)

    const handleSort = (target: HTMLTableHeaderCellElement) => {
        const key = target.id
        // passer tout les classes des element th a none exepter l'element cliqué
        document.querySelectorAll('.data-table-sorter').forEach(item => {
            if (item !== target) {
                item.classList.remove('asc')
                item.classList.remove('dsc')
                if (item.classList.contains('none')) {
                    return
                }
                item.classList.add('none')
            }
        })
        if (target.classList.contains('asc')) {
            target.classList.remove('asc')
            target.classList.toggle('dsc')
            if (dateFormatKey && dateFormatKey.includes(key)) {
                const sortedData = [...filteredData].sort((a, b) => {
                    if (new Date(a[key]) > new Date(b[key])) {
                        return -1
                    }
                    if (new Date(a[key]) < new Date(b[key])) {
                        return 1
                    }
                    return 0
                })
                setFilteredData(sortedData)
                return
            }
            const sortedData = [...filteredData].sort((a, b) => {
                if (a[key] > b[key]) {
                    return -1
                }
                if (a[key] < b[key]) {
                    return 1
                }
                return 0
            })
            setFilteredData(sortedData)
            return
        }

        if (target.classList.contains('dsc')) {
            target.classList.remove('dsc')
            target.classList.toggle('none')
            if (searchValue.length === 0) {
                setFilteredData(data)
                return
            }
            searchItem(searchValue)
            return
        }

        if (target.classList.contains('none')) {
            target.classList.remove('none')
            target.classList.toggle('asc')
            if (dateFormatKey && dateFormatKey.includes(key)) {
                const sortedData = [...filteredData].sort((a, b) => {
                    if (new Date(a[key]) < new Date(b[key])) {
                        return -1
                    }
                    if (new Date(a[key]) > new Date(b[key])) {
                        return 1
                    }
                    return 0
                })
                setFilteredData(sortedData)
                return
            }
            const sortedData = [...filteredData].sort((a, b) => {
                if (a[key] < b[key]) {
                    return -1
                }
                if (a[key] > b[key]) {
                    return 1
                }
                return 0
            })
            setFilteredData(sortedData)
            return
        }
    }



    const handleNext = () => {
        if (page === pageCount) {
          return;
        }
        setPage(page + 1);
        setOffset(Number(offset) + Number(perPage));
        
      };
    
      const handlePrev = () => {
        if (page === 1) {
          return;
        }
        setPage(page - 1);
        setOffset(offset - perPage);
      };


    const searchItem = (inputValue: string) => {
        document.querySelectorAll('.data-table-sorter').forEach(item => {
                item.classList.remove('asc')
                item.classList.remove('dsc')
                if (item.classList.contains('none')) {
                    return
                }
                item.classList.add('none')
        })

        
        setSearchValue(inputValue)

        if (inputValue.length === 0) {
            setFilteredData(data)
            return
        }

        const filteredData = data.filter(item => {
            return Object.values(item).some(value => 
                value.toString().toLowerCase().includes(inputValue.toLowerCase())
            )
        })
        setPage(1)
        setOffset(0)
        setFilteredData(filteredData)
    }

  return (
    <div className="data-table-container">
        { data.length === 0 ? <p className="no-data-available">No data available</p> : 
        <>
          <div className="data-table-search-bar">
            <div className="data-table-length">
                <label htmlFor="data-table-length">Show</label>
                <select onChange={(e) => {
                    setPerPage(Number(e.target.value))
                    setPage(1)
                    setOffset(0)
                    }} name="data-table-length" id="data-table-length">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                <label htmlFor="data-table-length">entries</label>
            </div>
            <div className="data-table-filter">
                <input onChange={(e)=> searchItem(e.target.value)} type="text" placeholder="Search" />
            </div>
          </div>
        <table className="data-table-wrapper">
            <thead className="data-table-header">
                <tr>
                    {data.length > 0 && Object.keys(data[0]).map((key, index) => {
                        return <th
                        style={{cursor: 'pointer'}}
                        onClick={(e) => handleSort(e.target as HTMLTableCellElement)} className="data-table-sorter none" id={key} key={index}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) =>  str.toUpperCase())}</th>
                    })}
                </tr>
            </thead>
            <tbody className="data-table-body">
                {data.length > 0 && displaiedData.map((item, index) => {
                    return (
                        <tr key={index}>
                            {Object.values(item).map((value, index) => {
                                return <td key={index}>{value}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
        <div className="data-table-info">
            <p>Showing {Number(offset) + 1} to {(offset + perPage < filteredData.length) ? Number(offset + perPage) : filteredData.length} of {filteredData.length} entries</p>
        </div>
        <div className="data-table-paginate">
        { pageCount > 1 && <>
            { page > 1 &&
                <button onClick={handlePrev} >Prev</button>
            }
            {Array(pageCount).fill(0).map((_, index) => {
                if (index + 1 === page) {
                    return <button key={index} className="active" onClick={() => {
                        setPage(index + 1)
                        setOffset(index * perPage)
                    }}>{index + 1}</button>
                } else {
                    return <button key={index} onClick={() => {
                        setPage(index + 1)
                        setOffset(index * perPage)
                    }}>{index + 1}</button>
                }
            })}

            { page < pageCount &&
                <button onClick={handleNext} >Next</button>
                }
            </>
        }
        </div>
       </> 
       }
    </div>
  )
}