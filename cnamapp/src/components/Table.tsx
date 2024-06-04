import React from 'react';

interface ITableProps<T> {
  data: T[];
  columns: string[];
  deleteRow : (t:number)=>void
  update : (t:T)=>void
}


const Table = <T extends { id: number }>({ data, columns,deleteRow,update }: ITableProps<T>) => {
  if (!data || !columns) {
    throw new Error('Table data and columns are required');
  }
  return (
    <table className="w-full text-left divide-y divide-gray-200">
      <thead>
        <tr>
          {columns.map((columnKey) => (
            <th key={columnKey as string} className="px-4 py-2 bg-gray-100 sm:table-cell">
              <span className="hidden sm:block">{columnKey}</span>
              <span className="block sm:hidden"></span>
            </th>
          ))}
         
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {data.map((item) => {
          if (!item) {
            throw new Error('Table data item is required');
          }
          if (item.id!== 0) {
          const entries = Object.entries(item);
          return (
             
            <tr key={item.id}>
              {
              
              entries.map((entrie) => {
                const [keyCol, valueCol] = entrie;
                if (keyCol !== 'id' ) {
                return (
                  <td key={`${item.id}-${keyCol}`} className="px-4 py-2 sm:table-cell">
                    <span className="block sm:hidden font-medium">{valueCol} </span>
                    <span className="hidden sm:block">{valueCol} </span>
                  </td>
                );
              }
            }
            )
          }
            <td>
              <span>
                <button onClick={()=>update(item)} className="px-2 py-1 bg-gray-200 text-gray-700 rounded mr-2 hover:bg-gray-300">
                    Editer
                </button>
                <button  onClick={()=>deleteRow(item.id)} className="px-2 py-1 bg-red-500 text-white rounded mr-2 hover:bg-red-600">
                    Supprimer
                </button>
              </span>
             </td>
            </tr>
          );
        }})}
      </tbody>
    </table>
  );
};
  
  export default Table;