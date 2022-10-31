import React from "react";

const Details = ({ user, resetUser }) => {
  return (
    <>
      <h1>
        {" "}
        {user.name.first} {user.name.last} Detail
      </h1>
      {/* <Link to="/users">Back to Users</Link> */}
      <div style={{ display: "block" }}>
        <p>{`Name: ${user.name.first} ${user.name.last}`}</p>
        <p>{`Gender: ${user.gender}`}</p>
        <p>{`Tel: ${user.phone}`}</p>
        <p>{`Mail: ${user.email}`}</p>
        <p>{`City: ${user.location.city}`}</p>
        <p>{`State: ${user.location.user}`}</p>
        <p>{`Country: ${user.location.country}`}</p>
        <p>{`Postcode: ${user.location.postcode}`}</p>
        <p>{`Street name: ${user.location.street.name}`}</p>
        <p>{`Street number: ${user.location.street.number}`}</p>
        <p>{`Latitude: ${user.location.coordinates.latitude}`}</p>
        <button onClick={resetUser}>Back</button>
      </div>
    </>
  );
};

export default Details;
