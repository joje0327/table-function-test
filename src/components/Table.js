import {useEffect, useState} from "react";

const Table = ({ dataSet, column, state, setState, state2, setState2 }) => {
    console.log("data : ", dataSet);
    // console.log("column: ", column);

    const [editList, setEditList] = useState(() => new Array(dataSet?.rowList.length).fill(0));


    const [title, setTitle] = useState('');

    useEffect(() => {
        let temp = {}
        dataSet?.rowList.forEach((row, index) => {
            console.log("row ?? ", row);

            temp[row[0].houseHoldId] = ''});

        console.log("temp:", temp);
        setState(temp);
        setState2(temp);

    }, [dataSet]);

    return (<>
        {dataSet && (<table>
            <thead>
            <tr>
                {/*{console.log("data.columnList : ",dataSet.columnList)}*/}
                {dataSet?.columnList.map((item, index)=> {
                        if(index ==0) {
                            return <td>구분</td>
                        }
                        return (<TableHeadItem item ={item}/>)

                }
                    )}
                <td>합계</td>
            </tr>
            </thead>
            <tbody>
            <tr>
                {console.log("columnSumList : ", dataSet?.columnSumList)}
                {dataSet?.columnSumList.map((item, index) => {
                    if(index==0){
                        return <td>항목별 합계</td>
                    }
                           return <td>{item.value}</td>
                    })}
                <td>{dataSet?.totalSum}</td>
            </tr>
            {dataSet?.rowList.map((item, index) =>
                <TableRow item={item} column={column} index={index} setEditList={setEditList} editList={editList} state={state} setState={setState}
                          dataSet={dataSet} state2={state2} setState2={setState2} />)}
            </tbody>
        </table>)}
    </>)
}


const TableHeadItem = ({item}) => <th>{item.heading}</th>
const TableRow = ({item, column, setEditList, editList, state, setState,dataSet}) => (
    <>
        {console.log("pppppp: ", item)}
    <tr>

        {item?.map((item, index) => {
            // console.log("item : ", item, "index : ", index, "dataSet.columnList.length  :", dataSet.columnList.length);
            if (index === 0) {
                return <>
                    <td>{item.householdName}</td>
                    <td>{item.feePrice}</td>
                </>
            }

            if (index === dataSet.columnList.length-2) {
                return <>
                    <td> {(item.editable) ?
                        <input type={"number"}
                               name={item.houseHoldId}
                               placeholder={item.feePrice}
                               onChange={(e) => {
                            const value = e.target.value;
                            setState({
                                ...state,
                                [e.target.name]: value,

                            });
                            console.log("state : ", state);


                        }}

                        /> : item.feePrice}</td>
                    {console.log("index ddd : ", index, "dataSet.rowSumList : ", dataSet.rowSumList)}
                    {console.log("item ddd : ", item, "dataSet.rowSumList : ", dataSet.rowSumList)}
                    {console.log("item ddd : ", item, "dataSet.rowSumList : ", dataSet.rowSumList)}
                    {/*<td>{dataSet?.rowSumList[Object.keys(rowSumList).find(key => "houseHoldId")}</td>*/}
                    <td>{dataSet?.rowSumList.map((a, index) => {
                        if (a.houseHoldId == item.houseHoldId) return a.value;

                    })}</td>
                    {/*{dataSet?.rowSumList.map((row)=> <td>{row.value}</td>)}*/}

                </>;
            }
            return <td> {(item.editable) ?
                <input type={"number"}
                       name={item.houseHoldId}
                       placeholder={item.feePrice}
                       onChange={(e) => {
                // console.log("editList : ",editList);
                // let temp = editList.map(i => i);
                // temp[index] = e.target.value;
                // setEditList(temp);
                // console.log("temp : ",temp);
                const value = e.target.value;
                setState({
                    ...state,
                    [e.target.name]: value,

                });
                console.log("state : ", state);


            }} /> : item.feePrice}</td>;

        })}

        {/*{column.map((columnItem, index) => {*/}
        {/*    // console.log(item);*/}
        {/*    // console.log("itemDetail:",itemDetail);*/}
        {/*    // console.log("itemDetail:",itemDetail.feePrice);*/}
        {/*    // console.log("columnItem.FeeId:",columnItem.FeeId);*/}
        {/*    // console.log("itemDetail.feeId:",itemDetail.feeId);*/}
        {/*    // if (columnItem.FeeId === itemDetail.feeId){*/}
        {/*    // if (columnItem.FeeId === itemDetail.feeId){*/}
        {/*    //     console.log("itemDetail:",itemDetail.feePrice);*/}
        {/*    //     return <td>{itemDetail.feePrice}</td>*/}
        {/*    let filter*/}
        {/*    if (columnItem.value === 'houseHoldFee') {*/}
        {/*        filter = item['houseHoldFee'].filter((itemDetail, index) =>*/}
        {/*            columnItem.FeeId === itemDetail.feeId);*/}
        {/*        // console.log("filter : ", filter);*/}
        {/*        return <td>{filter[0].feePrice}</td>*/}
        {/*    }*/}
        {/*    return <td>{item['householdName']}</td>*/}
        {/*    // console.log(item[`${columnItem.value}`])*/}
        {/*    // console.log(columnItem.value)*/}
        {/*}*/}
        {/*)*/}
        {/*}*/}
    </tr>
    </>
);


export default Table;
