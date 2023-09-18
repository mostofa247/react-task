import React, { useState } from "react";

const Problem1 = () => {
  const [show, setShow] = useState("all");
  const [todo, setTodo] = useState("");
  const [status, setStatus] = useState("");
  const [list, setList] = useState([]);
  const [activeList, setActiveList] = useState([]);
  const [completedList, setCompletedList] = useState([]);

  const handleClick = (val) => {
    setShow(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("here", todo, status);
    let id = list.length + 1;
    let _id = list.length + 1;
    if (status.toLowerCase() == "active") {
      id = 1;
    } else if (status.toLowerCase() == "completed") {
      id = 2;
    } else {
      id = 3;
    }
    setList((now) => [
      ...now,
      {
        _id,
        id,
        todo,
        status,
      },
    ]);

    console.log(list);
    setTodo("");
    setStatus("");
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form className="row gy-2 gx-3 align-items-center mb-4">
            <div className="col-auto">
              <input
                value={todo}
                type="text"
                className="form-control"
                placeholder="Name"
                onChange={(e) => setTodo(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <input
                value={status}
                type="text"
                className="form-control"
                placeholder="Status"
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {list
                .sort((a, b) => {
                  return a.id - b.id;
                })
                .filter((item) => {
                  return show == "all"
                    ? item
                    : show == "completed"
                    ? item.status.toLowerCase() == "completed"
                    : item.status.toLowerCase() == "active";
                })
                .map((item) => (
                  <tr key={item._id}>
                    <td>{item.todo}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
