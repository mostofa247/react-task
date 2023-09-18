import React, { useState, useEffect } from "react";

import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const Problem2 = () => {
  const [curr, setCurr] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [showUS, setShowUS] = useState(false);
  const [more, setMore] = useState(true);
  const [page, setPage] = useState(1);
  const [all, setAll] = useState([]);
  const [us, setUS] = useState([]);
  const [nextAll, setNextAll] = useState(
    "https://contact.mediusware.com/api/contacts/?page=1"
  );
  const [nextUS, setNextUS] = useState(
    "https://contact.mediusware.com/api/country-contacts/United%20States/?page=1"
  );
  const [even, setEven] = useState(false);
  const [evenus, setEvenUS] = useState(false);
  const handleClose = () => {
    setShowAll(false);
    setShowUS(false);
  };
  const handleShow = () => {
    setShowAll(true);
    setShowUS(false);
    setCurr(all);
  };

  const handleShowUS = () => {
    setShowAll(false);
    setShowUS(true);
    setCurr(us);
  };

  useEffect(() => {
    const load = async () => {
      const result = await axios(nextAll);
      setAll([...all, ...result.data.results]);
      // console.log(page);
      if (result.data["next"] != null) {
        setNextAll(result.data["next"]);
      }
      const usres = await axios(nextUS);
      setUS([...us, ...usres.data.results]);
      if (usres.data["next"] != null) {
        setNextUS(usres.data["next"]);
      }
      setPage(page + 1);
      console.log(us);
    };
    load();
    // console.log(all, page);
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            onClick={handleShow}
            className="btn btn-lg btn-outline-primary"
            type="button"
          >
            All Contacts
          </button>
          <button
            onClick={handleShowUS}
            className="btn btn-lg btn-outline-warning"
            type="button"
          >
            US Contacts
          </button>
        </div>
      </div>

      <Modal
        show={showAll}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>All Contacts</Modal.Title>
          <Button
            style={{ backgroundColor: "#46139f" }}
            onClick={handleShow}
            variant="secondary"
          >
            All
          </Button>
          <Button
            style={{ backgroundColor: "#ff7f50" }}
            onClick={handleShowUS}
            variant="secondary"
          >
            US
          </Button>
        </Modal.Header>
        <Modal.Body>
          <div style={{ overflow: "auto", height: "300px" }}>
            <table className="table table-striped ">
              <thead>
                <tr>
                  <th scope="col">Phone</th>
                  <th scope="col">Country</th>
                </tr>
              </thead>
              <tbody>
                {curr
                  .filter((item) => {
                    return even
                      ? parseInt(item.phone.slice(-1)) % 2 == 0
                      : item;
                  })
                  .map((item) => (
                    <tr key={item.id}>
                      <td>{item.phone}</td>
                      <td>{item.country.name}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <input type="checkbox" onChange={(e) => setEven(e.target.checked)} />
        </Modal.Footer>
      </Modal>

      <Modal
        show={showUS}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Us Contacts</Modal.Title>
          <Button
            style={{ backgroundColor: "#46139f" }}
            onClick={handleShow}
            variant="secondary"
          >
            All
          </Button>
          <Button
            style={{ backgroundColor: "#ff7f50" }}
            onClick={handleShowUS}
            variant="secondary"
          >
            US
          </Button>
        </Modal.Header>
        <Modal.Body>
          <div style={{ overflow: "auto", height: "300px" }}>
            <table className="table table-striped ">
              <thead>
                <tr>
                  <th scope="col">Phone</th>
                  <th scope="col">Country</th>
                </tr>
              </thead>
              <tbody>
                {us
                  .filter((item) => {
                    return !evenus
                      ? item
                      : parseInt(item.phone.slice(-1)) % 2 == 0;
                  })
                  .map((item) => (
                    <tr key={item.id}>
                      <td>{item.phone}</td>
                      <td>{item.country.name}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <input
            type="checkbox"
            onChange={(e) => setEvenUS(e.target.checked)}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Problem2;
