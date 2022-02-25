import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
function FriendsTable({
  listOfFamilys,
  setAddprofileScreen,
  setUpdateprofileScreen,
  deleteItem,
}) {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>DOB</th>
            <th>TOB</th>
            <th>Relation</th>
          </tr>
        </thead>
        <tbody className="tableBody">
          {listOfFamilys.map((item) => (
            <>
              {" "}
              <tr>
                <td>{item.fullName}</td>
                <td>
                  {item.birthDetails.dobDay}/{item.birthDetails.dobMonth}/
                  {item.birthDetails.dobYear}
                </td>
                <td>
                  {item.birthDetails.tobHour}:{item.birthDetails.tobMin}
                </td>
                <td>{item.relation}</td>
                <td>
                  <EditIcon
                    onClick={() => {
                      localStorage.setItem("toEdit", JSON.stringify(item)),
                        setAddprofileScreen(true);
                      setUpdateprofileScreen(true);
                    }}
                    style={{ color: "orange" }}
                  />
                </td>
                <td>
                  <DeleteIcon
                    onClick={() => deleteItem(item)}
                    style={{ color: "red" }}
                  />
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FriendsTable;
