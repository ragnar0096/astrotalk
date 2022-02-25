import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { debounce } from "debounce";
import { listOfCites } from "../store/actions";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { formValidator } from "../utils/validations";
import AlertDialog from "./Dialog";
class AddprofileForm extends Component {
  state = {
    form: {
      name: "",
      day: "",
      month: "",
      year: "",
      hour: "",
      min: "",
      gender: "",
      relation: "",
      city: { label: "", id: "" },
      uuid: "",
    },
    cities: [],
    AM: true,
    errors: {},
  };
  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      form: {
        ...this.state.form,
        [name]: value,
      },
    });
  };
  listOfCity = (data) => {
    if (data) {
      const dataMap = data?.map((item) => {
        return {
          label: item.placeName,
          placeId: item.placeId,
        };
      });
      this.setState({
        cities: dataMap,
      });
    }
  };
  handleCity = debounce((e) => {
    listOfCites(e.target.value, this.listOfCity);
  }, 2000);
  // handleCity = (e) => {
  //   debounce(this.listOfCity, 200);
  // };

  handleSelectCity = (e, value) => {
    this.setState({
      form: {
        ...this.state.form,
        city: { label: value?.label, id: value?.placeId },
      },
    });
  };
  validatation = (e) => {
    const result = formValidator(e.target.name, e.target.value);
    this.setState({
      errors: {
        ...this.state.errors,
        ...result,
      },
    });
  };
  componentDidMount() {
    const datatoEdit = JSON.parse(localStorage.getItem("toEdit"));
    if (datatoEdit) {
      this.setState({
        form: {
          name: `${datatoEdit.firstName} ${datatoEdit.lastName}`,
          gender: datatoEdit.gender,
          uuid: datatoEdit.uuid,

          relation: datatoEdit.relation,

          day: datatoEdit.birthDetails.dobDay,
          month: datatoEdit.birthDetails.dobMonth,
          year: datatoEdit.birthDetails.dobYear,
          hour: datatoEdit.birthDetails.tobHour,
          min: datatoEdit.birthDetails.tobMin,
          city: {
            label: datatoEdit.birthPlace.placeName,
            id: datatoEdit.birthPlace.placeId,
          },
        },
        AM: datatoEdit.meridiem == "AM" ? true : false,
      });
    }
  }
  disableSubmit = () => {
    const {
      form: { name, city, day, month, year, gender, relation, hour, min },
      errors,
    } = this.state;
    if (
      name.length > 0 &&
      city?.label?.length > 0 &&
      year > 0 &&
      gender.length > 0 &&
      relation.length > 0 &&
      hour > 0 &&
      min > 0 &&
      day > 0 &&
      month > 0
    ) {
      return false;
    } else {
      return true;
    }
  };
  render() {
    const { handleChange, handleCity, handleSelectCity } = this;

    const {
      form: { name, city, day, month, year, gender, relation, hour, min },
      errors,
    } = this.state;
    return (
      <div>
        {this.props.apierror && (
          <AlertDialog
            error={true}
            message={this.props.apierrorMessage}
            open={this.props.apierror}
            setApiError={this.props.setApiError}
          />
        )}
        <div className="back">
          <ArrowBackIosIcon
            onClick={() => {
              this.props.setAddprofileScreen(false);
              this.props.setUpdateprofileScreen(false);
            }}
          />{" "}
          Add New Profile
        </div>
        <div className="form-group commonPadding">
          <label className="commonPadding" htmlFor="exampleInputEmail1">
            Name
          </label>
          <input
            onChange={handleChange}
            name="name"
            type="text"
            className={errors.name ? "error form-control" : "form-control"}
            value={name}
            onBlur={this.validatation}
          />
          {errors.name && (
            <div className="text-danger">
              <small>Enter a Valid Name</small>
            </div>
          )}
        </div>
        <div className="commonPadding">Date of Birth</div>
        <div className="form-Dob d-flex commonPadding">
          <div>
            {" "}
            <input
              onChange={handleChange}
              name="day"
              type="number"
              placeholder="DD"
              className={errors.day ? "error form-control" : "form-control"}
              value={day}
              onBlur={this.validatation}
            />
            {errors.day && (
              <div className="text-danger">
                <small>Invalid DD</small>
              </div>
            )}
          </div>

          <div>
            {" "}
            <input
              onChange={handleChange}
              name="month"
              type="number"
              className={errors.month ? "error form-control" : "form-control"}
              placeholder="MM"
              value={month}
              onBlur={this.validatation}
            />
            {errors.month && (
              <div className="text-danger">
                <small>Invalid MM</small>
              </div>
            )}
          </div>

          <div>
            {" "}
            <input
              onChange={handleChange}
              name="year"
              type="number"
              className={errors.year ? "error form-control" : "form-control"}
              placeholder="YYYY"
              value={year}
              max="2022"
              onBlur={this.validatation}
            />
            {errors.year && (
              <div className="text-danger">
                <small>Invalid year</small>
              </div>
            )}
          </div>
        </div>
        <div className="commonPadding">Time of Birth</div>

        <div className="form-tob d-flex commonPadding">
          <div>
            {" "}
            <input
              onChange={handleChange}
              name="hour"
              type="number"
              value={hour}
              className={errors.hour ? "error form-control" : "form-control"}
              onBlur={this.validatation}
              max="10"
            />
            {errors.hour && (
              <div className="text-danger">
                <small>Invalid HH</small>
              </div>
            )}
          </div>
          <div>
            {" "}
            <input
              onChange={handleChange}
              name="min"
              type="number"
              className={errors.min ? "error form-control" : "form-control"}
              value={min}
              onBlur={this.validatation}
              max={60}
            />
            {errors.min && (
              <div className="text-danger">
                <small>Invalid MM</small>
              </div>
            )}
          </div>
          <ToggleButtonGroup
            color="primary"
            value={this.state.AM ? "AM" : "PM"}
            exclusive
            onChange={(e) =>
              e.target.value == "AM"
                ? this.setState({ AM: true })
                : this.setState({ AM: false })
            }
          >
            <ToggleButton
              style={
                this.state.AM
                  ? {
                      backgroundColor: "darkslateblue",
                      color: "white",
                      height: "38px",
                    }
                  : { backgroundColor: "white", color: "black", height: "38px" }
              }
              value="AM"
            >
              AM
            </ToggleButton>
            <ToggleButton
              style={
                !this.state.AM
                  ? {
                      backgroundColor: "darkslateblue",
                      color: "white",
                      height: "38px",
                    }
                  : { backgroundColor: "white", color: "black", height: "38px" }
              }
              value="PM"
            >
              PM
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="commonPadding">Place of Birth</div>
        <div className="form-birth d-flex commonPadding">
          <div>
            <Autocomplete
              value={city}
              disablePortal
              loading
              id="combo-box-demo"
              options={this.state.cities.length > 0 ? this.state.cities : []}
              sx={{ width: 300 }}
              onChange={handleSelectCity}
              onBlur={() => {
                this.setState({
                  errors: {
                    ...this.state.errors,
                    city: this.state.form.city.label.length > 0 ? false : true,
                  },
                });
              }}
              renderInput={(params) => (
                <TextField
                  error={errors.city ? true : false}
                  onChange={handleCity}
                  {...params}
                  label="Place of birth"
                />
              )}
            />
            {errors.city && (
              <div className="text-danger">
                <small>Please Select city </small>
              </div>
            )}
          </div>
        </div>
        <div className="d-flex commonPadding">
          <div className="form-Gender commonPadding">
            <div className="commonPadding">Gender</div>
            <select
              value={gender}
              onChange={handleChange}
              name="gender"
              className={errors.gender ? "error form-select" : "form-select"}
              aria-label="Default select example"
              onBlur={this.validatation}
            >
              <option value=""></option>

              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
            {errors.gender && (
              <div className="text-danger">
                <small>Invalid Gender </small>
              </div>
            )}
          </div>

          <div className="form-Relation">
            <div className="commonPadding">Relation</div>

            <select
              value={relation}
              onChange={handleChange}
              name="relation"
              className={errors.relation ? "error form-select" : "form-select"}
              aria-label="Default select example"
              onBlur={this.validatation}
            >
              <option value=""></option>

              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Sister">Sister</option>
              <option value="Brother">Brother</option>
              <option value="Spouse">Spouse</option>
            </select>
            {errors.relation && (
              <div className="text-danger">
                <small>Invalid Relation</small>
              </div>
            )}
          </div>
        </div>
        <div>
          {this.props.updateProfileScreen ? (
            <button
              style={this.disableSubmit() ? { opacity: "0.5" } : { opacity: 1 }}
              disabled={this.disableSubmit()}
              onClick={() =>
                this.props.updateForm(this.state.form, this.state.AM)
              }
              className="add-profile"
            >
              Update
            </button>
          ) : (
            <button
              style={this.disableSubmit() ? { opacity: "0.5" } : { opacity: 1 }}
              disabled={this.disableSubmit()}
              onClick={() =>
                this.props.submitForm(this.state.form, this.state.AM)
              }
              className="add-profile"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    );
  }
}
export default AddprofileForm;
