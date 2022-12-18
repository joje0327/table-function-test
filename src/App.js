import Table from "./components/Table";
import {useEffect, useReducer, useState} from "react";

const initialState = {
}
function reducer(state, action) {
  switch (action.type) {
    case 'INITIALIZE':
      {
        console.log('INITIALIZE In Reducer');
        state = {};
        state.columnSumList = [];
        state.rowSumList = [];
        state.totalSum = 0;
        state.rowList = [];
        state.columnList = [];
        state.columnList.push({heading: '세대', value:'householdName'})




        action.payload[0].houseHoldFee.forEach((feeInfo) =>{
          const temp ={};
          temp.heading = feeInfo.feeName;
          temp.feeId = feeInfo.feeId;
          temp.value = 'houseHoldFee';
          state.columnList.push(temp);
        })
        // {heading: '세대', value:'householdName', houseHoldId: 1},


        action.payload.forEach((householdInfo) => {
              let map = householdInfo.houseHoldFee.map((feeInfo) => {
                console.log("feeInfo", feeInfo);
                const temp = {};
                temp.houseHoldId = householdInfo.hoseholdId;
                temp.householdName = householdInfo.householdName;
                // temp.feeId = 0;
                temp['feeid'] = feeInfo.feeId;
                temp.feeName = feeInfo.feeName;
                temp.feePrice = feeInfo.feePrice;
                temp.editable = false;
                console.log("temp : ", temp);
                // Cost.push(temp);
                return temp;
              });
              // console.log("map :", map);
              //   console.log("state ; ", state);
              state.rowList.push(map);
            }
        );


        state.columnList.forEach((column) => {
              console.log("xxxxx:", column);
              let tempSum = {};
              tempSum.feeId = column.feeId;
              tempSum.heading = column.heading;
              tempSum.value = 0;
              console.log("llllll:", tempSum
              );

              state.rowList.forEach((row) => row.forEach((item) => {
                // console.log("item : ", item);
                    if (item.feeid === column.feeId) {
                      tempSum.value += item.feePrice;
                    }
                  }
              ));
              console.log("kkkkk : ", tempSum);
              state.columnSumList.push(tempSum);
        }
        );

        // state.rowList.forEach((row) => {
        //       console.log("dddddddssss d : ", row);
        //       let tempSum = {};
        //       tempSum.houseHoldId = row[0].houseHoldId;
        //       tempSum.householdName = row[0].householdName;
        //       tempSum.value = 0;
        //
        //   state.rowList.forEach((row) => row.forEach((item) => {
        //         if (item.houseHoldId === tempSum.houseHoldId) {
        //           tempSum.value += item.feePrice;
        //         }
        //     state.rowSumList.push(tempSum);
        //       })
        //   );
        //     }
        // );

        state.rowList.forEach((row) => {
              console.log("dddddddssss d : ", row);
              let tempSum = {};
              tempSum.houseHoldId = row[0].houseHoldId;
              tempSum.householdName = row[0].householdName;
              tempSum.value = 0;

              state.rowList.forEach((row) => row.forEach((item) => {
                    if (item.houseHoldId === tempSum.houseHoldId) {
                      tempSum.value += item.feePrice;
                    }

                  })
              );
          state.rowSumList.push(tempSum);
            }
        );

        state.rowList.forEach((row) => row.forEach((item) => state.totalSum += item.feePrice));





        // state.rowList.forEach((item) => console.log("item : ", item));
        return {...state};
      };
    case 'ADDNEWCOLUMN': {

      // temp.heading = feeInfo.feeName;
      // temp.feeId = feeInfo.feeId;
      // temp.value = 'houseHoldFee';
      // state.columnList.push(temp);

      state.columnList.push({heading: "new", id: 0, value: 'houseHoldFee'});
      // state.rowList.push({heading : "new", id : 0, value : 'houseHoldFee'  });
      state.rowList.forEach((row) => row.push({
        houseHoldId: row[0].houseHoldId,
        feeId: 0,
        feeName: 'none',
        feePrice: 0,
        editable: true
      }));
      // state.rowList.forEach((row) => row[state.columnList.length-1].editable = true);
      console.log(state);


      return {...state};
    }

    case 'SAVENEWCOLUMN': {

      // temp.heading = feeInfo.feeName;
      // temp.feeId = feeInfo.feeId;
      // temp.value = 'houseHoldFee';
      // state.columnList.push(temp);

      console.log("test : ",state.columnList, "test length : ", state.columnList.length, "test last : ", state.columnList[state.columnList.length-1]);
      state.columnList[state.columnList.length - 1] = {heading: action.payload.column, feeId:"new", value:'houseHoldFee'};
      state.rowList.forEach((row, index) => {
            console.log("tees ?:", row, "tees length : ", row.length);

            row[state.rowList[0].length-1] = {houseHoldId:row.houseHoldId,
              feePrice: action.payload.row[index+1],
              householdName: row.householdName,
              editable: false,
              feeId: "new",
              feeName: action.payload.column,
            }
          }
          );


      // state.columnList.push({heading: "new", id: 0, value: 'houseHoldFee'});
      // // state.rowList.push({heading : "new", id : 0, value : 'houseHoldFee'  });
      // state.rowList.forEach((row) => row.push({
      //   houseHoldId: row[0].houseHoldId,
      //   feeId: 0,
      //   feeName: 'none',
      //   feePrice: 0,
      //   editable: true
      // }));
      // // state.rowList.forEach((row) => row[state.columnList.length-1].editable = true);
      // console.log(state);


      return {...state};
    }

    case 'CANCELADDNEWCOLUMN': {

      state.columnList.pop();
      // state.rowList.push({heading : "new", id : 0, value : 'houseHoldFee'  });
      state.rowList.forEach((row) => row.pop());
      // state.rowList.forEach((row) => row[state.columnList.length-1].editable = true);
      console.log(state);


      return {...state};
    }


    case 'CHANGECOLUMNNAMEINNEWCOLUMN': {

      // temp.heading = feeInfo.feeName;
      // temp.feeId = feeInfo.feeId;
      // temp.value = 'houseHoldFee';
      // state.columnList.push(temp);

      state.columnList[state.columnList.length-1].heading= action.payload;
      // state.rowList.push({heading : "new", id : 0, value : 'houseHoldFee'  });
      // state.rowList.forEach((row) => row.push({houseHoldId:row[0].houseHoldId, feeId: 0, feeName:'none', feePrice : 0,editable:true }));
      // state.rowList.forEach((row) => row[state.columnList.length-1].editable = true);
      // console.log(state);


      return {...state};
    }

    case 'CHANGECOLUMNNAMEINEDITMODE': {

      // temp.heading = feeInfo.feeName;
      // temp.feeId = feeInfo.feeId;
      // temp.value = 'houseHoldFee';
      // state.columnList.push(temp);

      state.columnList[4].heading= action.payload;
      // state.rowList.push({heading : "new", id : 0, value : 'houseHoldFee'  });
      // state.rowList.forEach((row) => row.push({houseHoldId:row[0].houseHoldId, feeId: 0, feeName:'none', feePrice : 0,editable:true }));
      // state.rowList.forEach((row) => row[state.columnList.length-1].editable = true);
      // console.log(state);


      return {...state};
    }

    case 'SAVECOLUMN': {

      // temp.heading = feeInfo.feeName;
      // temp.feeId = feeInfo.feeId;
      // temp.value = 'houseHoldFee';
      // state.columnList.push(temp);

      state.columnList[state.columnList.length-1]= {...state.columnList[state.columnList.length-1]};
      // state.rowList.push({heading : "new", id : 0, value : 'houseHoldFee'  });
      state.rowList.forEach((row) => row.push({houseHoldId:row[0].houseHoldId, feeId: 0, feeName:'none', feePrice : 0,editable:true }));
      // state.rowList.forEach((row) => row[state.columnList.length-1].editable = true);
      console.log(state);


      return {...state};
    }

    case 'DELETECOLUMN': {

      // temp.heading = feeInfo.feeName;
      // temp.feeId = feeInfo.feeId;
      // temp.value = 'houseHoldFee';
      // state.columnList.push(temp);

      let deleteColumnIndex = state.rowList[0].length;

      state.rowList.forEach((row) => {
        console.log("rowlist", row);
        console.log("deleteColumnIndex", deleteColumnIndex);
        row.splice(deleteColumnIndex-1, 1)});

      state.columnList.pop();
      // state.rowList.push({heading : "new", id : 0, value : 'houseHoldFee'  });
      // state.rowList.forEach((row) => row.push({houseHoldId:row[0].houseHoldId, feeId: 0, feeName:'none', feePrice : 0,editable:true }));
      // state.rowList.forEach((row) => row[state.columnList.length-1].editable = true);
      console.log(state);
      return {...state};
    }


    case 'CHANGECOLUMN': {

      state.columnList[4]={...state.columnList[4]};
      // state.rowList[3]= {...state.rowList[3], editable:true}

      // state.rowList.forEach((row) => row.push({houseHoldId:row[0].houseHoldId, feeId: 0, feeName:'none', feePrice : 0,editable:true }));

      state.rowList.forEach((row) => row[3].editable = true);
      // state.rowList[3].forEach((b)=>b.editable = true);
      // state.rowList.map((row) => row.map((b) => ({...b,editable:true })));
      // state.rowList.forEach((row) => console.log("ddddggggg : ", row));
      return {...state};
    }

    case 'SAVECHANGECOLUMN': {
      if(action.payload.column ===''){

      }
      else{
        state.columnList[4] = {...state.columnList[4], heading: action.payload.column};
      }




      // state.columnList[4]={...state.columnList[4], heading:'new'};
      // state.rowList[3]= {...state.rowList[3], editable:true}

      // state.rowList.forEach((row) => row.push({houseHoldId:row[0].houseHoldId, feeId: 0, feeName:'none', feePrice : 0,editable:true }));





      // state.rowList.forEach((row) => {
      //   row[3].editable = false; row[3].feePrice = 1000;});


      state.rowList.forEach((row, index) => {
            console.log("tees ?:", row, "tees length : ", row.length);

            row[3] = {houseHoldId:row.houseHoldId,
              feePrice: action.payload.row[index+1],
              householdName: row.householdName,
              editable: false,
              feeId: row.feeId,
              feeName: action.payload.column,
            }
          }
      );




      // state.rowList[3].forEach((b)=>b.editable = true);
      // state.rowList.map((row) => row.map((b) => ({...b,editable:true })));
      // state.rowList.forEach((row) => console.log("ddddggggg : ", row));
      return {...state};
    }

    case 'CANCLECHANGECOLUMN': {

      // state.columnList[4]={...state.columnList[4], heading:'new'};
      // state.rowList[3]= {...state.rowList[3], editable:true}

      // state.rowList.forEach((row) => row.push({houseHoldId:row[0].houseHoldId, feeId: 0, feeName:'none', feePrice : 0,editable:true }));

      state.rowList.forEach((row) => {
        row[3].editable = false;});


      // state.rowList[3].forEach((b)=>b.editable = true);
      // state.rowList.map((row) => row.map((b) => ({...b,editable:true })));
      // state.rowList.forEach((row) => console.log("ddddggggg : ", row));
      return {...state};
    }





    default:
      return state;
        // action.payload.forEach((householdInfo) => {
        //   let map = householdInfo.houseHoldFee.map((feeInfo) =>{
        //     const temp = {};
        //     temp.houseHoldId = householdInfo.hoseholdId;
        //     temp.householdName = householdInfo.householdName;
        //     temp.feeId = feeInfo.feeId;
        //     temp.feeName = feeInfo.feeName;
        //     temp.feePrice = feeInfo.feePrice;
        //     console.log("temp : ", temp);
        //     // Cost.push(temp);
        //     return temp;
        //   });
        //   console.log("map :", map);
        //   return Cost.push(map);
      }
  }



function App() {



  const column = [
    {heading: '세대', value:'householdName', houseHoldId: 1},
    {heading: '승강기안전관리대행', value:'houseHoldFee', FeeId: 1},
    {heading: '소방안전관리대행', value:'houseHoldFee', FeeId: 2},
    {heading: '건물청소비', value:'houseHoldFee', FeeId: 3},
    {heading: '승강기검사비외', value:'houseHoldFee', FeeId: 4},
    {heading: '정화조및저수조', value:'houseHoldFee', FeeId: 5},
    {heading: '화재보험', value:'houseHoldFee', FeeId: 6},
    {heading: '순회점검및민원방문처', value:'houseHoldFee', FeeId: 7},
    {heading: '전산사용료', value:'houseHoldFee', FeeId: 8},
    {heading: '인터넷사용료', value:'houseHoldFee', FeeId: 9},
  ]

  const data = [
    {
      hoseholdId: 1,
      householdName: '201호',
      houseHoldFee: [{feeId: 1, feeName: "승강기안전관리대행", feePrice: 4890}, {
        feeId: 2,
        feeName: "소방안전관리대행",
        feePrice: 4890
      }, {feeId: 3, feeName: "건물청소비", feePrice: 6110}, {feeId: 4, feeName: "승강기검사비외", feePrice: 1500}, {
        feeId: 5,
        feeName: "정화조및저수조",
        feePrice: 3050
      }, {feeId: 6, feeName: "화재보험", feePrice: 1110}, {feeId: 7, feeName: "순회점검및민원방문처", feePrice: 10390}, {
        feeId: 8,
        feeName: "전산사용료",
        feePrice: 3060
      }, {feeId: 9, feeName: "인터넷사용료", feePrice: 15000}]
    },
    {
      hoseholdId: 2,
      householdName: '202호',
      houseHoldFee: [{feeId: 1, feeName: "승강기안전관리대행", feePrice: 4890}, {
        feeId: 2,
        feeName: "소방안전관리대행",
        feePrice: 4890
      }, {feeId: 3, feeName: "건물청소비", feePrice: 6110}, {feeId: 4, feeName: "승강기검사비외", feePrice: 1500}, {
        feeId: 5,
        feeName: "정화조및저수조",
        feePrice: 3050
      }, {feeId: 6, feeName: "화재보험", feePrice: 1110}, {feeId: 7, feeName: "순회점검및민원방문처", feePrice: 10390}, {
        feeId: 8,
        feeName: "전산사용료",
        feePrice: 3060
      }, {feeId: 9, feeName: "인터넷사용료", feePrice: 15000}]
    },
    {
      hoseholdId: 3,
      householdName: '203호',
      houseHoldFee: [{feeId: 1, feeName: "승강기안전관리대행", feePrice: 4890}, {
        feeId: 2,
        feeName: "소방안전관리대행",
        feePrice: 4890
      }, {feeId: 3, feeName: "건물청소비", feePrice: 6110}, {feeId: 4, feeName: "승강기검사비외", feePrice: 1500}, {
        feeId: 5,
        feeName: "정화조및저수조",
        feePrice: 3050
      }, {feeId: 6, feeName: "화재보험", feePrice: 1110}, {feeId: 7, feeName: "순회점검및민원방문처", feePrice: 10390}, {
        feeId: 8,
        feeName: "전산사용료",
        feePrice: 3060
      }, {feeId: 9, feeName: "인터넷사용료", feePrice: 15000}]
    },
    {
      hoseholdId: 4,
      householdName: '204호',
      houseHoldFee: [{feeId: 1, feeName: "승강기안전관리대행", feePrice: 4890}, {
        feeId: 2,
        feeName: "소방안전관리대행",
        feePrice: 4890
      }, {feeId: 3, feeName: "건물청소비", feePrice: 6110}, {feeId: 4, feeName: "승강기검사비외", feePrice: 1500}, {
        feeId: 5,
        feeName: "정화조및저수조",
        feePrice: 3050
      }, {feeId: 6, feeName: "화재보험", feePrice: 1110}, {feeId: 7, feeName: "순회점검및민원방문처", feePrice: 10390}, {
        feeId: 8,
        feeName: "전산사용료",
        feePrice: 3060
      }, {feeId: 9, feeName: "인터넷사용료", feePrice: 15000}]
    },
    {
      hoseholdId: 5,
      householdName: '201호',
      houseHoldFee: [{feeId: 1, feeName: "승강기안전관리대행", feePrice: 4890}, {
        feeId: 2,
        feeName: "소방안전관리대행",
        feePrice: 4890
      }, {feeId: 3, feeName: "건물청소비", feePrice: 6110}, {feeId: 4, feeName: "승강기검사비외", feePrice: 1500}, {
        feeId: 5,
        feeName: "정화조및저수조",
        feePrice: 3050
      }, {feeId: 6, feeName: "화재보험", feePrice: 1110}, {feeId: 7, feeName: "순회점검및민원방문처", feePrice: 10390}, {
        feeId: 8,
        feeName: "전산사용료",
        feePrice: 3060
      }, {feeId: 9, feeName: "인터넷사용료", feePrice: 15000}]
    },
    {
      hoseholdId: 6,
      householdName: '301호',
      houseHoldFee: [{feeId: 1, feeName: "승강기안전관리대행", feePrice: 4890}, {
        feeId: 2,
        feeName: "소방안전관리대행",
        feePrice: 4890
      }, {feeId: 3, feeName: "건물청소비", feePrice: 6110}, {feeId: 4, feeName: "승강기검사비외", feePrice: 1500}, {
        feeId: 5,
        feeName: "정화조및저수조",
        feePrice: 3050
      }, {feeId: 6, feeName: "화재보험", feePrice: 1110}, {feeId: 7, feeName: "순회점검및민원방문처", feePrice: 10390}, {
        feeId: 8,
        feeName: "전산사용료",
        feePrice: 3060
      }, {feeId: 9, feeName: "인터넷사용료", feePrice: 15000}]
    },
    {
      hoseholdId: 7,
      householdName: '302호',
      houseHoldFee: [{feeId: 1, feeName: "승강기안전관리대행", feePrice: 4890}, {
        feeId: 2,
        feeName: "소방안전관리대행",
        feePrice: 4890
      }, {feeId: 3, feeName: "건물청소비", feePrice: 6110}, {feeId: 4, feeName: "승강기검사비외", feePrice: 1500}, {
        feeId: 5,
        feeName: "정화조및저수조",
        feePrice: 3050
      }, {feeId: 6, feeName: "화재보험", feePrice: 1110}, {feeId: 7, feeName: "순회점검및민원방문처", feePrice: 10390}, {
        feeId: 8,
        feeName: "전산사용료",
        feePrice: 3060
      }, {feeId: 9, feeName: "인터넷사용료", feePrice: 15000}]
    },
    {
      hoseholdId: 8,
      householdName: '303호',
      houseHoldFee: [{feeId: 1, feeName: "승강기안전관리대행", feePrice: 4890}, {
        feeId: 2,
        feeName: "소방안전관리대행",
        feePrice: 4890
      }, {feeId: 3, feeName: "건물청소비", feePrice: 6110}, {feeId: 4, feeName: "승강기검사비외", feePrice: 1500}, {
        feeId: 5,
        feeName: "정화조및저수조",
        feePrice: 3050
      }, {feeId: 6, feeName: "화재보험", feePrice: 1110}, {feeId: 7, feeName: "순회점검및민원방문처", feePrice: 10390}, {
        feeId: 8,
        feeName: "전산사용료",
        feePrice: 3060
      }, {feeId: 9, feeName: "인터넷사용료", feePrice: 15000}]
    },
    {
      hoseholdId: 9,
      householdName: '304호',
      houseHoldFee: [{feeId: 1, feeName: "승강기안전관리대행", feePrice: 4890}, {
        feeId: 2,
        feeName: "소방안전관리대행",
        feePrice: 4890
      }, {feeId: 3, feeName: "건물청소비", feePrice: 6110}, {feeId: 4, feeName: "승강기검사비외", feePrice: 1500}, {
        feeId: 5,
        feeName: "정화조및저수조",
        feePrice: 3050
      }, {feeId: 6, feeName: "화재보험", feePrice: 1110}, {feeId: 7, feeName: "순회점검및민원방문처", feePrice: 10390}, {
        feeId: 8,
        feeName: "전산사용료",
        feePrice: 3060
      }, {feeId: 9, feeName: "인터넷사용료", feePrice: 15000}]
    },
    {
      hoseholdId: 10,
      householdName: '401호',
      houseHoldFee: [{feeId: 1, feeName: "승강기안전관리대행", feePrice: 4890}, {
        feeId: 2,
        feeName: "소방안전관리대행",
        feePrice: 4890
      }, {feeId: 3, feeName: "건물청소비", feePrice: 6110}, {feeId: 4, feeName: "승강기검사비외", feePrice: 1500}, {
        feeId: 5,
        feeName: "정화조및저수조",
        feePrice: 3050
      }, {feeId: 6, feeName: "화재보험", feePrice: 1110}, {feeId: 7, feeName: "순회점검및민원방문처", feePrice: 10390}, {
        feeId: 8,
        feeName: "전산사용료",
        feePrice: 3060
      }, {feeId: 9, feeName: "인터넷사용료", feePrice: 15000}]
    },
    {
      hoseholdId: 11,
      householdName: '402호',
      houseHoldFee: [{feeId: 1, feeName: "승강기안전관리대행", feePrice: 4890}, {
        feeId: 2,
        feeName: "소방안전관리대행",
        feePrice: 4890
      }, {feeId: 3, feeName: "건물청소비", feePrice: 6110}, {feeId: 4, feeName: "승강기검사비외", feePrice: 1500}, {
        feeId: 5,
        feeName: "정화조및저수조",
        feePrice: 3050
      }, {feeId: 6, feeName: "화재보험", feePrice: 1110}, {feeId: 7, feeName: "순회점검및민원방문처", feePrice: 10390}, {
        feeId: 8,
        feeName: "전산사용료",
        feePrice: 3060
      }, {feeId: 9, feeName: "인터넷사용료", feePrice: 15000}]
    },
    {
      hoseholdId: 12,
      householdName: '403호',
      houseHoldFee: [{feeId: 1, feeName: "승강기안전관리대행", feePrice: 4890}, {
        feeId: 2,
        feeName: "소방안전관리대행",
        feePrice: 4890
      }, {feeId: 3, feeName: "건물청소비", feePrice: 6110}, {feeId: 4, feeName: "승강기검사비외", feePrice: 1500}, {
        feeId: 5,
        feeName: "정화조및저수조",
        feePrice: 3050
      }, {feeId: 6, feeName: "화재보험", feePrice: 1110}, {feeId: 7, feeName: "순회점검및민원방문처", feePrice: 10390}, {
        feeId: 8,
        feeName: "전산사용료",
        feePrice: 3060
      }, {feeId: 9, feeName: "인터넷사용료", feePrice: 15000}]
    },
    {
      hoseholdId: 13,
      householdName: '404호',
      houseHoldFee: [{feeId: 1, feeName: "승강기안전관리대행", feePrice: 4890}, {
        feeId: 2,
        feeName: "소방안전관리대행",
        feePrice: 4890
      }, {feeId: 3, feeName: "건물청소비", feePrice: 6110}, {feeId: 4, feeName: "승강기검사비외", feePrice: 1500}, {
        feeId: 5,
        feeName: "정화조및저수조",
        feePrice: 3050
      }, {feeId: 6, feeName: "화재보험", feePrice: 1110}, {feeId: 7, feeName: "순회점검및민원방문처", feePrice: 10390}, {
        feeId: 8,
        feeName: "전산사용료",
        feePrice: 3060
      }, {feeId: 9, feeName: "인터넷사용료", feePrice: 15000}]
    },
    {
      hoseholdId: 14,
      householdName: '501호',
      houseHoldFee: [{feeId: 1, feeName: "승강기안전관리대행", feePrice: 4890}, {
        feeId: 2,
        feeName: "소방안전관리대행",
        feePrice: 4890
      }, {feeId: 3, feeName: "건물청소비", feePrice: 6110}, {feeId: 4, feeName: "승강기검사비외", feePrice: 1500}, {
        feeId: 5,
        feeName: "정화조및저수조",
        feePrice: 3050
      }, {feeId: 6, feeName: "화재보험", feePrice: 1110}, {feeId: 7, feeName: "순회점검및민원방문처", feePrice: 10390}, {
        feeId: 8,
        feeName: "전산사용료",
        feePrice: 3060
      }, {feeId: 9, feeName: "인터넷사용료", feePrice: 15000}]
    },
    {
      hoseholdId: 15,
      householdName: '502호',
      houseHoldFee: [{feeId: 1, feeName: "승강기안전관리대행", feePrice: 4890}, {
        feeId: 2,
        feeName: "소방안전관리대행",
        feePrice: 4890
      }, {feeId: 3, feeName: "건물청소비", feePrice: 6110}, {feeId: 4, feeName: "승강기검사비외", feePrice: 1500}, {
        feeId: 5,
        feeName: "정화조및저수조",
        feePrice: 3050
      }, {feeId: 6, feeName: "화재보험", feePrice: 1110}, {feeId: 7, feeName: "순회점검및민원방문처", feePrice: 10390}, {
        feeId: 8,
        feeName: "전산사용료",
        feePrice: 3060
      }, {feeId: 9, feeName: "인터넷사용료", feePrice: 15000}]
    },
    {
      hoseholdId: 16,
      householdName: '503호',
      houseHoldFee: [{feeId: 1, feeName: "승강기안전관리대행", feePrice: 4890}, {
        feeId: 2,
        feeName: "소방안전관리대행",
        feePrice: 4890
      }, {feeId: 3, feeName: "건물청소비", feePrice: 6110}, {feeId: 4, feeName: "승강기검사비외", feePrice: 1500}, {
        feeId: 5,
        feeName: "정화조및저수조",
        feePrice: 3050
      }, {feeId: 6, feeName: "화재보험", feePrice: 1110}, {feeId: 7, feeName: "순회점검및민원방문처", feePrice: 10390}, {
        feeId: 8,
        feeName: "전산사용료",
        feePrice: 3060
      }, {feeId: 9, feeName: "인터넷사용료", feePrice: 15000}]
    },
    {
      hoseholdId: 17,
      householdName: '601호',
      houseHoldFee: [{feeId: 1, feeName: "승강기안전관리대행", feePrice: 4890}, {
        feeId: 2,
        feeName: "소방안전관리대행",
        feePrice: 4890
      }, {feeId: 3, feeName: "건물청소비", feePrice: 6110}, {feeId: 4, feeName: "승강기검사비외", feePrice: 1500}, {
        feeId: 5,
        feeName: "정화조및저수조",
        feePrice: 3050
      }, {feeId: 6, feeName: "화재보험", feePrice: 1110}, {feeId: 7, feeName: "순회점검및민원방문처", feePrice: 10390}, {
        feeId: 8,
        feeName: "전산사용료",
        feePrice: 3060
      }, {feeId: 9, feeName: "인터넷사용료", feePrice: 15000}]
    },
    {
      hoseholdId: 18,
      householdName: '602호',
      houseHoldFee: [{feeId: 1, feeName: "승강기안전관리대행", feePrice: 4890}, {
        feeId: 2,
        feeName: "소방안전관리대행",
        feePrice: 4890
      }, {feeId: 3, feeName: "건물청소비", feePrice: 6110}, {feeId: 4, feeName: "승강기검사비외", feePrice: 1500}, {
        feeId: 5,
        feeName: "정화조및저수조",
        feePrice: 3050
      }, {feeId: 6, feeName: "화재보험", feePrice: 1110}, {feeId: 7, feeName: "순회점검및민원방문처", feePrice: 10390}, {
        feeId: 8,
        feeName: "전산사용료",
        feePrice: 3060
      }, {feeId: 9, feeName: "인터넷사용료", feePrice: 15000}]
    },
    {
      hoseholdId: 19,
      householdName: '603호',
      houseHoldFee: [{feeId: 1, feeName: "승강기안전관리대행", feePrice: 4890}, {
        feeId: 2,
        feeName: "소방안전관리대행",
        feePrice: 4890
      }, {feeId: 3, feeName: "건물청소비", feePrice: 6110}, {feeId: 4, feeName: "승강기검사비외", feePrice: 1500}, {
        feeId: 5,
        feeName: "정화조및저수조",
        feePrice: 3050
      }, {feeId: 6, feeName: "화재보험", feePrice: 1110}, {feeId: 7, feeName: "순회점검및민원방문처", feePrice: 10390}, {
        feeId: 8,
        feeName: "전산사용료",
        feePrice: 3060
      }, {feeId: 9, feeName: "인터넷사용료", feePrice: 15000}]
    }
  ];


  // const [data, setData] = useState([
  //   {
  //     hoseholdId: 1,
  //     householdName: '201호',
  //     houseHoldFee: [{feeId: 1, feeName: "승강기안전관리대행", feePrice: 4890}, {
  //       feeId: 2,
  //       feeName: "소방안전관리대행",
  //       feePrice: 4890
  //     }, {feeId: 3, feeName: "건물청소비", feePrice: 6110}, {feeId: 4, feeName: "승강기검사비외", feePrice: 1500}, {
  //       feeId: 5,
  //       feeName: "정화조및저수조",
  //       feePrice: 3050
  //     }, {feeId: 6, feeName: "화재보험", feePrice: 1110}, {feeId: 7, feeName: "순회점검및민원방문처", feePrice: 10390}, {
  //       feeId: 8,
  //       feeName: "전산사용료",
  //       feePrice: 3060
  //     }, {feeId: 9, feeName: "인터넷사용료", feePrice: 15000}]
  //   },
  //   {
  //     hoseholdId: 2,
  //     householdName: '202호',
  //     houseHoldFee: [{feeId: 1, feeName: "승강기안전관리대행", feePrice: 4890}, {
  //       feeId: 2,
  //       feeName: "소방안전관리대행",
  //       feePrice: 4890
  //     }, {feeId: 3, feeName: "건물청소비", feePrice: 6110}, {feeId: 4, feeName: "승강기검사비외", feePrice: 1500}, {
  //       feeId: 5,
  //       feeName: "정화조및저수조",
  //       feePrice: 3050
  //     }, {feeId: 6, feeName: "화재보험", feePrice: 1110}, {feeId: 7, feeName: "순회점검및민원방문처", feePrice: 10390}, {
  //       feeId: 8,
  //       feeName: "전산사용료",
  //       feePrice: 3060
  //     }, {feeId: 9, feeName: "인터넷사용료", feePrice: 15000}]
  //   },
  //   {
  //     hoseholdId: 3,
  //     householdName: '203호',
  //     houseHoldFee: [{feeId: 1, feeName: "승강기안전관리대행", feePrice: 4890}, {
  //       feeId: 2,
  //       feeName: "소방안전관리대행",
  //       feePrice: 4890
  //     }, {feeId: 3, feeName: "건물청소비", feePrice: 6110}, {feeId: 4, feeName: "승강기검사비외", feePrice: 1500}, {
  //       feeId: 5,
  //       feeName: "정화조및저수조",
  //       feePrice: 3050
  //     }, {feeId: 6, feeName: "화재보험", feePrice: 1110}, {feeId: 7, feeName: "순회점검및민원방문처", feePrice: 10390}, {
  //       feeId: 8,
  //       feeName: "전산사용료",
  //       feePrice: 3060
  //     }, {feeId: 9, feeName: "인터넷사용료", feePrice: 15000}]
  //   },
  //   {
  //     hoseholdId: 4,
  //     householdName: '204호',
  //     houseHoldFee: [{feeId: 1, feeName: "승강기안전관리대행", feePrice: 4890}, {
  //       feeId: 2,
  //       feeName: "소방안전관리대행",
  //       feePrice: 4890
  //     }, {feeId: 3, feeName: "건물청소비", feePrice: 6110}, {feeId: 4, feeName: "승강기검사비외", feePrice: 1500}, {
  //       feeId: 5,
  //       feeName: "정화조및저수조",
  //       feePrice: 3050
  //     }, {feeId: 6, feeName: "화재보험", feePrice: 1110}, {feeId: 7, feeName: "순회점검및민원방문처", feePrice: 10390}, {
  //       feeId: 8,
  //       feeName: "전산사용료",
  //       feePrice: 3060
  //     }, {feeId: 9, feeName: "인터넷사용료", feePrice: 15000}]
  //   },
  //   {
  //     hoseholdId: 5,
  //     householdName: '201호',
  //     houseHoldFee: [{feeId: 1, feeName: "승강기안전관리대행", feePrice: 4890}, {
  //       feeId: 2,
  //       feeName: "소방안전관리대행",
  //       feePrice: 4890
  //     }, {feeId: 3, feeName: "건물청소비", feePrice: 6110}, {feeId: 4, feeName: "승강기검사비외", feePrice: 1500}, {
  //       feeId: 5,
  //       feeName: "정화조및저수조",
  //       feePrice: 3050
  //     }, {feeId: 6, feeName: "화재보험", feePrice: 1110}, {feeId: 7, feeName: "순회점검및민원방문처", feePrice: 10390}, {
  //       feeId: 8,
  //       feeName: "전산사용료",
  //       feePrice: 3060
  //     }, {feeId: 9, feeName: "인터넷사용료", feePrice: 15000}]
  //   },
  //   {
  //     hoseholdId: 6,
  //     householdName: '301호',
  //     houseHoldFee: [{feeId: 1, feeName: "승강기안전관리대행", feePrice: 4890}, {
  //       feeId: 2,
  //       feeName: "소방안전관리대행",
  //       feePrice: 4890
  //     }, {feeId: 3, feeName: "건물청소비", feePrice: 6110}, {feeId: 4, feeName: "승강기검사비외", feePrice: 1500}, {
  //       feeId: 5,
  //       feeName: "정화조및저수조",
  //       feePrice: 3050
  //     }, {feeId: 6, feeName: "화재보험", feePrice: 1110}, {feeId: 7, feeName: "순회점검및민원방문처", feePrice: 10390}, {
  //       feeId: 8,
  //       feeName: "전산사용료",
  //       feePrice: 3060
  //     }, {feeId: 9, feeName: "인터넷사용료", feePrice: 15000}]
  //   },
  //   {
  //     hoseholdId: 7,
  //     householdName: '302호',
  //     houseHoldFee: [{feeId: 1, feeName: "승강기안전관리대행", feePrice: 4890}, {
  //       feeId: 2,
  //       feeName: "소방안전관리대행",
  //       feePrice: 4890
  //     }, {feeId: 3, feeName: "건물청소비", feePrice: 6110}, {feeId: 4, feeName: "승강기검사비외", feePrice: 1500}, {
  //       feeId: 5,
  //       feeName: "정화조및저수조",
  //       feePrice: 3050
  //     }, {feeId: 6, feeName: "화재보험", feePrice: 1110}, {feeId: 7, feeName: "순회점검및민원방문처", feePrice: 10390}, {
  //       feeId: 8,
  //       feeName: "전산사용료",
  //       feePrice: 3060
  //     }, {feeId: 9, feeName: "인터넷사용료", feePrice: 15000}]
  //   },
  //   {
  //     hoseholdId: 8,
  //     householdName: '303호',
  //     houseHoldFee: [{feeId: 1, feeName: "승강기안전관리대행", feePrice: 4890}, {
  //       feeId: 2,
  //       feeName: "소방안전관리대행",
  //       feePrice: 4890
  //     }, {feeId: 3, feeName: "건물청소비", feePrice: 6110}, {feeId: 4, feeName: "승강기검사비외", feePrice: 1500}, {
  //       feeId: 5,
  //       feeName: "정화조및저수조",
  //       feePrice: 3050
  //     }, {feeId: 6, feeName: "화재보험", feePrice: 1110}, {feeId: 7, feeName: "순회점검및민원방문처", feePrice: 10390}, {
  //       feeId: 8,
  //       feeName: "전산사용료",
  //       feePrice: 3060
  //     }, {feeId: 9, feeName: "인터넷사용료", feePrice: 15000}]
  //   },
  //   {
  //     hoseholdId: 9,
  //     householdName: '304호',
  //     houseHoldFee: [{feeId: 1, feeName: "승강기안전관리대행", feePrice: 4890}, {
  //       feeId: 2,
  //       feeName: "소방안전관리대행",
  //       feePrice: 4890
  //     }, {feeId: 3, feeName: "건물청소비", feePrice: 6110}, {feeId: 4, feeName: "승강기검사비외", feePrice: 1500}, {
  //       feeId: 5,
  //       feeName: "정화조및저수조",
  //       feePrice: 3050
  //     }, {feeId: 6, feeName: "화재보험", feePrice: 1110}, {feeId: 7, feeName: "순회점검및민원방문처", feePrice: 10390}, {
  //       feeId: 8,
  //       feeName: "전산사용료",
  //       feePrice: 3060
  //     }, {feeId: 9, feeName: "인터넷사용료", feePrice: 15000}]
  //   },
  //   {
  //     hoseholdId: 10,
  //     householdName: '401호',
  //     houseHoldFee: [{feeId: 1, feeName: "승강기안전관리대행", feePrice: 4890}, {
  //       feeId: 2,
  //       feeName: "소방안전관리대행",
  //       feePrice: 4890
  //     }, {feeId: 3, feeName: "건물청소비", feePrice: 6110}, {feeId: 4, feeName: "승강기검사비외", feePrice: 1500}, {
  //       feeId: 5,
  //       feeName: "정화조및저수조",
  //       feePrice: 3050
  //     }, {feeId: 6, feeName: "화재보험", feePrice: 1110}, {feeId: 7, feeName: "순회점검및민원방문처", feePrice: 10390}, {
  //       feeId: 8,
  //       feeName: "전산사용료",
  //       feePrice: 3060
  //     }, {feeId: 9, feeName: "인터넷사용료", feePrice: 15000}]
  //   },
  //   {
  //     hoseholdId: 11,
  //     householdName: '402호',
  //     houseHoldFee: [{feeId: 1, feeName: "승강기안전관리대행", feePrice: 4890}, {
  //       feeId: 2,
  //       feeName: "소방안전관리대행",
  //       feePrice: 4890
  //     }, {feeId: 3, feeName: "건물청소비", feePrice: 6110}, {feeId: 4, feeName: "승강기검사비외", feePrice: 1500}, {
  //       feeId: 5,
  //       feeName: "정화조및저수조",
  //       feePrice: 3050
  //     }, {feeId: 6, feeName: "화재보험", feePrice: 1110}, {feeId: 7, feeName: "순회점검및민원방문처", feePrice: 10390}, {
  //       feeId: 8,
  //       feeName: "전산사용료",
  //       feePrice: 3060
  //     }, {feeId: 9, feeName: "인터넷사용료", feePrice: 15000}]
  //   },
  //   {
  //     hoseholdId: 12,
  //     householdName: '403호',
  //     houseHoldFee: [{feeId: 1, feeName: "승강기안전관리대행", feePrice: 4890}, {
  //       feeId: 2,
  //       feeName: "소방안전관리대행",
  //       feePrice: 4890
  //     }, {feeId: 3, feeName: "건물청소비", feePrice: 6110}, {feeId: 4, feeName: "승강기검사비외", feePrice: 1500}, {
  //       feeId: 5,
  //       feeName: "정화조및저수조",
  //       feePrice: 3050
  //     }, {feeId: 6, feeName: "화재보험", feePrice: 1110}, {feeId: 7, feeName: "순회점검및민원방문처", feePrice: 10390}, {
  //       feeId: 8,
  //       feeName: "전산사용료",
  //       feePrice: 3060
  //     }, {feeId: 9, feeName: "인터넷사용료", feePrice: 15000}]
  //   },
  //   {
  //     hoseholdId: 13,
  //     householdName: '404호',
  //     houseHoldFee: [{feeId: 1, feeName: "승강기안전관리대행", feePrice: 4890}, {
  //       feeId: 2,
  //       feeName: "소방안전관리대행",
  //       feePrice: 4890
  //     }, {feeId: 3, feeName: "건물청소비", feePrice: 6110}, {feeId: 4, feeName: "승강기검사비외", feePrice: 1500}, {
  //       feeId: 5,
  //       feeName: "정화조및저수조",
  //       feePrice: 3050
  //     }, {feeId: 6, feeName: "화재보험", feePrice: 1110}, {feeId: 7, feeName: "순회점검및민원방문처", feePrice: 10390}, {
  //       feeId: 8,
  //       feeName: "전산사용료",
  //       feePrice: 3060
  //     }, {feeId: 9, feeName: "인터넷사용료", feePrice: 15000}]
  //   },
  //   {
  //     hoseholdId: 14,
  //     householdName: '501호',
  //     houseHoldFee: [{feeId: 1, feeName: "승강기안전관리대행", feePrice: 4890}, {
  //       feeId: 2,
  //       feeName: "소방안전관리대행",
  //       feePrice: 4890
  //     }, {feeId: 3, feeName: "건물청소비", feePrice: 6110}, {feeId: 4, feeName: "승강기검사비외", feePrice: 1500}, {
  //       feeId: 5,
  //       feeName: "정화조및저수조",
  //       feePrice: 3050
  //     }, {feeId: 6, feeName: "화재보험", feePrice: 1110}, {feeId: 7, feeName: "순회점검및민원방문처", feePrice: 10390}, {
  //       feeId: 8,
  //       feeName: "전산사용료",
  //       feePrice: 3060
  //     }, {feeId: 9, feeName: "인터넷사용료", feePrice: 15000}]
  //   },
  //   {
  //     hoseholdId: 15,
  //     householdName: '502호',
  //     houseHoldFee: [{feeId: 1, feeName: "승강기안전관리대행", feePrice: 4890}, {
  //       feeId: 2,
  //       feeName: "소방안전관리대행",
  //       feePrice: 4890
  //     }, {feeId: 3, feeName: "건물청소비", feePrice: 6110}, {feeId: 4, feeName: "승강기검사비외", feePrice: 1500}, {
  //       feeId: 5,
  //       feeName: "정화조및저수조",
  //       feePrice: 3050
  //     }, {feeId: 6, feeName: "화재보험", feePrice: 1110}, {feeId: 7, feeName: "순회점검및민원방문처", feePrice: 10390}, {
  //       feeId: 8,
  //       feeName: "전산사용료",
  //       feePrice: 3060
  //     }, {feeId: 9, feeName: "인터넷사용료", feePrice: 15000}]
  //   },
  //   {
  //     hoseholdId: 16,
  //     householdName: '503호',
  //     houseHoldFee: [{feeId: 1, feeName: "승강기안전관리대행", feePrice: 4890}, {
  //       feeId: 2,
  //       feeName: "소방안전관리대행",
  //       feePrice: 4890
  //     }, {feeId: 3, feeName: "건물청소비", feePrice: 6110}, {feeId: 4, feeName: "승강기검사비외", feePrice: 1500}, {
  //       feeId: 5,
  //       feeName: "정화조및저수조",
  //       feePrice: 3050
  //     }, {feeId: 6, feeName: "화재보험", feePrice: 1110}, {feeId: 7, feeName: "순회점검및민원방문처", feePrice: 10390}, {
  //       feeId: 8,
  //       feeName: "전산사용료",
  //       feePrice: 3060
  //     }, {feeId: 9, feeName: "인터넷사용료", feePrice: 15000}]
  //   },
  //   {
  //     hoseholdId: 17,
  //     householdName: '601호',
  //     houseHoldFee: [{feeId: 1, feeName: "승강기안전관리대행", feePrice: 4890}, {
  //       feeId: 2,
  //       feeName: "소방안전관리대행",
  //       feePrice: 4890
  //     }, {feeId: 3, feeName: "건물청소비", feePrice: 6110}, {feeId: 4, feeName: "승강기검사비외", feePrice: 1500}, {
  //       feeId: 5,
  //       feeName: "정화조및저수조",
  //       feePrice: 3050
  //     }, {feeId: 6, feeName: "화재보험", feePrice: 1110}, {feeId: 7, feeName: "순회점검및민원방문처", feePrice: 10390}, {
  //       feeId: 8,
  //       feeName: "전산사용료",
  //       feePrice: 3060
  //     }, {feeId: 9, feeName: "인터넷사용료", feePrice: 15000}]
  //   },
  //   {
  //     hoseholdId: 18,
  //     householdName: '602호',
  //     houseHoldFee: [{feeId: 1, feeName: "승강기안전관리대행", feePrice: 4890}, {
  //       feeId: 2,
  //       feeName: "소방안전관리대행",
  //       feePrice: 4890
  //     }, {feeId: 3, feeName: "건물청소비", feePrice: 6110}, {feeId: 4, feeName: "승강기검사비외", feePrice: 1500}, {
  //       feeId: 5,
  //       feeName: "정화조및저수조",
  //       feePrice: 3050
  //     }, {feeId: 6, feeName: "화재보험", feePrice: 1110}, {feeId: 7, feeName: "순회점검및민원방문처", feePrice: 10390}, {
  //       feeId: 8,
  //       feeName: "전산사용료",
  //       feePrice: 3060
  //     }, {feeId: 9, feeName: "인터넷사용료", feePrice: 15000}]
  //   },
  //   {
  //     hoseholdId: 19,
  //     householdName: '603호',
  //     houseHoldFee: [{feeId: 1, feeName: "승강기안전관리대행", feePrice: 4890}, {
  //       feeId: 2,
  //       feeName: "소방안전관리대행",
  //       feePrice: 4890
  //     }, {feeId: 3, feeName: "건물청소비", feePrice: 6110}, {feeId: 4, feeName: "승강기검사비외", feePrice: 1500}, {
  //       feeId: 5,
  //       feeName: "정화조및저수조",
  //       feePrice: 3050
  //     }, {feeId: 6, feeName: "화재보험", feePrice: 1110}, {feeId: 7, feeName: "순회점검및민원방문처", feePrice: 10390}, {
  //       feeId: 8,
  //       feeName: "전산사용료",
  //       feePrice: 3060
  //     }, {feeId: 9, feeName: "인터넷사용료", feePrice: 15000}]
  //   }
  // ]);

  // const [dataSet, setDataSet] = useState();
  const [dataSet, dispatch] = useReducer(reducer, null);


  // useEffect(()=> {
  //   const Cost = [];
  //   data.forEach((householdInfo) => {
  //     let map = householdInfo.houseHoldFee.map((feeInfo) =>{
  //       const temp = {};
  //       temp.houseHoldId = householdInfo.hoseholdId;
  //       temp.householdName = householdInfo.householdName;
  //       temp.feeId = feeInfo.feeId;
  //       temp.feeName = feeInfo.feeName;
  //       temp.feePrice = feeInfo.feePrice;
  //       console.log("temp : ", temp);
  //       // Cost.push(temp);
  //       return temp;
  //       });
  //     console.log("map :", map);
  //     return Cost.push(map);
  //   });
  //   console.log("Cost : ", Cost);
  // }, [data])





  const [editMode, setEditMode] = useState(false);
  const [newColumnMode, setNewColumnMode] = useState(false);
  const [b, setBSum] = useState();
  const [c, setCSum] = useState();

  const [title, setTitle] = useState('');

  const [editList, setEditList] = useState();

  const [state, setState] = useState({});
  const [state2, setState2] = useState({});

  const test = () => {

  };


  return (
    <div className="App">
      <h1>Test</h1>
      <input placeholder={title} onChange={(e)=> {
        setTitle(e.target.value)
        if (newColumnMode) {
          dispatch({type: 'CHANGECOLUMNNAMEINNEWCOLUMN', payload: e.target.value});
        }

        if (editMode) {
          dispatch({type: 'CHANGECOLUMNNAMEINEDITMODE', payload: e.target.value});
        }

      }}/>
      <button onClick={() => {dispatch({ type:'INITIALIZE', payload: data})}}>초기화</button>
      {(!newColumnMode)?<button onClick={() => {
        dispatch({type: 'ADDNEWCOLUMN'});
        setNewColumnMode(prev => !prev);
      }}>새컬럼</button>:<button disabled={true} onClick={() => {
        dispatch({type: 'ADDNEWCOLUMN'});
        setNewColumnMode(prev => !prev);
      }}>새컬럼</button>}

      {newColumnMode && <>
        <button onClick={() => {
          dispatch({type:'SAVENEWCOLUMN',
          payload: {column:title,
            // row: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]}
            row: state}
        })
          setNewColumnMode(prev => !prev);
        }} >저장</button>
        <button onClick={() => {
          setNewColumnMode(prev => !prev);
          dispatch({type: 'CANCELADDNEWCOLUMN'});
        }} >취소</button>

      </>
      }

      <button onClick={() => {dispatch({ type:'DELETECOLUMN'})}}>컬럼삭제</button>

      {(!editMode)?<button onClick={() => {
        dispatch({type: 'CHANGECOLUMN'});
        setEditMode(prev => !prev);
      }}>컬럼변경</button>:<button disabled={true} onClick={() => {
        dispatch({type: 'CHANGECOLUMN'});
        setEditMode(prev => !prev);
      }}>컬럼변경</button>}

      {editMode && <>
        <button onClick={() => {
          dispatch({type:'SAVECHANGECOLUMN',
            payload: {column:title,
              // row: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]}
              row: state}
          })
          setEditMode(prev => !prev);
        }} >저장</button>
        <button onClick={() => {
          setEditMode(prev => !prev);
          dispatch({type: 'CANCLECHANGECOLUMN'});
        }} >취소</button>
      </>
      }
      <Table dataSet={dataSet} column={column} state={state} setState={setState} state2={state2} setState2={setState2} />
      {/*<p>{dataSet}</p>*/}
    </div>
  );
}

export default App;
