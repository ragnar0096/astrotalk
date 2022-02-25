import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getCategories } from "../store/actions";
import MenuIcon from "@mui/icons-material/Menu";

function Askquestion() {
  const categories = useSelector((state) => state.categoryReducer.categories);
  const [suggestion, setSuggestion] = useState([]);
  const [userQuestion, setuserQuestion] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories(setintialSuggestions));
  }, []);
  const Changeideas = (e) => {
    const ideasSuggestions = categories.filter(
      (item) => item.name == e.target.value
    );
    setSuggestion(ideasSuggestions[0].suggestions);
  };
  const setintialSuggestions = (data) => {
    setSuggestion(data[0]?.suggestions);
  };
  return (
    <div className="question-wrapper">
      {" "}
      <div className="bottomLines">
        {" "}
        <MenuIcon style={{ color: "white" }} />
      </div>
      <div>
        <div className="ask-question">Ask a Question</div>
        <div className="">
          Seek accurate to your life problems an get guidance towards the right
          path. Whether the problem is related to love ,self,life
          buisness,money,education,or work pur astrolers will an in depth study
          of your birth chart to provide personalised responses along with
          remedies
        </div>
        <div className="ask-question">Choose Category</div>
        <div className="">
          <select
            className="form-select category"
            aria-label="Default select example"
            onChange={Changeideas}
          >
            {categories?.map((item, key) => (
              <option key={key} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="">
          <textarea
            className="form-control question"
            placeholder="Type a Question here"
            id="floatingTextarea2"
            value={userQuestion}
            onChange={(e) =>
              userQuestion.length < 150 && setuserQuestion(e.target.value)
            }
          ></textarea>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            {userQuestion.length}/150
          </div>
          <div className="bold ideas">Ideas what to ask(Select any)</div>
          {suggestion?.map((item) => (
            <>
              <div className="suggestions">
                <div style={{ paddingRight: "10px" }}>
                  <img src="/static/images/questions.png" />
                </div>
                {item}
              </div>
              <hr />
            </>
          ))}

          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Askquestion;
