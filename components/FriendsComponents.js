import React, { useEffect, useState } from "react";
import Wallet from "./WalletBalance";
import {
  listOfFriendsFamily,
  addRelative,
  updateRelative,
  deleteRelative,
} from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import FriendsTable from "./FriendsTable";
import AddprofileForm from "./AddProfileForm";
import AlertDialog from "./Dialog";

function FriendsComponent() {
  const listOfFamilys = useSelector((state) => state.friendsFamilyReducer.list);
  const [addProfileScreen, setAddprofileScreen] = useState(false);
  const [updateProfileScreen, setUpdateprofileScreen] = useState(false);
  const [deleteConfim, setDeleteConfirm] = useState(false);
  const [todeleteUuid, settodeleteUuid] = useState("");
  const [apierror, setApiError] = useState(false);
  const [apierrorMessage, setApiErrorMessage] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOfFriendsFamily());
  }, []);
  const submitForm = (data, meridiem) => {
    const datatoPost = {
      birthDetails: {
        dobDay: data.day,
        dobMonth: data.month,
        dobYear: data.year,
        tobHour: data.hour,
        tobMin: data.min,
        meridiem: meridiem ? "AM" : "PM",
      },
      birthPlace: {
        placeName: data.city.label,
        placeId: data.city.id,
      },
      firstName: data.name.split(" ")[0],
      lastName: data.name.split(" ").slice(1).join(" "),
      relationId: Math.floor(Math.random() * (10 - 1 + 1) + 1),
      relation: data.relation,
      gender: data.gender,
    };
    addRelative(
      datatoPost,
      () => {
        dispatch(listOfFriendsFamily());

        setAddprofileScreen(false);
        setUpdateprofileScreen(false);
      },
      (message) => {
        setApiErrorMessage(message);
        setApiError(true);
      }
    );
  };
  const updateForm = (data, meridiem) => {
    const datatoPost = {
      birthDetails: {
        dobDay: data.day,
        dobMonth: data.month,
        dobYear: data.year,
        tobHour: data.hour,
        tobMin: data.min,
        meridiem: meridiem ? "AM" : "PM",
      },
      birthPlace: {
        placeName: data.city.label,
        placeId: data.city.id,
      },
      firstName: data.name.split(" ")[0],
      lastName: data.name.split(" ").slice(1).join(" "),

      relationId: Math.floor(Math.random() * (10 - 1 + 1) + 1),
      dateAndTimeOfBirth: `${data.year}-${data.month}-${data.day} ${data.hour}:${data.min}`,
      gender: data.gender,
      uuid: data.uuid,
      relation: data.relation,
    };
    updateRelative(
      datatoPost,
      () => {
        dispatch(listOfFriendsFamily());

        setAddprofileScreen(false);
        setUpdateprofileScreen(false);
      },
      (message) => {
        setApiErrorMessage(message);
        setApiError(true);
      }
    );
  };
  const deleteItem = (item) => {
    settodeleteUuid(item.uuid);
    setDeleteConfirm(true);
  };
  const confirmDeleteHandler = () => {
    deleteRelative(todeleteUuid, () => {
      dispatch(listOfFriendsFamily());
      setDeleteConfirm(false);
    });
  };
  return (
    <div>
      {deleteConfim && (
        <AlertDialog
          open={deleteConfim}
          setDeleteConfirm={setDeleteConfirm}
          confirmDeleteHandler={confirmDeleteHandler}
          error={false}
          message="Do you really Want to Delete?"
        />
      )}
      <div className="friends-profile">
        <div style={{ padding: "15px", minWidth: "40%" }}>Basic Profile</div>
        <div className="family-profile">Friends and Family Profile</div>
      </div>
      {!addProfileScreen ? (
        <>
          <Wallet />
          <FriendsTable
            listOfFamilys={listOfFamilys}
            setAddprofileScreen={setAddprofileScreen}
            setUpdateprofileScreen={setUpdateprofileScreen}
            deleteItem={deleteItem}
          />
        </>
      ) : (
        <AddprofileForm
          updateProfileScreen={updateProfileScreen}
          submitForm={submitForm}
          updateForm={updateForm}
          setAddprofileScreen={setAddprofileScreen}
          setUpdateprofileScreen={setUpdateprofileScreen}
          apierror={apierror}
          setApiError={setApiError}
          apierrorMessage={apierrorMessage}
        />
      )}
      <div className="d-flex justify-content-center">
        {" "}
        {!addProfileScreen && (
          <button
            onClick={() => {
              setAddprofileScreen(true);
              localStorage.clear("toEdit");
            }}
            className="add-profile"
          >
            + Add new Profile
          </button>
        )}
      </div>
    </div>
  );
}

export default FriendsComponent;
