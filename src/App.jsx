import React from "react";
import { useEffect, useState } from "react";

// Import Database
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
} from "firebase/database";

function App() {
  const database = getDatabase();

  // all state
  const [inputData, setinputData] = useState("");
  const [allData, setallData] = useState([]);
  const [realtime, setrealtime] = useState(false);

  // Get Database
  useEffect(() => {
    const todoData = ref(database, "todo4/");
    onValue(todoData, (snapshot) => {
      const allDataArr = [];
      snapshot.forEach((item) => {
        allDataArr.push({
          todoId: item.key,
          todoItem: item.val(),
        });

        setallData(allDataArr);
      });
    });
  }, [realtime]);

  console.log(allData);

  // Handle Add

  const HandleAdd = () => {
    if (inputData !== "") {
      const dataInfo = ref(database, "todo4/");
      set(push(dataInfo), {
        todoItem: inputData,
      })
        .then(() => {
          setrealtime(!realtime);
          setinputData("");
          console.log("Succes");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("input Faka");
    }
  };

  //  Handle Delete

  const HandleDelete = (deletedid) => {
    remove(ref(database, "todo4/" + deletedid))
      .then(() => {
        setrealtime(!realtime);
        console.log("deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Handle Edit

  const HandleEdit = () => {
    console.log("Edit");
  };

  return (
    <>
      <div className="flex , justify-center flex-col items-center h-[100vh]">
        <h1>Todo</h1>
        <div className="flex items-center">
          <input
            value={inputData}
            type="text"
            placeholder="Add task"
            className="bg-gray-600"
            onChange={(e) => setinputData(e.target.value)}
          />

          <button className="bg-red-500 text-white" onClick={HandleAdd}>
            Add{" "}
          </button>
        </div>

        {allData.map((item) => (
          <div key={item.todoId}>
            <div className="flex flex-col items-center">
              <p className="bg-black text-white py-1 px-4">
                {item.todoItem.todoItem}
              </p>
            </div>
            <div className="gap-x-6 flex">
              <button className="bg-yellow-600" onClick={HandleEdit}>
                Edit
              </button>
              <button
                className="bg-red-800 text-white"
                onClick={() => HandleDelete(item.todoId)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
