import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Details from "../Routes/Details";

const FetchApi = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [paginationOptions, setPaginationOptions] = useState({
    currentPage: 1,
    limit: 6,
    offset: 0,
  });

  const { currentPage, limit, offset } = paginationOptions;

  const [paginatedUsers, setPaginatedUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get("https://randomuser.me/api?results=41");

    setUsers(res.data.results);
    setPaginatedUsers(res.data.results.slice(offset, limit));
    console.log(res.data);

    setLoading(false);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      const newOffset = offset - limit;
      const newCurrentPage = currentPage - 1;
      setPaginatedUsers(users.slice(newOffset, limit * newCurrentPage));
      setPaginationOptions({
        ...paginationOptions,
        currentPage: newCurrentPage,
        offset: newOffset,
      });
    }
  };
  const nextPage = () => {
    if (currentPage < users.length / limit) {
      const newOffset = offset + limit;
      const newCurrentPage = currentPage + 1;
      setPaginatedUsers(users.slice(newOffset, limit * newCurrentPage));
      setPaginationOptions({
        ...paginationOptions,
        currentPage: newCurrentPage,
        offset: newOffset,
      });
    }
  };

  const paginate = (pageNumber) => {
    const newOffset = pageNumber === 1 ? 0 : limit * pageNumber - limit;

    setPaginatedUsers(users.slice(newOffset, limit * pageNumber));
    setPaginationOptions({
      ...paginationOptions,
      currentPage: pageNumber,
      offset: newOffset,
    });
  };

  const goToUser = (user = null) => {
    setUser(user);
  };

  const resetUser = () => {
    setUser(null);
  };

  return (
    <>
      {user === null ? (
        <div className="container" style={{ maxWidth: "80%", margin: "auto" }}>
          <h1 className="users-profile">Users' Profile</h1>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="sub-container">
              {paginatedUsers.map((user) => (
                <div
                  className="user-picture"
                  key={user.cell}
                  // style={{ width: "20%" }}
                >
                  <img src={user.picture.large} alt="" />
                  <p
                    style={{ margin: "0", padding: "0" }}
                    className="users-names"
                  >{`${user.name.first} ${user.name.last}`}</p>
                  <p style={{ margin: "0", padding: "0" }}>{user.phone}</p>

                  <p style={{ marginTop: "0", marginBottom: "15px" }}>
                    {<button onClick={() => goToUser(user)}>User Id</button>}
                  </p>
                </div>
              ))}
            </div>
          )}
          <div className="button-click" style={{ marginTop: "10px" }}>
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={prevPage}
            >
              Prev
            </button>
            {[...Array(Math.ceil(users.length / limit))].map((number, i) => (
              <button
                type="button"
                onClick={() => paginate(i + 1)}
                disabled={currentPage === i + 1}
                key={i}
              >
                {i + 1}
              </button>
            ))}
            <button
              type="button"
              disabled={currentPage === users.length / limit}
              onClick={nextPage}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <Details user={user} resetUser={resetUser} />
      )}
    </>
  );
};

export default FetchApi;
